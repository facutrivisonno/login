const hamburguerButton = document.querySelector(".hamburguer-button");
const menu = document.querySelector(".menu");

hamburguerButton.addEventListener("click", () => {
    menu.classList.toggle("active");
});
