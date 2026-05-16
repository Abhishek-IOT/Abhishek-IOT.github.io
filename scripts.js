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



const mediumFeed = "https://medium.com/feed/@abhi007.lko";

const cleanText = (html) => {
  return html
    .replace(/<h1[^>]*>.*?<\/h1>/gi, '')
    .replace(/<h2[^>]*>.*?<\/h2>/gi, '')
    .replace(/<h3[^>]*>.*?<\/h3>/gi, '')
    .replace(/<[^>]*>?/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
};

fetch(`https://api.rss2json.com/v1/api.json?rss_url=${mediumFeed}`)
  .then(res => res.json())
  .then(data => {

    const slider = document.getElementById("medium-slider");

    data.items.slice(0, 8).forEach(post => {

      let thumbnail = post.thumbnail;

      if (!thumbnail || thumbnail === "") {
        thumbnail = "https://via.placeholder.com/400x200";
      }

      const description = cleanText(
        post.description || post.content || ""
      );

      const div = document.createElement("div");
      div.className = "blog-card";

      div.innerHTML = `
        

        <div class="blog-content">
          <h3>${post.title}</h3>

          <p>
            ${description.substring(0, 140)}...
          </p>

          <a class="read-btn" href="${post.link}" target="_blank">
            Read Article
          </a>
        </div>
      `;

      slider.appendChild(div);
    });

    // Auto Slide
    let scrollAmount = 0;

    setInterval(() => {
      scrollAmount += 340;

      if (scrollAmount >= slider.scrollWidth - window.innerWidth) {
        scrollAmount = 0;
      }

      slider.style.transform =
        `translateX(-${scrollAmount}px)`;

    }, 3000);

  });