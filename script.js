// reveal
window.addEventListener("scroll",()=>{
document.querySelectorAll(".reveal").forEach(el=>{
if(el.getBoundingClientRect().top < window.innerHeight-100){
el.classList.add("active");
}
});
});

// dark mode
function toggleDark(){
document.body.classList.toggle("dark");
}

// language toggle
let lang="en";
function toggleLang(){
lang = lang==="en" ? "hi":"en";
document.querySelectorAll("[data-en]").forEach(el=>{
el.innerText = el.dataset[lang];
});
}

/* HERO BACKGROUND SLIDER */
/* HERO BACKGROUND SLIDER WITH FALLBACK */
const hero = document.querySelector(".clean-hero");

const heroImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552",
  "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed"
];

const fallbackImage = "poster.jpeg"; // local image
let currentSlide = 0;

// preload images safely
function preloadImage(url, callback) {
  const img = new Image();
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
  img.src = url;
}

function setHeroImage(url) {
  hero.style.backgroundImage = `
    linear-gradient(rgba(0,0,0,.6), rgba(0,0,0,.6)),
    url('${url}')
  `;
}

// first load
preloadImage(heroImages[0], success => {
  setHeroImage(success ? heroImages[0] : fallbackImage);
});

// auto slider
setInterval(() => {
  currentSlide = (currentSlide + 1) % heroImages.length;
  preloadImage(heroImages[currentSlide], success => {
    setHeroImage(success ? heroImages[currentSlide] : fallbackImage);
  });
}, 5000);

/* ACTIVE NAV LINK */
const links = document.querySelectorAll(".nav a");
const currentPage = location.pathname.split("/").pop().replace(".html", "");

links.forEach(link => {
  if (link.dataset.page === currentPage) {
    link.classList.add("active");
  }
});

function sendBooking(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const eventType = document.getElementById("eventType").value;
  const location = document.getElementById("location").value.trim();
  const guests = document.getElementById("guests").value || "Not specified";
  const message = document.getElementById("message").value || "None";

  if (!name || !phone || !date || !eventType || !location) {
    alert("Please fill all required fields.");
    return;
  }

  const whatsappMessage = 
`📌 *New Event Booking Request*

👤 Name: ${name}
📞 Phone: ${phone}
📅 Event Date: ${date}
🎉 Event Type: ${eventType}
📍 Location: ${location}
👥 Guests: ${guests}

📝 Additional Details:
${message}

— Sent from Website`;

  const whatsappNumber = "918052149718";

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  window.open(whatsappURL, "_blank");
}

function toggleMenu() {
  const menu = document.querySelector(".nav-links");

  if (menu.classList.contains("active")) {
    console.log("off");
    // OFF → hide tabs
    menu.classList.remove("active");
  } else {
    console.log("on");
    // ON → show tabs
    menu.classList.add("active");
  }
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-links").classList.remove("active");
  });
});


/* TYPING ANIMATION (ON LOAD) */
const text = "Professional Tent & Event Management";
const heading = document.getElementById("typing-heading");
const subtitle = document.getElementById("typing-subtitle");
const button = document.getElementById("hero-btn");

let index = 0;

function typeText() {
  if (index < text.length) {
    heading.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeText, 60);
  } else {
    subtitle.style.opacity = "1";
    setTimeout(() => {
      button.style.opacity = "1";
    }, 600);
  }
}

window.addEventListener("load", typeText);

