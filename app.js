message_form.addEventListener("submit", (e) => {
  e.preventDefault();

  updateChatUI(message_form_textarea.value);
});

message_form.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    updateChatUI(message_form_textarea.value);
  }
});

function updateChatUI(msg, side) {
  message_form.reset();

  const li = document.createElement("LI");
  li.innerText = msg;
  li.classList.add("message", "message_left");
  const timestamp = document.createElement("SPAN");
  let time = Date.now();
  time = new Date(time);
  let hh = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  let mm = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  time = hh + ":" + mm;
  timestamp.innerText = time;
  timestamp.classList.add("timestamp");
  li.append(timestamp);
  messages_list.append(li);
  message_form.scrollIntoView();
}
