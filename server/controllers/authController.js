const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authResponse = (user) => ({
    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }),
    user: { name: user.name, email: user.email, role: user.role },
});

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const exists = await User.findOne({ email: email.toLowerCase() });
        if (exists) {
            return res.status(400).json({ message: "This email is already registered" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });

        res.status(201).json(authResponse(user));
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: (email || "").toLowerCase() });
        if (!user || !(await bcrypt.compare(password || "", user.password))) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.json(authResponse(user));
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register, login };