import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "PASTE_YOURS",
  authDomain: "PASTE_YOURS",
  databaseURL: "PASTE_YOURS",
  projectId: "PASTE_YOURS",
  storageBucket: "PASTE_YOURS",
  messagingSenderId: "PASTE_YOURS",
  appId: "PASTE_YOURS"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const chatRef = ref(database, "traitorsChat");

const SECRET_PASSWORD = "traitor";

window.enterSecret = function() {
    const password = prompt("Enter the Traitors password:");

    if (password === SECRET_PASSWORD) {
        document.getElementById("chatSection").classList.remove("hidden");
    } else {
        alert("You are not worthy... Faithful.");
    }
};

window.sendMessage = function() {
    const username = document.getElementById("username").value;
    const message = document.getElementById("message").value;

    if (username === "" || message === "") return;

    push(chatRef, {
        user: username,
        text: message
    });

    document.getElementById("message").value = "";
};

onChildAdded(chatRef, (data) => {
    const chatBox = document.getElementById("chatBox");
    const msg = data.val();

    const newMessage = document.createElement("p");
    newMessage.innerHTML = "<strong>" + msg.user + ":</strong> " + msg.text;

    chatBox.appendChild(newMessage);
});
