const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, city, password } = req.body;

        if (!name || !email || !city || !password)
            return res.status(400).json({ error: "All fields are required" });

        // Check if user exists
        const [existing] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
        if (existing.length > 0)
            return res.status(400).json({ error: "Email already registered" });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        await db.query(
            `INSERT INTO users(name, email, city, password) VALUES (?, ?, ?, ?)`,
            [name, email, city, hashedPassword]
        );

        return res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password)
            return res.status(400).json({ error: "Email and password required" });

        // Check if user exists
        const [user] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);
        if (user.length === 0)
            return res.status(400).json({ error: "Invalid email or password" });

        const existingUser = user[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch)
            return res.status(400).json({ error: "Invalid email or password" });

        // Create JWT
        const token = jwt.sign(
            { id: existingUser.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            message: "Login successful",
            token,
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};