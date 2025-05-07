const express = require('express');
const cors = require('cors');
const connectDB = require('./Models/db');
require('dotenv').config();

// Import Routes
const authRoutes = require('./Routes/AuthRouter');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
