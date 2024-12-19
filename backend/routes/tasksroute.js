const express = require('express')
const Task = require('../models/Taskmodel');
const router = express.Router();

// Fetch all tasks
router.get('/', async (req,res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

// Create a new task
router.post("/", async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: "Title and Description are required" });
    }
    const newTask = new Task({ title, description });
    await newTask.save();
    res.status(201).json(newTask);
});

// Update a task
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    if (!title || !description) {
        return res.status(400).json({ error: "Title and Description are required" });
    }
    const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, description, isCompleted, updatedAt: Date.now() },
        { new: true }
    );
    res.json(updatedTask);
});

// Delete a task
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
});

module.exports = router;