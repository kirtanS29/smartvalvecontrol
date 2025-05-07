const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

// Signup
const signup = async (req, res) => {
    try {
        console.log("🟢 Received Signup Request:", JSON.stringify(req.body, null, 2)); // Log request body

        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            console.log("🔴 Missing Fields:", { name, username, email, password });
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await UserModel.findOne({ 
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            console.log("🔴 User Already Exists:", existingUser);
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🟢 Hashed Password Generated");

        const newUser = new UserModel({ name, username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        console.log("🟢 New User Saved:", savedUser);
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        console.error("🔴 Signup Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Login
const login = async (req, res) => {
    try {
        const { username, password } = req.body; // ✅ Use 'username' instead of 'name'
        console.log("Login Attempt:", { username, password });

        const user = await UserModel.findOne({ username }); // ✅ Search by 'username'

        console.log("User Found:", user);

        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            console.log("Password incorrect");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: "Login successful", token, user: { username: user.username } });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


module.exports = { signup, login };
