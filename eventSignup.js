
let tempSignup = null;

/**
 * Validate signup data.
 * @param {Object} data
 * @param {string} data.eventName
 * @param {string} data.repName
 * @param {string} data.repEmail
 * @param {string} data.eventRole
 * @returns {string[]} 
 */
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

/**
 * Process raw form data into a cleaned signup object.
 * @param {Object} data
 * @returns {Object} 
 */
function processSignup(data) {
    return {
        eventName: data.eventName.trim(),
        repName: data.repName.trim(),
        repEmail: data.repEmail.trim(),
        eventRole: data.eventRole.trim()
    };
}

/**
 * Setter for tempSignup (used in DOM + tests).
 * @param {Object} signup
 */
function setTempSignup(signup) {
    tempSignup = signup;
}

/**
 * Getter for tempSignup (used in tests).
 * @returns {Object|null}
 */
function getTempSignup() {
    return tempSignup;
}

/**
 * Handle form submission from the DOM.
 * @param {SubmitEvent} event
 */
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

    // No errors → process data and store in temporary object
    const cleaned = processSignup(formData);
    setTempSignup(cleaned);

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

/**
 * Export for Jest tests (Node.js / CommonJS environment).
 */
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        validateSignup,
        processSignup,
        handleEventSignupSubmit,
        getTempSignup,
        setTempSignup
    };
}
