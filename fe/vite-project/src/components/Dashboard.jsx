import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "../firebase";

import "./Dashboard.css";

export default function Dashboard() {
  const [gasLeak, setGasLeak] = useState(false);
  const [valve, setValve] = useState(false);

  useEffect(() => {
    const gasRef = ref(database, "/gas_detected");
    const valveRef = ref(database, "/valve_control");
  
    const gasListener = onValue(gasRef, (snapshot) => {
      setGasLeak(snapshot.val() || false);
    });
  
    const valveListener = onValue(valveRef, (snapshot) => {
      setValve(snapshot.val() || false);
    });
  
    return () => {
      gasListener(); // Unsubscribe from gasRef
      valveListener(); // Unsubscribe from valveRef
    };
  }, []);
  
  const toggleValve = async (state) => {
    try {
      console.log("Sending request to toggle valve with state:", state);
      const response = await fetch("http://localhost:5001/toggle-valve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state }),
      });
      
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      
      // Rest of your code...
    } catch (error) {
      console.error("❌ Error sending valve state:", error);
    }
  };
  
  return (
    <div className="dashboard-container">
      {/* System Status */}
      <div className="status-card">
        <div className={`status-icon ${gasLeak ? "danger" : "safe"}`}>
          {gasLeak ? "⚠️" : "✅"}
        </div>
        <h2>System Status</h2>
        <p className={`status-text ${gasLeak ? "danger" : "safe"}`}>
          {gasLeak ? "GAS LEAK DETECTED!" : "SAFE - NO LEAKS DETECTED"}
        </p>
      </div>

      {/* Valve Control */}
      <div className="control-card">
        <h2>🔌 Valve Control</h2>
        <p className="valve-status">
          Current Valve Status:{" "}
          <span className={valve ? "open" : "closed"}>
            {valve ? "Open" : "Closed"}
          </span>
        </p>
        <div className="button-group">
          <button className="btn" onClick={() => toggleValve(true)} disabled={valve}>
            ✅ OPEN VALVE
          </button>
          <button className="btn" onClick={() => toggleValve(false)} disabled={!valve}>
            ❌ CLOSE VALVE
          </button>
        </div>
      </div>
    </div>
  );
}