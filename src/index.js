const openMenu = document.getElementById("open-menu");
const navBar = document.getElementById("nav-links");
const links = document.querySelectorAll("[data-link]");
const pages = document.querySelectorAll(".content-page");
const backgrounds = document.querySelectorAll("picture[id$='-background']");
const numSwitch = document.querySelectorAll("[data-change]");


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


// Fetching destination data.
let destinationData = [];
let crewData = [];
let techData = [];

fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        // destination data
        destinationData = data.destinations;

        // crew data
        crewData = data.crew;
        createCrewSlides(crewData);

        // tech data
        techData = data.technology;
        renderTechPage(0);

        // Tech page event listener
        addTechEventListeners();

        // Initializing glide
        const glide = new Glide(".glide").mount();

        // shows moon by default in destination page
        renderDestination("moon");
    })
    .catch(error => console.error("Failed to fetch data:", error));

// Function to render destination
function renderDestination(name) {
    const destination = destinationData.find(
        (dest) => dest.name.toLowerCase() === name.toLowerCase()
    );

    if(!destination) {
        return;
    }

    document.getElementById("destination-image").src = destination.images.png;
    document.getElementById("destination-image").alt = destination.name;
    document.getElementById("destination-name").textContent = destination.name;
    document.getElementById("destination-description").textContent = destination.description;
    document.getElementById("destination-distance").textContent = destination.distance;
    document.getElementById("destination-travel").textContent = destination.travel;

    //Highlighting active tab
    document.querySelectorAll("[data-sublink]").forEach(link => {
        if(link.dataset.sublink === name.toLowerCase()) {
            link.classList.add("border-white");
        } else {
            link.classList.remove("border-white");
        }
    });
}

// Creating slide carousels with glide js
function createCrewSlides(crewData) {
    const trackElement = document.querySelector(".glide__track");

    // The slides container
    const slidesContainer = document.createElement("ul");
    slidesContainer.className = "glide__slides";

    // Building slides with crewData
    crewData.forEach(crew => {
        const slide = document.createElement("li");
        slide.className = "glide__slide";

        slide.innerHTML = `
            <section class="flex flex-col lg:flex-row gap-[4rem] py-[2rem] lg:px-[2rem] lg:text-left text-center">  
                <div class="lg:self-center">
                    <h2 class="text-2xl md:text-4xl text-white/70 uppercase py-[0.5rem]">${crew.role}</h2>
                    <p class="text-4xl md:text-6xl uppercase py-[1rem]">${crew.name}</p>

                    <p class="lg:w-[35rem] text-white/70" id="crew-bio">
                        ${crew.bio}
                    </p>
                </div>

                <div class="self-center lg:self-auto">
                    <img 
                        src="${crew.images.png}" 
                        alt="${crew.name}"
                    >
                </div>
            </section>
        `;

        slidesContainer.appendChild(slide);
    });

    trackElement.innerHTML = "";
    trackElement.appendChild(slidesContainer);
}

function renderTechPage(index) {
    // Where I wanted to dynamically sort the data from the data.json file
    const tech = techData[index];

    if(!tech) {
        console.error("No tech data found for index:", index);
        return;
    }

    // Updating the content
    document.getElementById("tech-name").textContent = tech.name;
    document.getElementById("tech-description").textContent = tech.description;
    document.getElementById("landscape").src =  tech.images.landscape;
    document.getElementById("portrait").src = tech.images.portrait;

    updateActiveButton(index);
}


// Styling active button dynamically in the tech page
function updateActiveButton(activeIndex) {
    // Removing active styling from all buttons
    numSwitch.forEach(button => {
        button.classList.remove("bg-white", "text-black");
    });

    // Adding active styling to active button.
    const activeButton = document.querySelector(`[data-change="${activeIndex + 1}"]`);
    if(activeButton) {
        activeButton.classList.add("bg-white", "text-black");
    }
}

// Adding event listeners to the tech page buttons
function addTechEventListeners() {
    numSwitch.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            const buttonNumber = parseInt(button.dataset.change);
            const index = buttonNumber - 1;

            renderTechPage(index);
        })
    })
}

// Adding event listeners to destination tabs.
document.querySelectorAll("[data-sublink]").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const name = link.dataset.sublink;
        renderDestination(name);
    });
});
