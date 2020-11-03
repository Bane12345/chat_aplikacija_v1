const input = document.querySelector("input");
const forma = document.querySelector("form");

forma.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = input.value;

  console.log(username);

  location.href = `./chat.html?username=${username}`;
});
