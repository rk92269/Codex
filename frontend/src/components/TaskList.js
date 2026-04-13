import React from "react";

function formatDate(dateValue) {
  if (!dateValue) {
    return "Just now";
  }

  return new Date(dateValue).toLocaleDateString();
}

function TaskList({ tasks, isLoading, onEdit, onDelete, onToggleComplete }) {
  if (isLoading) {
    return <p className="empty-state">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks found</h3>
        <p>Add your first task to start organizing customer work.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>
                <div className="task-title-cell">
                  <strong>{task.title}</strong>
                </div>
              </td>
              <td>{task.description || "No description provided"}</td>
              <td>
                <label className="status-toggle">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task)}
                  />
                  <span
                    className={
                      task.completed ? "status-badge done" : "status-badge pending"
                    }
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>
                </label>
              </td>
              <td>{formatDate(task.updatedAt)}</td>
              <td>
                <div className="action-group">
                  <button
                    className="action-button action-edit"
                    onClick={() => onEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-button action-delete"
                    onClick={() => onDelete(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
