const express = require('express');
const router  = express.Router();
const Task    = require('../models/Task');

// ─────────────────────────────────────────────────────────────────────────────
//  GET /api/tasks
//  Returns all tasks, newest first.
//  Query params:
//    ?status=pending|completed   → filter by status
//    ?priority=Low|Medium|High   → filter by priority
// ─────────────────────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.status)   filter.status   = req.query.status;
    if (req.query.priority) filter.priority = req.query.priority;

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
//  GET /api/tasks/:id
//  Returns a single task by its MongoDB _id.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
//  POST /api/tasks
//  Creates a new task.
//  Body: { title, description, dueDate, priority }
// ─────────────────────────────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const task = await Task.create({ title, description, dueDate, priority });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Could not create task', error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
//  PUT /api/tasks/:id
//  Updates an existing task.
//  Body can include any combination of:
//    { title, description, dueDate, priority, status }
//  If status is set to "completed", completedAt is set automatically.
//  If status is set to "pending",   completedAt is cleared.
// ─────────────────────────────────────────────────────────────────────────────
router.put('/:id', async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    // Build update object only from fields that were sent
    const updates = {};
    if (title       !== undefined) updates.title       = title;
    if (description !== undefined) updates.description = description;
    if (dueDate     !== undefined) updates.dueDate     = dueDate || null;
    if (priority    !== undefined) updates.priority    = priority;
    if (status      !== undefined) {
      updates.status      = status;
      updates.completedAt = status === 'completed' ? new Date() : null;
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Could not update task', error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
//  DELETE /api/tasks/:id
//  Permanently deletes a task.
// ─────────────────────────────────────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }
    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;

