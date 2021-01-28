var socket = io();

const params = new URLSearchParams(window.location.search);

const nameErrorMsg = "The name and room are required";

if (!params.has("name") || !params.has("room")) {
    window.location = "index.html";
    throw new Error(nameErrorMsg);
}

const user = {
    name: params.get("name"),
    room: params.get("room"),
};

socket.on("connect", function () {
    console.warn("Connected to server");

    socket.emit("enterChat", user, function (resp) {
        console.log("connected Users: ", resp);
    });
});

// Listen
socket.on("disconnect", function () {
    console.error("Connection lost!");
});

// Send info
// socket.emit(
//     "createMessage",
//     {
//         user: "Juan",
//         message: "Hello World",
//     },
//     function (resp) {
//         console.log("Server response: ", resp);
//     }
// );

// Listen info
socket.on("createMessage", function (message) {
    console.log("Server:", message);
});

// Listen users changes (when enters/leaves)
socket.on("usersList", function (users) {
    console.log(users);
});

// Private Messages
socket.on("privateMessage", function (message) {
    console.log("Private Message: ", message);
});
