import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import DashboardNavbar from "./components/DashboardNavbar"; // New Navbar for Dashboard
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import Dashboard from "./components/Dashboard"; // Corrected path

function App() {
  const [authMode, setAuthMode] = useState(null); // Track if login/signup modal is open
  const navigate = useNavigate(); // Navigation hook
  const location = useLocation(); // Get current route

  return (
    <div className="app">
      {/* Show Header only if NOT on the Dashboard */}
      {location.pathname !== "/dashboard" ? <Header /> : <DashboardNavbar />}

      <main>
        <Routes>
          <Route path="/" element={<><Hero /><Features /></>} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard Route */}
        </Routes>
      </main>

      {/* Show Footer only if NOT on Dashboard */}
      {location.pathname !== "/dashboard" && <Footer />}

      {/* Conditional Auth Modal Rendering */}
      {authMode && (
        <AuthModal 
          mode={authMode} 
          onClose={() => setAuthMode(null)} 
          onSwitchMode={() => setAuthMode(authMode === "login" ? "signup" : "login")}
        />
      )}
    </div>
  );
}

export default App;
