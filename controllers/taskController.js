const db = require('../config/db');

exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title)
            return res.status(400).json({ error: "Title is required" });

        await db.query(
            `INSERT INTO tasks(user_id, title, description) VALUES (?, ?, ?)`,
            [req.user.id, title, description]
        );

        return res.status(201).json({ message: "Task created" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const [tasks] = await db.query(
            `SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC`,
            [req.user.id]
        );

        return res.json(tasks);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        await db.query(
            `UPDATE tasks SET title = ?, description = ? WHERE id = ? AND user_id = ?`,
            [title, description, req.params.id, req.user.id]
        );

        return res.json({ message: "Task updated" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        await db.query(
            `DELETE FROM tasks WHERE id = ? AND user_id = ?`,
            [req.params.id, req.user.id]
        );

        return res.json({ message: "Task deleted" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};