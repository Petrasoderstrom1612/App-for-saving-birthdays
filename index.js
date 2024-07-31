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

submitButton.addEventListener("click", function() {
    push(referenceInDB, birthdayInputField.value)
    console.log(referenceInDB)
    birthdayList.innerHTML += `<p>${birthdayInputField.value}</p>`
    console.log(birthdayInputField.value)
    birthdayInputField.value = ""
})