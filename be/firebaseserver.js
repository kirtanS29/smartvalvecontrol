require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Firebase setup
const serviceAccount = require("./firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL, // Make sure this is set in .env
});

const db = admin.database();

// ✅ Twilio setup
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const userPhoneNumber = process.env.USER_PHONE_NUMBER;

// ✅ API to check if server is running
app.get("/test", (req, res) => {
  res.json({ message: "✅ Server is working!" });
});

// ✅ API to fetch gas leak status
app.get("/gas-status", async (req, res) => {
  try {
    const snapshot = await db.ref("/gas_detected").once("value");
    const gasLeak = snapshot.val() || false;
    console.log("📡 Gas Leak Status Fetched:", gasLeak);
    res.json({ gasLeak });
  } catch (error) {
    console.error("❌ Error fetching gas status:", error);
    res.status(500).json({ error: "Failed to fetch gas status" });
  }
});

// ✅ API to fetch valve status
app.get("/valve-status", async (req, res) => {
  try {
    const snapshot = await db.ref("/valve_control").once("value");
    const valveState = snapshot.val() || false;
    console.log("📡 Valve Status Fetched:", valveState);
    res.json({ valveState });
  } catch (error) {
    console.error("❌ Error fetching valve status:", error);
    res.status(500).json({ error: "Failed to fetch valve status" });
  }
});

// ✅ API to toggle valve
app.post("/toggle-valve", async (req, res) => {
  try {
    const { state } = req.body;

    if (typeof state !== "boolean") {
      return res.status(400).json({ error: "Invalid state value, must be true or false" });
    }

    await db.ref("/valve_control").set(state); // Update Firebase
    console.log(`✅ Valve state updated to: ${state ? "Open" : "Closed"}`);

    res.json({ success: true, valveState: state });
  } catch (error) {
    console.error("❌ Error toggling valve:", error);
    res.status(500).json({ error: "Failed to update valve state" });
  }
});

// ✅ Watch for gas leaks and send alerts
db.ref("/gas_detected").on("value", (snapshot) => {
  const gasLeak = snapshot.val();
  if (gasLeak === true) {
    console.log("🚨 Gas Leak Detected! Sending SMS and closing valve...");

    // Send SMS alert
    client.messages
      .create({
        body: "🚨 Gas Leak Detected! The valve is being closed automatically.",
        from: twilioNumber,
        to: userPhoneNumber,
      })
      .then((message) => console.log("📩 SMS Sent:", message.sid))
      .catch((error) => console.error("❌ Twilio Error:", error));

    // Auto-close the valve if gas is detected
    db.ref("/valve_control").set(false); // Set to false to CLOSE the valve
  }
});

// ✅ Start Server
const PORT = 5001;
app.listen(PORT, () => console.log(`🔥 Firebase Server running on port ${PORT}`));
