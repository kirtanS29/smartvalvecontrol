import React from "react";
import { Shield, Bell, Clock, Smartphone } from "lucide-react";
import "./Features.css"; // Updated path

const Features = () => {
  const features = [
    {
      icon: <Shield size={48} />,
      title: "Advanced Protection",
      description:
        "Our sensors detect even the smallest gas leaks before they become dangerous.",
    },
    {
      icon: <Bell size={48} />,
      title: "Instant Alerts",
      description:
        "Receive immediate notifications on your phone when a leak is detected.",
    },
    {
      icon: <Clock size={48} />,
      title: "24/7 Monitoring",
      description: "Round-the-clock monitoring ensures your home is always protected.",
    },
    {
      icon: <Smartphone size={48} />,
      title: "Mobile Control",
      description:
        "Manage your system, view reports, and check status from anywhere.",
    },
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">Why Choose GasSafe?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
