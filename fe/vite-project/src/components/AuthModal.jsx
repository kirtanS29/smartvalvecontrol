import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { signup, login } from "../api/authapi";
import "./AuthModal.css";

const AuthModal = ({ mode, onClose, onSwitchMode }) => {
  const [name, setName] = useState(""); // Name for signup
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Store error messages
  const navigate = useNavigate(); // Initialize navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (!name || !username || !email || !password) {
        setError("All fields are required for signup.");
        return;
      }

      const signupData = { name, username, email, password };

      console.log("Submitting Signup Data:", signupData);
      let response = await signup(signupData);
      console.log("Signup API Response:", response);

      if (!response) {
        setError("Signup failed. Please try again.");
        return;
      }

      if (response.message?.toLowerCase().includes("success")) {
        alert(response.message);
        onClose();
      } else {
        setError(response.message);
      }
    } else {
      if (!username.trim() || !password.trim()) {
        setError("Username and Password are required.");
        return;
      }

      let response = await login({ username: username.trim(), password: password.trim() });

      console.log("Login API Response:", response);

      if (!response) {
        setError("Login failed. Please try again.");
        return;
      }

      if (response.message?.toLowerCase().includes("success")) {
        alert(response.message);
        localStorage.setItem("token", response.token); // Store token
        navigate("/dashboard"); // Navigate first
        onClose(); // Close modal after navigation
      } else {
        setError(response.message);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{mode === "login" ? "Login" : "Sign Up"}</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {mode === "signup" && (
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error-message">{error}</p>} {/* Display errors */}
            <button type="submit" className="btn btn-full">
              {mode === "login" ? "Login" : "Sign Up"}
            </button>
          </form>
        </div>
        <div className="modal-footer">
          <p>
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button className="switch-mode-btn" onClick={onSwitchMode}>
              {mode === "login" ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
