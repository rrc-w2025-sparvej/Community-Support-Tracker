function validateCharity(value) {
    return value.trim() !== "";
}

function validateHours(value) {
    return value !== "" && !isNaN(value) && value > 0;
}

function validateDate(value) {
    return value !== "";
}

function validateRating(value) {
    return value !== "" && value >= 1 && value <= 5;
}
const STORAGE_KEY = "volunteerLogs";

function getVolunteerLogs() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveVolunteerLogs(logs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

function calculateTotalHours(logs) {
    return logs.reduce((sum, log) => sum + Number(log.hoursVolunteered || 0), 0);
}

function updateSummary(logs) {
    const total = calculateTotalHours(logs);
    const totalEl = document.getElementById("totalHours");
    if (totalEl) {
        totalEl.textContent = total;
    }
}

function renderVolunteerTable() {
    const logs = getVolunteerLogs();
    const tbody = document.getElementById("volunteerTableBody");
    if (!tbody) return;

    tbody.innerHTML = "";

    logs.forEach((log, index) => {
        const row = document.createElement("tr");

        const charityCell = document.createElement("td");
        charityCell.textContent = log.charityName;

        const hoursCell = document.createElement("td");
        hoursCell.textContent = log.hoursVolunteered;

        const dateCell = document.createElement("td");
        dateCell.textContent = log.volunteerDate;

        const ratingCell = document.createElement("td");
        ratingCell.textContent = log.experienceRating;

        const actionsCell = document.createElement("td");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete"; 
        deleteButton.dataset.index = index;
        actionsCell.appendChild(deleteButton);

        row.appendChild(charityCell);
        row.appendChild(hoursCell);
        row.appendChild(dateCell);
        row.appendChild(ratingCell);
        row.appendChild(actionsCell);

        tbody.appendChild(row);
    });

    updateSummary(logs);
}


function onSubmit(event) {
    event.preventDefault();

    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(el => el.remove());

    let isValid = true;

    const charityInput = document.getElementById("charityName");
    const hoursInput = document.getElementById("hoursVolunteered");
    const dateInput = document.getElementById("volunteerDate");
    const ratingInput = document.getElementById("experienceRating");

    if (!validateCharity(charityInput.value)) {
        showInputError(charityInput, "Please enter charity name.");
        isValid = false;
    }

    if (!validateHours(hoursInput.value)) {
        showInputError(hoursInput, "Please enter valid volunteer hours.");
        isValid = false;
    }

    if (!validateDate(dateInput.value)) {
        showInputError(dateInput, "Please select a date.");
        isValid = false;
    }

    if (!validateRating(ratingInput.value)) {
        showInputError(ratingInput, "Rating must be between 1 and 5.");
        isValid = false;
    }

    if (isValid) {
        const volunteerData = {
            charityName: charityInput.value.trim(),
            hoursVolunteered: Number(hoursInput.value),
            volunteerDate: dateInput.value,
            experienceRating: Number(ratingInput.value)
        };

        const logs = getVolunteerLogs();
        logs.push(volunteerData);
        saveVolunteerLogs(logs);

        renderVolunteerTable();

        const form = document.getElementById("volunteerForm");
        form.reset();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("volunteerForm");
    form.addEventListener("submit", onSubmit);
});

function showInputError(inputElement, message) {
    const errorDisplay = document.createElement("span");
    errorDisplay.className = "error-message";
    errorDisplay.textContent = message;

    inputElement.parentElement.appendChild(errorDisplay);
}

module.exports = {
    validateCharity,
    validateHours,
    validateDate,
    validateRating,
    onSubmit
};