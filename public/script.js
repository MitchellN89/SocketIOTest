const socket = io();

const messages = document.getElementById("messages");
const form = document.getElementById("form");
const messageInput = document.querySelector("#message-input");
const usernameInput = document.querySelector("#nickname");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (messageInput.value) {
    const data = {
      message: messageInput.value,
      user: usernameInput.value || "Annoymous",
    };

    socket.emit("chat message", data);

    createMessage({ ...data, className: "msg-me" });
    messageInput.value = "";
  }
});

socket.on("chat message", function (data) {
  createMessage({ ...data, className: "msg-other" });
  window.scrollTo(0, document.body.scrollHeight);
});

function createMessage(data) {
  const { user, message, className } = data;
  const newEntry = document
    .querySelector("#msg-template")
    .content.cloneNode(true);

  newEntry.querySelector("span").innerHTML = user;
  newEntry.querySelector("pre").innerHTML = message;

  newEntry.querySelector("li").classList.add(className);

  messages.appendChild(newEntry);
}
