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

// local storage helpers
function loadDonations() {
    return JSON.parse(localStorage.getItem("donations")) || [];
}

function saveDonations(donations) {
    localStorage.setItem("donations", JSON.stringify(donations));
}

function renderDonationTable() {
    const donations = loadDonations();
    const tableBody = document.querySelector("#donationTable tbody");

    tableBody.innerHTML = ""; 

    donations.forEach((donation, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${donation.charity}</td>
            <td>${donation.amount}</td>
            <td>${donation.date}</td>
            <td>${donation.message}</td>
            <td>
                <button class="delete-btn" data-index="${index}">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    // Add delete button click listeners
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.getAttribute("data-index");
            deleteDonation(index);
        });
    });
    updateTotalDonations();

}

function deleteDonation(index) {
    const donations = loadDonations();   // get existing
    donations.splice(index, 1);           // remove one item
    saveDonations(donations);              // save updated list
    renderDonationTable();                // refresh table
}

function updateTotalDonations() {
    const donations = loadDonations();

    const total = donations.reduce((sum, donation) => {
        return sum + Number(donation.amount);
    }, 0);

    document.getElementById("totalDonations").innerText = total;
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
    const donations = loadDonations();
    donations.push(tempDonation);
    saveDonations(donations);
    renderDonationTable();

    
    console.log("Donation submitted:", tempDonation);
} 

function onPageLoad() {
    const form = document.getElementById("donationForm");
    if (form) {
        form.addEventListener("submit", onSubmit);
    }
    // Render table when the page loads
    renderDonationTable();

    console.log("Loaded saved donations:", loadDonations());
}



onPageLoad();

if (typeof module !== "undefined") {
    module.exports = {
        validateDonation,
        buildDonationObject,
        onSubmit,
        getTempDonation: () => tempDonation
    };
}
