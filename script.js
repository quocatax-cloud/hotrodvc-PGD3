const chat = document.getElementById("chat");
const input = document.getElementById("input");

const API_URL = "https://chatbotdvc.quocatax.workers.dev/";

function add(text, cls) {
  const div = document.createElement("div");
  div.className = "msg " + cls;
  div.innerText = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const text = input.value.trim();
  if (!text) return;

  add(text, "user");
  input.value = "";

  add("Bot đang trả lời...", "bot");

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();

  chat.lastChild.innerText = data.reply;
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") send();
});
