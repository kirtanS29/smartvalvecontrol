import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const DashboardNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Remove token
    navigate("/"); // Redirect to Home
  };

  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "15px 20px", backgroundColor: "#f8f9fa", borderBottom: "2px solid #ddd"
    }}>
      {/* GasSafe Logo */}
      <h2 style={{ fontSize: "24px", color: "#d9534f", fontWeight: "bold" }}>
      <AlertTriangle size={24} /> GasSafe
      </h2>

      {/* Logout Button */}
      <button 
        onClick={handleLogout} 
        style={{
          backgroundColor: "#d9534f", color: "white", padding: "10px 15px", 
          borderRadius: "5px", border: "none", cursor: "pointer", fontWeight: "bold"
        }}>
        Logout
      </button>
    </nav>
  );
};

export default DashboardNavbar;
