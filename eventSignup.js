<<<<<<< HEAD

=======
>>>>>>> eventsignup-stage2
let tempSignup = null;

// Validate the signup data
function validateSignup(data) {
    const errors = [];

    if (!data.eventName || data.eventName.trim() === "") {
        errors.push("Event name is required.");
    }

    if (!data.repName || data.repName.trim() === "") {
        errors.push("Company representative's name is required.");
    }

    if (!data.repEmail || data.repEmail.trim() === "") {
        errors.push("Representative's email is required.");
    } else {
        const emailPattern = /^\S+@\S+\.\S+$/;
        if (!emailPattern.test(data.repEmail)) {
            errors.push("Please enter a valid email address.");
        }
    }

    if (!data.eventRole || data.eventRole.trim() === "") {
        errors.push("Role selection is required.");
    }

    return errors;
}

// Process and clean the signup data
function processSignup(data) {
    return {
        eventName: data.eventName.trim(),
        repName: data.repName.trim(),
        repEmail: data.repEmail.trim(),
        eventRole: data.eventRole.trim()
    };
}

// Temporary storage for signup data
function setTempSignup(signup) {
    tempSignup = signup;
}

// Retrieve temporary signup data
function getTempSignup() {
    return tempSignup;
}

// Handle form submission
function handleEventSignupSubmit(event) {
    event.preventDefault();

    const eventNameInput = document.getElementById("eventName");
    const repNameInput = document.getElementById("repName");
    const repEmailInput = document.getElementById("repEmail");
    const eventRoleSelect = document.getElementById("eventRole");
    const errorDiv = document.getElementById("formErrors");

    const formData = {
        eventName: eventNameInput ? eventNameInput.value : "",
        repName: repNameInput ? repNameInput.value : "",
        repEmail: repEmailInput ? repEmailInput.value : "",
        eventRole: eventRoleSelect ? eventRoleSelect.value : ""
    };

    const errors = validateSignup(formData);

    // Clear old errors
    if (errorDiv) {
        errorDiv.innerHTML = "";
    }

    // If there are errors, show them and stop
    if (errors.length > 0) {
        if (errorDiv) {
            errorDiv.innerHTML = errors.join("<br>");
        }
        return;
    }

<<<<<<< HEAD
    // No errors →process data and store in temporary object
    const cleaned = processSignup(formData);
    setTempSignup(cleaned);

=======
    // No errors process data and store in temporary object
    const cleaned = processSignup(formData);
    setTempSignup(cleaned);

    // Save to localStorage and update UI
    addSignupToStorage(cleaned);
    renderSignupTable();
    renderSummary();
   
>>>>>>> eventsignup-stage2
    // Optionally reset the form after success
    const form = document.getElementById("eventSignupForm");
    if (form) {
        form.reset();
    }
}

/**
 * Attach event listener in the browser environment.
 */
if (typeof window !== "undefined") {
    const form = document.getElementById("eventSignupForm");
    if (form) {
        form.addEventListener("submit", handleEventSignupSubmit);
    } else {
        // If script is loaded in <head>, wait for DOMContentLoaded
        window.addEventListener("DOMContentLoaded", () => {
            const formOnLoad = document.getElementById("eventSignupForm");
            if (formOnLoad) {
                formOnLoad.addEventListener("submit", handleEventSignupSubmit);
            }
        });
    }
}

<<<<<<< HEAD
=======
const STORAGE_KEY = "eventSignups";

// Get signups from localStorage
function getStoredSignups() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

// Save entire signup array back to localStorage
function saveStoredSignups(signups) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(signups));
}

// Add one signup
function addSignupToStorage(signup) {
    const all = getStoredSignups();
    all.push(signup);
    saveStoredSignups(all);
}

// Render the table
function renderSignupTable() {
    const signups = getStoredSignups();
    const tableBody = document.getElementById("signupTableBody");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    signups.forEach((signup, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${signup.eventName}</td>
            <td>${signup.repName}</td>
            <td>${signup.repEmail}</td>
            <td>${signup.eventRole}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });

    attachDeleteHandlers();
}

// Attach delete button click events
function attachDeleteHandlers() {
    const buttons = document.querySelectorAll(".delete-btn");
    buttons.forEach(btn => {
        btn.addEventListener("click", handleDelete);
    });
}

// Delete signup
function handleDelete(event) {
    const index = event.target.dataset.index;
    const signups = getStoredSignups();

    signups.splice(index, 1);
    saveStoredSignups(signups);

    renderSignupTable();
    renderSummary();
}

// Summary calculation
function calculateRoleSummary(signups) {
    return signups.reduce(
        (acc, s) => {
            acc[s.eventRole] = (acc[s.eventRole] || 0) + 1;
            return acc;
        },
        { Sponsor: 0, Participant: 0, Organizer: 0 }
    );
}

// Render summary box
function renderSummary() {
    const container = document.getElementById("summaryContainer");
    if (!container) return;

    const signups = getStoredSignups();
    const summary = calculateRoleSummary(signups);

    container.innerHTML = `
        <p><strong>Sponsors:</strong> ${summary.Sponsor}</p>
        <p><strong>Participants:</strong> ${summary.Participant}</p>
        <p><strong>Organizers:</strong> ${summary.Organizer}</p>
    `;
}

// Load data on page open
if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", () => {
        renderSignupTable();
        renderSummary();
    });
}

>>>>>>> eventsignup-stage2
/**
 * Export for Jest tests.
 */
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        validateSignup,
        processSignup,
        handleEventSignupSubmit,
        getTempSignup,
<<<<<<< HEAD
        setTempSignup
    };
}
=======
        setTempSignup,

        // Stage Two added exports
        getStoredSignups,
        saveStoredSignups,
        addSignupToStorage,
        renderSignupTable,
        calculateRoleSummary
    };
}
>>>>>>> eventsignup-stage2
