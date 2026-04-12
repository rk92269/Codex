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
    <form onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>

      <div>
        <label htmlFor="title">Title</label>
        <br />
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter task title"
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label htmlFor="description">Description</label>
        <br />
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter task description"
          rows="4"
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <button type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
