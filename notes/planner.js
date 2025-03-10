document.addEventListener("DOMContentLoaded", loadStoredData);

function addNote() {
    const noteInput = document.getElementById("noteInput");
    if (noteInput.value.trim()) {
        const note = createNoteElement(noteInput.value);
        document.getElementById("notesList").appendChild(note);
        saveData(); // Save after adding
        noteInput.value = "";
    }
}

function addSchedule() {
    const scheduleInput = document.getElementById("scheduleInput");
    const scheduleDate = document.getElementById("scheduleDate");
    if (scheduleInput.value.trim() && scheduleDate.value) {
        const schedule = createScheduleElement(scheduleDate.value, scheduleInput.value);
        document.getElementById("schedulesList").appendChild(schedule);
        saveData(); // Save after adding
        scheduleInput.value = "";
        scheduleDate.value = "";
    }
}

function createNoteElement(text) {
    const note = document.createElement("div");
    note.className = "card";
    note.innerHTML = `${text} <button class='delete-btn' onclick='deleteItem(this)'>X</button>`;
    return note;
}

function createScheduleElement(date, text) {
    const schedule = document.createElement("div");
    schedule.className = "card";
    schedule.innerHTML = `<strong>${date}</strong><br>${text} <button class='delete-btn' onclick='deleteItem(this)'>X</button>`;
    return schedule;
}

function deleteItem(button) {
    button.parentElement.remove();
    saveData(); // Save after deleting
}

function saveData() {
    const notes = [];
    document.querySelectorAll("#notesList .card").forEach(card => notes.push(card.textContent.replace("X", "").trim()));

    const schedules = [];
    document.querySelectorAll("#schedulesList .card").forEach(card => {
        const date = card.querySelector("strong").textContent;
        const text = card.childNodes[2].textContent.trim();
        schedules.push({ date, text });
    });

    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("schedules", JSON.stringify(schedules));
}

function loadStoredData() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    const schedules = JSON.parse(localStorage.getItem("schedules") || "[]");

    notes.forEach(text => document.getElementById("notesList").appendChild(createNoteElement(text)));
    schedules.forEach(({ date, text }) => document.getElementById("schedulesList").appendChild(createScheduleElement(date, text)));
}
