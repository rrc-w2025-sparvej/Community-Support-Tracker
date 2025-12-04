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

        console.log(volunteerData);

        alert("Volunteer hours submitted successfully!");
        console.log("Form submitted successfully");

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