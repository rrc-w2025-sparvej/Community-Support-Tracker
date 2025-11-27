// Unit tests and integration tests for donations.js

const {
    validateDonation,
    buildDonationObject,
    onSubmit,
    getTempDonation
} = require("./donation.js");

describe("Unit Tests", () => {
    // test 1: required field validation
    test("validation fails when required fields are missing", () => {
        expect(validateDonation("", "10", "2025-01-01").valid).toBe(false);
        expect(validateDonation("Charity", "", "2025-01-01").valid).toBe(false);
        expect(validateDonation("Charity", "10", "").valid).toBe(false);
    });

    // test 2: invalid amount validation
    test("validation fails for invalid amount", () => {
        expect(validateDonation("Charity", "-5", "2025-01-01").valid).toBe(false);
        expect(validateDonation("Charity", "abc", "2025-01-01").valid).toBe(false);
    });

    //test 3: valid input 
    test("validation passes for valid inputs", () => {
        expect(validateDonation("Charity", "50", "2025-01-01").valid).toBe(true);
    });

    // test 4: build donation object returns correct object
    test("buildDonationObject returns correct object", () => {
        const obj = buildDonationObject("Test", "20", "2025-01-01", "Hi");
        expect(obj).toEqual({
            charity: "Test",
            amount: 20,
            date: "2025-01-01",
            message: "Hi"
        });
    });
});

// Integration tests

describe("Integration Tests", () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <form id="donationForm">
                <input id="charity" value="Test Charity" />
                <input id="amount" value="25" />
                <input id="date" value="2025-01-01" />
                <textarea id="message">Hello</textarea>
                <p id="errorMessage"></p>
            </form>
        `;

         document.getElementById("message").value = "Hello";
    });
    

    // Integration test 1: tempdonationupdated correctly
    test("tempDonation updates correctly on valid submit", () => {
        const event = { preventDefault: () => {} };
        onSubmit(event);

        expect(getTempDonation()).toEqual({
            charity: "Test Charity",
            amount: 25,
            date: "2025-01-01",
            message: "Hello"
        });
    });

    // Integration test 2: Error shown + tempDonation cleared on invalid submit
    test("error displays and tempDonation cleared on invalid submit", () => {
        document.getElementById("amount").value = "";

        const event = { preventDefault: () => {} };
        onSubmit(event);

        expect(document.getElementById("errorMessage").innerText.length).toBeGreaterThan(0);
        expect(getTempDonation()).toBe(null);
    });
});
