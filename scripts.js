document.addEventListener("DOMContentLoaded", function () {

    const profilePic = document.getElementById("profile-pic");
    if (profilePic) {
        profilePic.src = "images/profile.jpg";
    }

    const skillset = document.getElementById("skill-set"); 
    if (skillset) {
        skillset.src = "images/skillset.jpg";
    }

    const track = document.querySelector(".carousel-track");
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let index = 0;

    console.log("Slides:", slides.length);
    console.log("Next button:", nextBtn);
    console.log("Prev button:", prevBtn);

    function updateCarousel() {
        if (!track) return;
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    if (track && slides.length > 0 && nextBtn && prevBtn) {

        nextBtn.addEventListener("click", () => {
            index = (index + 1) % slides.length;
            updateCarousel();
        });

        prevBtn.addEventListener("click", () => {
            index = (index - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        setInterval(() => {
            index = (index + 1) % slides.length;
            updateCarousel();
        }, 4000);

    } else {
        console.log("❌ Carousel not initialized properly");
    }

});