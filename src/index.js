const openMenu = document.getElementById("open-menu");
const navBar = document.getElementById("nav-links");

openMenu.addEventListener("click", () => {
    if(navBar.style.display === "flex") {
        navBar.style.display = "none";
        openMenu.src = "./starter-code/assets/shared/icon-hamburger.svg";
        navBar.classList.remove("mobile");
    } else {
        navBar.style.display = "flex";
        openMenu.src = "./starter-code/assets/shared/icon-close.svg";
        navBar.classList.add("mobile");
    }
})