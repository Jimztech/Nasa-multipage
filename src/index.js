const openMenu = document.getElementById("open-menu");
const navBar = document.getElementById("nav-links");
const links = document.querySelectorAll("[data-link]");
const pages = document.querySelectorAll(".content-page");
const backgrounds = document.querySelectorAll("picture[id$='-background']");


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

//Function to show the pages
function showSection(route) {
    const targetId = `${route}-page`;
    const bgId = `${route}-background`;

    pages.forEach(page => {
        page.style.display = "none";
    });

    // Backgrounds.
    backgrounds.forEach(bg => {
        bg.classList.add("hidden");
    });

    const target = document.getElementById(targetId);
    if(target) {
        target.style.display = "block";
    }

    // Showing the matching background
    const activeBg = document.getElementById(bgId);
    if(activeBg) {
        activeBg.classList.remove("hidden");
    }
}

links.forEach(link => {
    link.addEventListener("click", (e) => {

        e.preventDefault();
        const route = link.dataset.link;

        // Changing the url hash
        history.pushState(null, "", `#${route}`);

        //Showing the new section
        showSection(route);

        links.forEach(linkItem => {
            linkItem.classList.remove("border-white");
            linkItem.classList.add("border-transparent");
        });

        link.classList.remove("border-transparent");
        link.classList.add("border-white");
    })
});

// Show page on initial load
window.addEventListener("DOMContentLoaded", () => {
    const initialRoute = location.hash ? location.hash.substring(1) : "home";
    showSection(initialRoute);
});

// Handle forward and backward browser navigation.
window.addEventListener("hashchange", () => {
    const route = location.hash.substring(1);
    showSection(route);
});

