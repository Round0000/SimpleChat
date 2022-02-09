message_form.addEventListener("submit", (e) => {
  e.preventDefault();

  updateChatUI(message_form_textarea.value);

  message_form.reset();
});

function updateChatUI(msg, side) {
  const li = document.createElement("LI");
  li.innerText = msg;
  li.classList.add("message", "message_left");
  const timestamp = document.createElement("SPAN");
  let time = Date.now();
  time = new Date(time);
  time = time.getHours() + ":" + time.getMinutes();
  timestamp.innerText = time;
  timestamp.classList.add("timestamp");
  li.append(timestamp);
  messages_list.append(li);
}
