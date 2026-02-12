import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCYXVp4gOWcT6HyYf-FcKDNEaQp-50itaY",
  authDomain: "traitors-party-ee814.firebaseapp.com",
  databaseURL: "https://traitors-party-ee814-default-rtdb.firebaseio.com",
  projectId: "traitors-party-ee814",
  storageBucket: "traitors-party-ee814.firebasestorage.app",
  messagingSenderId: "54815836027",
  appId: "1:54815836027:web:1ff662779b86ea3dfd1fde",
  measurementId: "G-E3CCYRDBSK"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const chatRef = ref(database, "traitorsChat");

const SECRET_PASSWORD = "traitor";

// -------------------- Existing functions --------------------
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

// Chat message listener
onChildAdded(chatRef, (data) => {
    const chatBox = document.getElementById("chatBox");
    const msg = data.val();

    const newMessage = document.createElement("p");
    newMessage.innerHTML = "<strong>" + msg.user + ":</strong> " + msg.text;

    chatBox.appendChild(newMessage);

    // Auto-scroll to newest message
    chatBox.scrollTop = chatBox.scrollHeight;
});

// -------------------- Add Enter-to-Send HERE --------------------
window.addEventListener("DOMContentLoaded", () => {
    const messageInput = document.getElementById("message");
    if (messageInput) {
        messageInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent adding a newline
                sendMessage();       // Send message
            }
        });
    }
});
