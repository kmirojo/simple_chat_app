const { io } = require("../server");
const { Users } = require("../classes/Users");
const { createMessage } = require("../utils/utils");

const users = new Users();

io.on("connection", (client) => {
    client.on("enterChat", (user, callback) => {
        const nameErrorMsg = "The name/room is required";
        const { name, room } = user;

        if (!name || !room) {
            return callback({
                error: true,
                message: nameErrorMsg,
            });
        }

        client.join(room);

        users.addUser(client.id, name, room);

        client.broadcast.to(room).emit("usersList", users.getUsersByRoom(room));

        callback(users.getUsersByRoom(room));
    });

    client.on("createMessage", (data) => {
        const user = users.getUser(client.id);

        const message = createMessage(user.name, data.message);

        client.broadcast.to(user.room).emit("createMessage", message);
    });

    client.on("disconnect", () => {
        const removedUser = users.removeUser(client.id);

        console.log("removedUser: ", removedUser);

        client.broadcast.to(removedUser.room).emit(
            "createMessage",
            createMessage("Admin", `${removedUser.name} has left the chat`)
        );

        client.broadcast.to(removedUser.room).emit(
            "usersList",
            users.getUsersByRoom(removedUser.room)
        );
    });

    // Private Messages
    client.on("privateMessage", (data) => {
        const user = users.getUser(client.id);

        client.broadcast
            .to(data.receptor)
            .emit("privateMessage", createMessage(user.name, data.message));
    });
});
