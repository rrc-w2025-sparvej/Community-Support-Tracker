document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("volunteerForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(el => el.remove());

        let isValid = true;

        const charityInput = document.getElementById("charityName");
        const hoursInput = document.getElementById("hoursVolunteered");
        const dateInput = document.getElementById("volunteerDate");
        const ratingInput = document.getElementById("experienceRating");

        if (charityInput.value.trim() === "") {
            showInputError(charityInput, "Please enter charity name.");
            isValid = false;
        }

        if (hoursInput.value === "" || isNaN(hoursInput.value) || hoursInput.value <= 0) {
            showInputError(hoursInput, "Please enter valid volunteer hours.");
            isValid = false;
        }

        if (dateInput.value === "") {
            showInputError(dateInput, "Please select a date.");
            isValid = false;
        }

        if (ratingInput.value === "" || ratingInput.value < 1 || ratingInput.value > 5) {
            showInputError(ratingInput, "Rating must be between 1 and 5.");
            isValid = false;
        }

        if (isValid) {
            alert("Volunteer hours submitted successfully!");
            console.log("Form submitted successfully");
            form.reset();
        }
    });
});

function showInputError(inputElement, message) {
    const errorDisplay = document.createElement("span");
    errorDisplay.className = "error-message";
    errorDisplay.textContent = message;
    errorDisplay.style.color = "red";
    errorDisplay.style.marginLeft = "10px";

    inputElement.parentElement.appendChild(errorDisplay);
}