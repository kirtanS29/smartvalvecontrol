/*import React, { useState, useEffect } from "react";

export default function App() {
  const [gasLeak, setGasLeak] = useState(false);
  const [valve, setValve] = useState(false);

  useEffect(() => {
    fetch('https://gas-leak-detector-feca6-default-rtdb.asia-southeast1.firebasedatabase.app/gas_detected.json')
      .then(res => res.json())
      .then(data => setGasLeak(data));
  }, []);

  const toggleValve = async () => {
    const newState = !valve;
    setValve(newState);
    await fetch('http://localhost:3000/toggle-valve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: newState })
    });
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl">Gas Leak Detector</h1>
      <p className="mt-2 text-lg">{gasLeak ? '🚨 Gas Leak Detected!' : '✅ Safe'}</p>
      <button onClick={toggleValve} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        {valve ? 'Open Valve' : 'Close Valve'}
      </button>
    </div>
  );
}
*/