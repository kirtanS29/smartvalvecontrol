import React from "react";
import "./Hero.css"; // Updated path

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1>Protecting Lives Through Gas Safety</h1>
        <p>
          Early detection saves lives. Our advanced gas leak detection systems provide 
          24/7 protection for your home and family.
        </p>
        <div className="hero-actions">
          <button className="btn-primary">Learn More</button>
          <button className="btn-secondary">Our Services</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
