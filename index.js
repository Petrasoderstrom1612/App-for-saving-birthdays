import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, push, remove, onValue } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://birthday-app-64416-default-rtdb.europe-west1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, "birthdays");

const birthdayInputField = document.getElementById("birthday-input");
const submitButton = document.getElementById("submit-button");
const birthdayList = document.getElementById("birthday-list");

// Fetch and display data
function fetchAndDisplayBirthdays() {
    onValue(referenceInDB, (snapshot) => {
        birthdayList.innerHTML = ""; // Clear current list
        const data = snapshot.val();
        if (data) {
            // Convert object to array of entries
            const entries = Object.entries(data);
            
            // Sort entries alphabetically based on the value
            entries.sort((a, b) => a[1].localeCompare(b[1]));
            
            // Render sorted entries
            entries.forEach(([key, value]) => {
                birthdayList.innerHTML += `
                    <div style="display:flex;justify-content:center;">
                        <div style="display:flex;">
                            <p>${value}</p>
                            <button class="delete-btn" id="button-${key}" onclick="deleteBirthday('${key}')"></button>
                        </div>
                    </div>
                `;
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

// Delete birthday function
window.deleteBirthday = function(key) {
    const itemRef = ref(database, `birthdays/${key}`);
    remove(itemRef)
        .then(() => {
            fetchAndDisplayBirthdays(); // Refresh list after deletion
        })
        .catch(error => {
            console.error("Error deleting birthday: ", error);
        });
};
