
/* ================= DARK MODE ================= */
function toggleDarkMode(){
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("mode","dark");
        modeText.innerText = "Light";
    }else{
        localStorage.setItem("mode","light");
        modeText.innerText = "Dark";
    }
}

/*======= IMAGE USED=======*/
/* ================= VARIABLES ================= */
const images = [
    "hospital4.png",
"doctors1.jpg",
"doctors2.jpg"
];
let bgIndex = 0;

const cards = document.querySelectorAll(".test-card");
let slideIndex = 0;

/* ================= LOAD ================= */
window.onload = function(){

    // Load dark mode
    if(localStorage.getItem("mode") === "dark"){
        document.body.classList.add("dark");
        modeText.innerText = "Light";
    }

    // Load last slide
    if(localStorage.getItem("slideIndex")){
        slideIndex = parseInt(localStorage.getItem("slideIndex"));
    }

    changeBackground();
    showSlide();

    setInterval(changeBackground,3000);
    setInterval(nextSlide,3000);
}

/* ================= HERO BACKGROUND ================= */
function changeBackground(){
    const hero = document.querySelector(".hero");

    hero.style.backgroundImage =
    `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url('${images[bgIndex]}')`;

    bgIndex = (bgIndex + 1) % images.length;
}

/* ================= SHOW SLIDE ================= */
function showSlide(){
    cards.forEach(card => card.classList.remove("active"));
    cards[slideIndex].classList.add("active");

    // Save last slide
    localStorage.setItem("slideIndex", slideIndex);
}

/* ================= NEXT / PREV ================= */
function nextSlide(){
    slideIndex = (slideIndex + 1) % cards.length;
    showSlide();
}

function prevSlide(){
    slideIndex = (slideIndex - 1 + cards.length) % cards.length;
    showSlide();
}

