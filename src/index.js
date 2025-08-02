const openMenu = document.getElementById("open-menu");
const navBar = document.getElementById("nav-links");
const links = document.querySelectorAll("[data-link]");

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
});

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(linkItem => {
            linkItem.classList.remove("border-white");
            linkItem.classList.add("border-transparent");
        });

        link.classList.remove("border-transparent");
        link.classList.add("border-white");
    })
});