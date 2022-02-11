import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7k8zuW_JJev2GJQAckCT53SmC8yfrng0",
  authDomain: "rmsimplechat.firebaseapp.com",
  projectId: "rmsimplechat",
  storageBucket: "rmsimplechat.appspot.com",
  messagingSenderId: "204682564470",
  appId: "1:204682564470:web:dd986daf236dfcf8976057",
};

initializeApp(firebaseConfig);

const db = getFirestore();

const colRef = collection(db, "chat");

// collection data

onSnapshot(colRef, (snapshot) => {
  let chat = [];
  snapshot.docs.forEach((doc) => {
    chat.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  console.log(chat);
  chat.forEach((msg) => {
    updateChatUI(msg.content, msg.timestamp);
  });
});

// adding documents
message_form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (message_form_textarea.value.length === 0) return;

  addDoc(colRef, {
    from: author_name.value || "Anonymous",
    content: message_form_textarea.value,
    timestamp: Date.now(),
  }).then(() => {
    message_form.reset();
  });
});

// Update Chat UI
function updateChatUI(msg, time) {
  message_form.reset();

  const li = document.createElement("LI");
  li.innerText = msg;
  li.classList.add("message", "message_out");

  if (self) {
    li.classList.add("message_left");
  } else {
    li.classList.add("message_right");
  }

  const timestamp = document.createElement("SPAN");
  timestamp.innerText = interpretTime(time);
  timestamp.classList.add("timestamp");
  li.append(timestamp);
  messages_list.append(li);
  message_form.scrollIntoView();
  li.classList.remove("message_out");
}

// Get current time
function interpretTime(time) {
  //   let time = Date.now();
  time = new Date(time);
  let hh = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  let mm = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  time = hh + ":" + mm;
  return time;
}
