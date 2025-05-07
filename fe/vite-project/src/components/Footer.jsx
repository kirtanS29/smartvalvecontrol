import React from "react";
import { AlertTriangle, Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
import "./Footer.css"; // Updated path

const Footer = () => {
  return (
    <footer id="contact" className="footer">  {/* <-- Added id="contact" */}
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2><AlertTriangle size={24} className="footer-icon"/> GasSafe</h2>
            <p>Protecting lives through advanced gas leak detection.</p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p><Phone size={16} /> (+91) 9099446466</p>
            <p><Mail size={16} /> KIRTANSARAIYA.ict22@adaniuni.ac.in</p>
          </div>

          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GasSafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
