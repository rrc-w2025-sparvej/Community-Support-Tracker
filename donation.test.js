// Unit tests and integration tests for donations.js



const {
    validateDonation,
    buildDonationObject,
    onSubmit,
    getTempDonation,

    //Stage 2 exports
    loadDonations,
    saveDonations,
    renderDonationTable,
    deleteDonation,
    updateTotalDonations,
    

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

describe("Stage 2 Unit Tests", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("calculate total donation amount correctly", () => {
        saveDonations([
            { charity: "A", amount: 10, date: "2025-01-01", message: "" },
            { charity: "B", amount: 20, date: "2025-01-02", message: "" }
        ]);

        document.body.innerHTML = `
            <table id="donationTable"><tbody></tbody></table>
            <span id="totalDonations"></span>
        `;

        updateTotalDonations();
        expect(document.getElementById("totalDonations").innerText).toBe("30");
    });

    test("deleting a record updates localStorage", () => {
        saveDonations([
            { charity: "A", amount: 10, date: "2025-01-01", message: "" },
            { charity: "B", amount: 20, date: "2025-01-02", message: "" }
        ]);

        deleteDonation(0);

        expect(loadDonations().length).toBe(1);
        expect(loadDonations()[0].charity).toBe("B");
    });
});

describe("Stage 2 Integration Tests", () => {
    beforeEach(() => {
        localStorage.clear();

        document.body.innerHTML = `
            <table id="donationTable">
                <tbody></tbody>
            </table>
            <span id="totalDonations"></span>
        `;
    });

    test("table updates after saving data", () => {
        saveDonations([
            { charity: "Test", amount: 50, date: "2025-01-10", message: "Hi" }
        ]);

        renderDonationTable();

        const rows = document.querySelectorAll("#donationTable tbody tr");
        expect(rows.length).toBe(1);
        expect(rows[0].children[0].innerHTML).toBe("Test");
    });

    test("table loads persisted data correctly", () => {
        saveDonations([
            { charity: "A", amount: 10, date: "2025-01-01", message: "x" },
            { charity: "B", amount: 20, date: "2025-01-02", message: "y" }
        ]);

        renderDonationTable();

        const rows = document.querySelectorAll("#donationTable tbody tr");
        expect(rows.length).toBe(2);
        expect(rows[1].children[0].innerHTML).toBe("B");
    });
});
