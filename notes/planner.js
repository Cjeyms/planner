function addNote() {
  const noteInput = document.getElementById("noteInput");
  if (noteInput.value.trim()) {
      const note = document.createElement("div");
      note.className = "card";
      note.innerHTML = `${noteInput.value} <button class='delete-btn' onclick='deleteItem(this)'>X</button>`;
      document.getElementById("notesList").appendChild(note);
      noteInput.value = "";
  }
}

function addSchedule() {
  const scheduleInput = document.getElementById("scheduleInput");
  const scheduleDate = document.getElementById("scheduleDate");
  if (scheduleInput.value.trim() && scheduleDate.value) {
      const schedule = document.createElement("div");
      schedule.className = "card";
      schedule.innerHTML = `<strong>${scheduleDate.value}</strong><br>${scheduleInput.value} <button class='delete-btn' onclick='deleteItem(this)'>X</button>`;
      document.getElementById("schedulesList").appendChild(schedule);
      scheduleInput.value = "";
      scheduleDate.value = "";
  }
}

function deleteItem(button) {
  button.parentElement.remove();
}
