import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import "./Header.css";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openLoginModal = () => {
    setAuthMode("login");
    setIsModalOpen(true);
  };

  const openSignupModal = () => {
    setAuthMode("signup");
    setIsModalOpen(true);
  };

  // Function for smooth scrolling
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => scrollToSection("home")} style={{ cursor: "pointer" }}>
          <AlertTriangle size={30} />
          <h1>GasSafe</h1>
        </div>
        <nav className="navbar-nav">
          <ul className="navbar-menu">
            <li><a role="button" tabIndex="0" onClick={() => scrollToSection("home")}>Home</a></li>
            <li><a role="button" tabIndex="0" onClick={() => scrollToSection("features")}>Services</a></li>
            <li><a role="button" tabIndex="0" onClick={() => scrollToSection("features")}>About</a></li>
            <li><a role="button" tabIndex="0" onClick={() => scrollToSection("contact")}>Contact</a></li>
          </ul>
        </nav>
        <div className="navbar-auth">
          <button className="btn-outline" onClick={openLoginModal}>Login</button>
          <button className="btn-primary" onClick={openSignupModal}>Sign Up</button>
        </div>
      </div>

      {isModalOpen && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setIsModalOpen(false)} 
          onSwitchMode={() => setAuthMode(authMode === "login" ? "signup" : "login")}
        />
      )}
    </header>
  );
};

export default Header;
