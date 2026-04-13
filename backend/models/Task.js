const mongoose = require("mongoose");

// This schema describes what each task will look like in MongoDB
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Create and export the Task model
module.exports = mongoose.model("Task", taskSchema);
