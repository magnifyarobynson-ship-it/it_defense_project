const mongoose = require('mongoose');

// ─── Task Schema ─────────────────────────────────────────────────────────────
const taskSchema = new mongoose.Schema(
  {
    title: {
      type:     String,
      required: [true, 'Task title is required'],
      trim:     true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type:    String,
      trim:    true,
      default: ''
    },
    dueDate: {
      type:    Date,
      default: null
    },
    priority: {
      type:    String,
      enum:    ['Low', 'Medium', 'High'],
      default: 'Medium'
    },
    status: {
      type:    String,
      enum:    ['pending', 'completed'],
      default: 'pending'
    },
    completedAt: {
      type:    Date,
      default: null
    }
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true
  }
);

module.exports = mongoose.model('Task', taskSchema);

