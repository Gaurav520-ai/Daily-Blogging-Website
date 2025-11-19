// Adds animated color flash when clicked
const items = document.querySelectorAll('.category');

items.forEach(item => {
  item.addEventListener("click", () => {
    item.style.transition = "background 0.4s ease";
    item.style.background = "linear-gradient(135deg, #ff6b6b, #ff4757)";

    setTimeout(() => {
      item.style.background = "";
    }, 500);
  });
});
// Auto-update footer year
document.getElementById("year").textContent = new Date().getFullYear();
