import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// ----- FIREBASE CONFIG -----
// Replace these with your Firebase project details
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const chatRef = ref(database, "traitorsChat");

// ----- PASSWORDS -----
const SECRET_PASSWORD = "traitor";
const ADMIN_PASSWORD = "overlord"; // change to your secret admin password

// ----- FUNCTIONS -----
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

// ----- CHAT LISTENER -----
onChildAdded(chatRef, (data) => {
    const chatBox = document.getElementById("chatBox");
    const msg = data.val();

    const newMessage = document.createElement("p");
    newMessage.innerHTML = "<strong>" + msg.user + ":</strong> " + msg.text;

    chatBox.appendChild(newMessage);

    // Auto-scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
});

// ----- ENTER TO SEND -----
window.addEventListener("DOMContentLoaded", () => {
    const messageInput = document.getElementById("message");
    if (messageInput) {
        messageInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
});

// ----- ADMIN CLEAR BUTTON -----
window.showAdminButton = function() {
    const password = prompt("Enter the Admin password:");
    if (password === ADMIN_PASSWORD) {
        const adminBtn = document.getElementById("adminClearBtn");
        adminBtn.classList.remove("hidden");
        alert("Admin access granted! You can now clear the chat.");
    } else {
        alert("Access denied. You are not the mastermind.");
    }
};

window.adminClearChat = function() {
    if (confirm("Are you sure you want to clear the chat? This cannot be undone.")) {
        remove(chatRef)
        .then(() => {
            document.getElementById("chatBox").innerHTML = "";
            alert("Chat cleared!");
            document.getElementById("adminClearBtn").classList.add("hidden"); // hide again
        })
        .catch((error) => {
            console.error("Error clearing chat:", error);
            alert("Failed to clear chat. Check console.");
        });
    }
};

// Attach admin button
window.addEventListener("DOMContentLoaded", () => {
    const adminBtn = document.getElementById("adminClearBtn");
    if (adminBtn) {
        adminBtn.addEventListener("click", adminClearChat);
    }
});




