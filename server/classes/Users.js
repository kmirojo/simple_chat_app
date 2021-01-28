class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        const user = {
            id,
            name,
            room,
        };

        this.users.push(user);

        return this.users;
    }

    getUser(id) {
        const user = this.users.filter((user) => user.id === id);

        return user[0];
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) {
        const usersInRoom = this.users.filter((user) => user.room === room);
        console.log(usersInRoom)
        return usersInRoom;
    }

    removeUser(id) {
        // console.log("= 1 ==============");
        // console.log(this.getUsers());
        // console.log("= 2 ==============");
        // console.log(id);
        // console.log("= 3 ==============");

        const removedUser = this.getUser(id);

        console.log(this.getUsers());

        this.users = this.users.filter((user) => user.id !== id);

        return removedUser;
    }
}

module.exports = {
    Users,
};
