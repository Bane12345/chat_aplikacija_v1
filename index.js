const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`My server is alive! Listening on port: ${PORT}`);
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`New user!!! Socket: ${socket.id}`);

  socket.on("message", (msg) => {
    console.log(`Autor poruke: ${msg.author}`);
    console.log(`Text poruke: ${msg.text}`);

    // Salje poruke svim konektovanim korisnicima
    io.emit("message", msg);
  });
});
