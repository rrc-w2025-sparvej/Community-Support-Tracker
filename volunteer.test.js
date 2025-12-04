const {
    validateCharity,
    validateHours,
    validateDate,
    validateRating
} = require("./volunteer.js");

describe("Unit Tests", () => {

    test("validation fails when required fields are missing", () => {
        expect(validateCharity("")).toBe(false);
        expect(validateHours("")).toBe(false);
        expect(validateDate("")).toBe(false);
        expect(validateRating("")).toBe(false);
    });

    test("validation fails for invalid hours", () => {
        expect(validateHours("-3")).toBe(false);
        expect(validateHours("abc")).toBe(false);
    });

    test("validation fails for rating outside valid range", () => {
        expect(validateRating("0")).toBe(false);
        expect(validateRating("6")).toBe(false);
    });

    test("validation passes for valid inputs", () => {
        expect(validateCharity("Red Cross")).toBe(true);
        expect(validateHours("4")).toBe(true);
        expect(validateDate("2025-01-01")).toBe(true);
        expect(validateRating("5")).toBe(true);
    });

});

describe("Integration Tests", () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <form id="volunteerForm">
                <input id="charityName" />
                <input id="hoursVolunteered" />
                <input id="volunteerDate" />
                <input id="experienceRating" />
                <p id="errorMessage"></p>
            </form>
        `;
    });

    test("form shows no errors when valid input is submitted", () => {
        document.getElementById("charityName").value = "Test Charity";
        document.getElementById("hoursVolunteered").value = "3";
        document.getElementById("volunteerDate").value = "2025-01-01";
        document.getElementById("experienceRating").value = "4";

        const event = { preventDefault: () => {} };

        require("./volunteer.js").onSubmit(event);

        const errors = document.querySelectorAll(".error-message");
        expect(errors.length).toBe(0);
    });

    test("form displays an error message for invalid input", () => {
        document.getElementById("charityName").value = "";
        document.getElementById("hoursVolunteered").value = "";
        document.getElementById("volunteerDate").value = "";
        document.getElementById("experienceRating").value = "";

        const event = { preventDefault: () => {} };

        require("./volunteer.js").onSubmit(event);

        const errors = document.querySelectorAll(".error-message");
        expect(errors.length).toBeGreaterThan(0);
    });

});
