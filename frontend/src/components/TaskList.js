import React from "react";

function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  if (tasks.length === 0) {
    return <p>No tasks found. Add your first task.</p>;
  }

  return (
    <div>
      <h2>Task List</h2>

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "10px",
            backgroundColor: "#fff"
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description || "No description"}</p>
          <p>
            <strong>Status:</strong> {task.completed ? "Completed" : "Pending"}
          </p>

          <label style={{ display: "block", marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task)}
            />{" "}
            Mark as completed
          </label>

          <button onClick={() => onEdit(task)}>Edit</button>
          <button
            onClick={() => onDelete(task._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
