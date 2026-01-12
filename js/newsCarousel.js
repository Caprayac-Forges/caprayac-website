
const cardsData = [
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

function renderCards() {
  const carousel = document.getElementById("carousel");
  carousel.innerHTML = "";

  const total = cardsData.length;
  const indexes = [
    (currentIndex + total - 1) % total,
    currentIndex,
    (currentIndex + 1) % total
  ];

  indexes.forEach((i, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    if (index === 1) card.classList.add("center");

    card.innerHTML = `
      <h3>${cardsData[i].title}</h3>
      <img src="${cardsData[i].image}" alt="${cardsData[i].title}" />
      <p>${cardsData[i].description}</p>
    `;
    carousel.appendChild(card);
  });
}

document.getElementById("prevBtn").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + cardsData.length) % cardsData.length;
  renderCards();
});

document.getElementById("nextBtn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % cardsData.length;
  renderCards();
});

renderCards();
