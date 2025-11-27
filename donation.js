let tempDonation = null;

function validateDonation(charity, amount, date) {
    if (!charity || !amount || !date) {
        return { valid: false, message: "All fields are required." };
    }

    if (isNaN(amount) || Number(amount) <= 0) {
        return { valid: false, message: "Donation amount must be a positive number." };
    }

    return { valid: true, message: "" };
}

function buildDonationObject(charity, amount, date, message) {
    return {
        charity: charity,
        amount: Number(amount),
        date: date,
        message: message
    };
}

function onSubmit(event) {
    event.preventDefault();

    const charity = document.getElementById("charity").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const date = document.getElementById("date").value;
    const message = document.getElementById("message").value.trim();

    const result = validateDonation(charity, amount, date);

    if (!result.valid) {
        document.getElementById("errorMessage").innerText = result.message;
        tempDonation = null;
        return;
    }

    document.getElementById("errorMessage").innerText = "";

    tempDonation = buildDonationObject(charity, amount, date, message);
}

function onPageLoad() {
    const form = document.getElementById("donationForm");
    if (form) {
        form.addEventListener("submit", onSubmit);
    }
}

if (typeof module !== "undefined") {
    module.exports = {
        validateDonation,
        buildDonationObject,
        onSubmit,
        getTempDonation: () => tempDonation
    };
}
