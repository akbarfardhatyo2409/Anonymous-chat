// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyABs7nMJDPW9DijOKDGrxHuE1S3EDTQQaM",
    authDomain: "simple-chat-f6192.firebaseapp.com",
    projectId: "simple-chat-f6192",
    storageBucket: "simple-chat-f6192.firebasestorage.app",
    messagingSenderId: "207917813722",
    appId: "1:207917813722:web:6cce545a230045e83e3ae3",
    measurementId: "G-BL4BV6301L"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Simulasi user yang diizinkan login
const allowedUsers = ["user1", "user2", "user3"];
let currentUser = null;

// Fungsi login
function login() {
    const username = document.getElementById("username").value.trim();
    if (allowedUsers.includes(username)) {
        currentUser = username;
        document.getElementById("login-section").style.display = "none";
        document.getElementById("chat-section").style.display = "block";
        document.getElementById("current-user").innerText = username;
        listenForMessages();
    } else {
        alert("Username tidak diizinkan. Hanya user1, user2, dan user3 yang dapat login.");
    }
}

// Fungsi logout
function logout() {
    currentUser = null;
    document.getElementById("login-section").style.display = "block";
    document.getElementById("chat-section").style.display = "none";
}

// Fungsi kirim pesan
function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();
    if (message) {
        db.collection("messages").add({
            user: currentUser,
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        messageInput.value = "";
    }
}

// Mendengarkan pesan baru
function listenForMessages() {
    db.collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
            const chatWindow = document.getElementById("chat-window");
            chatWindow.innerHTML = "";
            snapshot.forEach(doc => {
                const msg = doc.data();
                const messageElement = document.createElement("div");
                messageElement.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
                chatWindow.appendChild(messageElement);
            });
            chatWindow.scrollTop = chatWindow.scrollHeight;
        });
}