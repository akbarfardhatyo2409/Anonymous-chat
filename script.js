// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyABs7nMJDPW9DijOKDGrxHuE1S3EDTQQaM",
    authDomain: "simple-chat-f6192.firebaseapp.com",
    projectId: "simple-chat-f6192",
    storageBucket: "simple-chat-f6192.appspot.com",
    messagingSenderId: "207917813722",
    appId: "1:207917813722:web:6cce545a230045e83e3ae3",
    measurementId: "G-BL4BV6301L"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Fungsi kirim pesan
function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();
    if (message) {
        db.collection("messages").add({
            user: "Anonymous",
            text: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        messageInput.value = ""; // Hapus input setelah mengirim pesan
    }
}

// Mendengarkan pesan baru
function listenForMessages() {
    db.collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot(snapshot => {
            const chatWindow = document.getElementById("chat-window");
            chatWindow.innerHTML = ""; // Kosongkan chat sebelum memperbarui
            snapshot.forEach(doc => {
                const msg = doc.data();
                const messageElement = document.createElement("div");
                messageElement.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
                chatWindow.appendChild(messageElement);
            });
            chatWindow.scrollTop = chatWindow.scrollHeight; // Scroll otomatis ke bawah
        });
}

// Jalankan saat halaman dimuat
window.onload = listenForMessages;