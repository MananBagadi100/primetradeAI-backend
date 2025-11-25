const db = require('../config/db');

exports.getProfile = async (req, res) => {
    try {
        const [user] = await db.query(`SELECT id, name, email, city FROM users WHERE id = ?`, [
            req.user.id
        ]);

        return res.json(user[0]);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, city } = req.body;

        if (!name || !city)
            return res.status(400).json({ error: "Name and city are required" });

        await db.query(`UPDATE users SET name = ?, city = ? WHERE id = ?`, [name, city, req.user.id]);

        return res.json({ message: "Profile updated successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};