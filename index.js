const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let usernames=[]; //Niz gde se cuvaju trenutno ulogovani korisnici


//process.env.PORT || 
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

  socket.on("add_username", (username) =>{

    //Petlja koja korisniku koji se tek konektovao salje usernamove svih
    //prethodno konektovanih korisnika
    usernames.forEach(u => {
      socket.emit("add_username",u);
    });

    io.emit("add_username",username);

    usernames.push(username);//Dodaj korisnika u niz korisnika
  }) 

  socket.on("remove_username", (username) =>{
    io.emit("remove_username",username)

    usernames = usernames.filter(x=>x!=username);
    console.log(usernames);
  })
});
