const { JSDOM } = require("jsdom");
const {
    validateSignup,
    processSignup,
    handleEventSignupSubmit,
    getTempSignup,
    setTempSignup
} = require("./eventSignup");

beforeEach(() => {
  
    setTempSignup(null);
});

describe("validateSignup() - Unit Tests", () => {
    test("should identify empty required fields", () => {
        const data = {
            eventName: "",
            repName: "",
            repEmail: "",
            eventRole: ""
        };

        const errors = validateSignup(data);

        expect(errors).toContain("Event name is required.");
        expect(errors).toContain("Company representative's name is required.");
        expect(errors).toContain("Representative's email is required.");
        expect(errors).toContain("Role selection is required.");
    });

    test("should flag invalid email format", () => {
        const data = {
            eventName: "Cleanup",
            repName: "John Doe",
            repEmail: "invalidemail",
            eventRole: "Sponsor"
        };

        const errors = validateSignup(data);

        expect(errors).toContain("Please enter a valid email address.");
    });

    test("should return no errors for valid input", () => {
        const data = {
            eventName: "Food Drive",
            repName: "Alice Smith",
            repEmail: "alice@example.com",
            eventRole: "Participant"
        };

        const errors = validateSignup(data);

        expect(errors.length).toBe(0);
    });
});

describe("processSignup() - Unit Tests", () => {
    test("should return a cleaned, trimmed signup object", () => {
        const data = {
            eventName: "  Cleanup Day  ",
            repName: "  John Smith ",
            repEmail: " john@example.com ",
            eventRole: " Sponsor "
        };

        const processed = processSignup(data);

        expect(processed).toEqual({
            eventName: "Cleanup Day",
            repName: "John Smith",
            repEmail: "john@example.com",
            eventRole: "Sponsor"
        });
    });
});

describe("Integration Tests — Form Submission", () => {
    let dom;
    let document;

    beforeEach(() => {

        dom = new JSDOM(`
            <!DOCTYPE html>
            <form id="eventSignupForm">
                <input id="eventName" />
                <input id="repName" />
                <input id="repEmail" />
                <select id="eventRole">
                    <option value="">Select a role</option>
                    <option value="Sponsor">Sponsor</option>
                    <option value="Participant">Participant</option>
                    <option value="Organizer">Organizer</option>
                </select>
                <div id="formErrors"></div>
            </form>
        `);

        document = dom.window.document;

        // Bind the DOM to global for event handler to work
        global.document = document;
        global.window = dom.window;
    });

    test("valid form submission updates the temporary data object correctly", () => {
        // Fill valid values
        document.getElementById("eventName").value = "Food Drive";
        document.getElementById("repName").value = "Sarah Lee";
        document.getElementById("repEmail").value = "sarah@example.com";
        document.getElementById("eventRole").value = "Sponsor";

        const form = document.getElementById("eventSignupForm");

        // Trigger the handler
        form.addEventListener("submit", handleEventSignupSubmit);

        const submitEvent = new dom.window.Event("submit", {
            bubbles: true,
            cancelable: true,
        });

        form.dispatchEvent(submitEvent);

        const stored = getTempSignup();

        expect(stored).toEqual({
            eventName: "Food Drive",
            repName: "Sarah Lee",
            repEmail: "sarah@example.com",
            eventRole: "Sponsor"
        });

        // Should NOT show error messages
        expect(document.getElementById("formErrors").innerHTML).toBe("");
    });

    test("invalid form submission shows error messages and does NOT update tempSignup", () => {
        // Leave fields empty (invalid)
        document.getElementById("eventName").value = "";
        document.getElementById("repName").value = "";
        document.getElementById("repEmail").value = "invalid-email";
        document.getElementById("eventRole").value = "";

        const form = document.getElementById("eventSignupForm");

        form.addEventListener("submit", handleEventSignupSubmit);

        const submitEvent = new dom.window.Event("submit", {
            bubbles: true,
            cancelable: true,
        });

        form.dispatchEvent(submitEvent);

        const errorDiv = document.getElementById("formErrors").innerHTML;

        expect(errorDiv).toContain("Event name is required.");
        expect(errorDiv).toContain("Company representative's name is required.");
        expect(errorDiv).toContain("Please enter a valid email address.");
        expect(errorDiv).toContain("Role selection is required.");

        // tempSignup should NOT be updated
        expect(getTempSignup()).toBe(null);
    });
});
