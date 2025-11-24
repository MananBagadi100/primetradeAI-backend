const db = require('../config/db');

exports.getProfile = async (req, res) => {
    try {
        const [user] = await db.query(`SELECT id, name, email FROM users WHERE id = ?`, [
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
        const { name } = req.body;

        if (!name)
            return res.status(400).json({ error: "Name is required" });

        await db.query(`UPDATE users SET name = ? WHERE id = ?`, [name, req.user.id]);

        return res.json({ message: "Profile updated successfully" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
};