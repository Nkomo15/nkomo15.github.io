const SECRET_PASSWORD = "traitor";

function enterSecret() {
    const password = prompt("Enter the Traitors password:");

    if (password === SECRET_PASSWORD) {
        document.getElementById("chatSection").classList.remove("hidden");
    } else {
        alert("You are not worthy... Faithful.");
    }
}

function sendMessage() {
    const username = document.getElementById("username").value;
    const message = document.getElementById("message").value;

    if (username === "" || message === "") return;

    const chatBox = document.getElementById("chatBox");

    const newMessage = document.createElement("p");
    newMessage.innerHTML = "<strong>" + username + ":</strong> " + message;

    chatBox.appendChild(newMessage);

    document.getElementById("message").value = "";
}
