const mongoose = require('mongoose');

/**
 * Task Schema
 * Full-featured task model with validation, virtuals, and indexes.
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
      default: '',
    },
    priority: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: 'Priority must be Low, Medium, or High',
      },
      default: 'Medium',
    },
    status: {
      type: String,
      enum: {
        values: ['Pending', 'In Progress', 'Completed'],
        message: 'Status must be Pending, In Progress, or Completed',
      },
      default: 'Pending',
    },
    category: {
      type: String,
      enum: {
        values: ['Work', 'Personal', 'Study', 'Health', 'Finance', 'Other'],
        message: 'Invalid category',
      },
      default: 'Other',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    estimatedTime: {
      type: Number,
      min: [0, 'Estimated time cannot be negative'],
      max: [480, 'Estimated time cannot exceed 480 minutes (8 hours)'],
      default: null,
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 5,
        message: 'Cannot have more than 5 tags',
      },
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual: is the task overdue?
taskSchema.virtual('isOverdue').get(function () {
  if (!this.dueDate || this.status === 'Completed') return false;
  return new Date() > this.dueDate;
});

// Indexes for performant queries
taskSchema.index({ status: 1, priority: 1 });
taskSchema.index({ dueDate: 1 });
taskSchema.index({ category: 1 });
taskSchema.index({ createdAt: -1 });
taskSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Task', taskSchema);
