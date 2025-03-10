// Import Firebase SDK (Put this in your HTML before your script.js)
<script src="https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js"></script>

<script>
// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function addNote() {
    const noteInput = document.getElementById("noteInput");
    if (noteInput.value.trim()) {
        const note = { text: noteInput.value };
        database.ref("notes").push(note);  // Save to Firebase
        noteInput.value = "";
    }
}

function loadNotes() {
    database.ref("notes").on("value", (snapshot) => {
        const notesList = document.getElementById("notesList");
        notesList.innerHTML = "";  // Clear existing notes
        snapshot.forEach((childSnapshot) => {
            const noteData = childSnapshot.val();
            const note = document.createElement("div");
            note.className = "card";
            note.innerHTML = `${noteData.text} <button class='delete-btn' onclick='deleteNote("${childSnapshot.key}")'>X</button>`;
            notesList.appendChild(note);
        });
    });
}

function deleteNote(noteId) {
    database.ref("notes/" + noteId).remove();  // Remove from Firebase
}

document.addEventListener("DOMContentLoaded", loadNotes);
</script>
