const username = new URLSearchParams(window.location.search).get("username");
const input = document.querySelector("#msg");
const form = document.querySelector("#chat-form");
const msgContainer = document.querySelector(".chat-messages");

const socket = io();

socket.on("message", (msg) => {
  console.log(msg);

  showMessage(msg);
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
