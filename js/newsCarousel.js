
import React, { useState, useEffect } from "react";
import "./NewsCarousel.css";
import logo from "../assets/LogoTransparent.png";

const newsItems = [
  {
    title: "Upcoming Dating Sim Game",
    description: "After a close encounter with space pirates, the Captain finds unexpected romance in a far away nebula",
    image: logo,
  },  {
    title: "Caprayac Forges Social Media",
    description: "Interested in following us on social media? Check out our links below!",
    image: logo,
  }, {
    title: "Coming soon",
    description: "More updates on our game coming soon!",
    image: logo,
  },
];

function NewsCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % newsItems.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  useEffect(() => {
    const interval = setInterval(next, 5000); // auto scroll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const getClass = (index) => {
    if (index === current) return "carousel-card active";
    if (index === (current + 1) % newsItems.length) return "carousel-card right";
    if (index === (current - 1 + newsItems.length) % newsItems.length) return "carousel-card left";
    return "carousel-card hidden";
  };

  return (
    <div className="news-carousel">
      <h2>Our Latest Work</h2>
      <div className="carousel-wrapper">
        <button className="carousel-btn" onClick={prev}>←</button>
        <div className="carousel-container">
          {newsItems.map((item, index) => (
            <div key={index} className={getClass(index)}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <button className="carousel-btn" onClick={next}>→</button>
      </div>
    </div>
  );
}

export default NewsCarousel;
