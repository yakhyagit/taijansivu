const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const closeBtn = document.getElementById("closeModalBtn");

document.querySelectorAll(".zoom-img").forEach((img) => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalCaption.textContent = img.dataset.caption || img.alt || "Kuva";
    modal.showModal();
  });
});

closeBtn.addEventListener("click", () => modal.close());

// Orqa fonga bosilganda ham yopilishi uchun
modal.addEventListener("click", (e) => {
  const rect = modal.getBoundingClientRect();
  const clickedOutside =
    e.clientX < rect.left ||
    e.clientX > rect.right ||
    e.clientY < rect.top ||
    e.clientY > rect.bottom;
  if (clickedOutside) modal.close();
});