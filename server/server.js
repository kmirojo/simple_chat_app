const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

const path = require("path");

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, "../public");
const PORT = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = comunication with the backend
module.exports.io = socketIO(server);
require("./sockets/socket");

server.listen(PORT, (err) => {
    if (err) throw new Error(err);

    console.log(`Server running on port: ${PORT}`);
});
