import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://birthday-app-64416-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "birthdays")

const birthdayInputField = document.getElementById("birthday-input")
const submitButton = document.getElementById("submit-button")
const birthdayList = document.getElementById("birthday-list")

// Fetch and display data
function fetchAndDisplayBirthdays() {
    onValue(referenceInDB, (snapshot) => {
        birthdayList.innerHTML = ""; // Clear current list
        const data = snapshot.val();
        if (data) {
            Object.values(data).forEach(value => {
                birthdayList.innerHTML += `<p>${value}</p>`;
            });
        } else {
            birthdayList.innerHTML = "<p>No birthdays found.</p>";
        }
    });
}

// Initial load
fetchAndDisplayBirthdays();

// Add new birthday
submitButton.addEventListener("click", () => {
    const value = birthdayInputField.value.trim();
    if (value) {
        push(referenceInDB, value)
            .then(() => {
                birthdayInputField.value = ""; // Clear input field
                fetchAndDisplayBirthdays(); // Refresh list
            })
            .catch(error => {
                console.error("Error adding birthday: ", error);
            });
    }
});