import React, {UseState} from 'react';
import './newscarousel.css';

document.addEventListener("DOMContentLoaded", () => {
const newsItems = [
  {
    title: "Upcoming Dating Sim Game",
    description: "After a close encounter with space pirates, the Captain finds unexpected romance in a far away nebula",
    image: "Logo.png",
  },  {
    title: "Caprayac Forges Social Media",
    description: "Interested in following us on social media? Check out our links below!",
    image: "Logo.png",
  }, {
    title: "Coming soon",
    description: "More updates on our game coming soon!",
    image: "Logo.png",
  },
];

let currentIndex = 0;
  const track = document.getElementById("carousel-track");

  function renderCarousel() {
    track.innerHTML = "";

    for (let i = 0; i < newsItems.length; i++) {
      const card = document.createElement("div");
      const relativeIndex = (i - currentIndex + newsItems.length) % newsItems.length;

      card.className = "carousel-card";

      if (relativeIndex === 0) card.classList.add("left");
      else if (relativeIndex === 1) card.classList.add("center");
      else if (relativeIndex === 2) card.classList.add("right");
      else card.classList.add("hidden");

      card.innerHTML = `
        <div class="card-image">
          <img src="${newsItems[i].image}" alt="${newsItems[i].title}" />
        </div>
        <div class="card-content">
          <h3>${newsItems[i].title}</h3>
          <p>${newsItems[i].description}</p>
        </div>
      `;
      track.appendChild(card);
    }
  }

  function nextCard() {
    currentIndex = (currentIndex + 1) % newsItems.length;
    renderCarousel();
  }

  function prevCard() {
    currentIndex = (currentIndex - 1 + newsItems.length) % newsItems.length;
    renderCarousel();
  }

  document.getElementById("next-btn").addEventListener("click", nextCard);
  document.getElementById("prev-btn").addEventListener("click", prevCard);

  renderCarousel();
});
