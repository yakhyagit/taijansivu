const orderForm = document.getElementById("orderForm");
const orderError = document.getElementById("orderError");
const orderSuccess = document.getElementById("orderSuccess");
const successText = document.getElementById("successText");
const newOrderBtn = document.getElementById("newOrderBtn");

function showError(msg) {
  orderError.textContent = msg;
  orderError.classList.add("show");
}

function hideError() {
  orderError.textContent = "";
  orderError.classList.remove("show");
}

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  hideError();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const quantity = Number(document.getElementById("quantity").value);
  const delivery = document.getElementById("delivery").value;
  const address = document.getElementById("address").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!fullName || !email || !phone || !address) {
    showError("Täytä kaikki pakolliset kentät (*).");
    return;
  }

  if (!email.includes("@")) {
    showError("Syötä kelvollinen sähköpostiosoite.");
    return;
  }

  if (!quantity || quantity < 1) {
    showError("Kappalemäärän täytyy olla vähintään 1.");
    return;
  }

  const newOrder = {
    id: Date.now(),
    date: new Date().toLocaleDateString("fi-FI"),
    fullName,
    email,
    phone,
    quantity,
    delivery,
    address,
    message
  };

  // Saqlash (keyin hallintapaneelissa näyttämistä varten)
  const existingOrders = JSON.parse(localStorage.getItem("toppotassut_orders") || "[]");
  existingOrders.unshift(newOrder);
  localStorage.setItem("toppotassut_orders", JSON.stringify(existingOrders));

  // Formani yashirib, rahmat xabarini ko'rsatish
  orderForm.hidden = true;
  orderSuccess.hidden = false;
  successText.textContent =
    `Kiitos, ${fullName}! Tilauksesi (${quantity} kpl, ${delivery}) on vastaanotettu. ` +
    `Vahvistus lähetetään osoitteeseen ${email}.`;
});

newOrderBtn.addEventListener("click", () => {
  orderForm.reset();
  orderForm.hidden = false;
  orderSuccess.hidden = true;
  hideError();
});