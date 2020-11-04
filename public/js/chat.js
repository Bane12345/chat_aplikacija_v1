const client_username = new URLSearchParams(window.location.search).get("username");
const input = document.querySelector("#msg");
const form = document.querySelector("#chat-form");
const msgContainer = document.querySelector(".chat-messages");
const userContainer = document.querySelector("#users");
const socket = io();


socket.emit("add_username", client_username);


socket.on("message", (msg) => {
  console.log(msg);

  showMessage(msg);
});

socket.on("add_username", (username) =>{
  addUsername(username);
}) 

socket.on("remove_username", (username) =>{
  removeUsername(username);
}) 

//Da bi bio isti efekat kada korisnik zatvori prozor kao i da je kliknuo Leave room
window.addEventListener('beforeunload', function (e) {
  leaveRoom();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const msgText = input.value;

  const msg = {
    author: username,
    text: msgText,
  };

  socket.emit("message", msg);
  input.value = "";
});

function showMessage(msg) {
  const newDiv = document.createElement("div");
  newDiv.className = "message";

  newDiv.innerHTML = `
    <p class="meta">${msg.author}</p>
    <p class="text">
        ${msg.text}
    </p>
  `;

  msgContainer.appendChild(newDiv);

  msgContainer.scrollTop = msgContainer.scrollHeight;
}

function addUsername(username){
  //Da se ne bi dodavao ako takav user vec postoji
  if(document.querySelector(`div[data-username=${username}]`)!=null){
    console.log("postoji");
    return;
  }else{
    console.log("ne postoji");
  }

  const newDiv = document.createElement("div");
  newDiv.className = "user";

  //Ovde ce se tom div-u dodati id=client_username kako bi se znalo da je to ime 
  //bas tebe kad se ulogujes i kako bi se razlikovao od ostalih
  //Kako bi taj div mogao drugacije da istakne preko CSS-a
  console.log(client_username);
  if(client_username===username){
    newDiv.innerHTML = `
    <div class="user" id="client_username" data-username="${username}">${username}</div>
    `
  }else{
    newDiv.innerHTML = `
    <div class="user" data-username="${username}">${username}</div>
    `
  }
  
  
  userContainer.appendChild(newDiv);
}

function removeUsername(username){
  usernameDiv = document.querySelector(`div[data-username=${username}]`).parentNode;
  userContainer.removeChild(usernameDiv);
}

function leaveRoom(){
  socket.emit("remove_username",client_username);
  removeUsername(client_username);
  location.href="../index.html";
}