// Loan object to store data
let loan = {
  amount: 0,
  rate: 0,
  duration: 0
};

// DOM elements
const amountInput = document.getElementById("amount");
const rateInput = document.getElementById("rate");
const durationInput = document.getElementById("duration");
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const monthlyPaymentEl = document.getElementById("monthlyPayment");
const totalPaymentEl = document.getElementById("totalPayment");

// Event listener for calculate button
calculateBtn.addEventListener("click", calculateLoan);

// Event listener for reset button
resetBtn.addEventListener("click", resetForm);

function calculateLoan() {
  // Get input values
  loan.amount = Number(amountInput.value);
  loan.rate = Number(rateInput.value);
  loan.duration = Number(durationInput.value);

  // Input validation
  if (
    loan.amount <= 0 ||
    loan.rate < 0 ||
    loan.duration <= 0 ||
    isNaN(loan.amount) ||
    isNaN(loan.rate) ||
    isNaN(loan.duration)
  ) {
    message.textContent = "Please enter valid loan details.";
    monthlyPaymentEl.textContent = "---";
    totalPaymentEl.textContent = "---";
    return;
  }

  message.textContent = "";

  // Loan calculation
  let monthlyRate = loan.rate / 12 / 100;
  let monthlyPayment;

  if (monthlyRate === 0) {
    monthlyPayment = loan.amount / loan.duration;
  } else {
    monthlyPayment =
      (loan.amount * monthlyRate * Math.pow(1 + monthlyRate, loan.duration)) /
      (Math.pow(1 + monthlyRate, loan.duration) - 1);
  }

  let totalPayment = monthlyPayment * loan.duration;

  // Display results
  monthlyPaymentEl.textContent = monthlyPayment.toFixed(2);
  totalPaymentEl.textContent = totalPayment.toFixed(2);
}

function resetForm() {
  amountInput.value = "";
  rateInput.value = "";
  durationInput.value = "";
  message.textContent = "";
  monthlyPaymentEl.textContent = "---";
  totalPaymentEl.textContent = "---";
}