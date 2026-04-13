import React, { useEffect, useState } from "react";

function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // If we are editing a task, fill the form with its current values
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTask]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim()
    });

    if (!editingTask) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="panel-header">
        <div>
          <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>
          <p>
            {editingTask
              ? "Update task details and save your changes."
              : "Capture new work items with a clear title and description."}
          </p>
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <div className="field-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter task description"
          rows="5"
        />
      </div>

      <div className="form-actions">
        <button className="primary-button" type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            className="secondary-button"
            type="button"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
