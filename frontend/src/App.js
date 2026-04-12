import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import api from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks when the page opens
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddOrUpdateTask = async (taskData) => {
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, {
          ...taskData,
          completed: editingTask.completed
        });
        setEditingTask(null);
      } else {
        await api.post("/tasks", {
          ...taskData,
          completed: false
        });
      }

      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleToggleComplete = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        title: task.title,
        description: task.description,
        completed: !task.completed
      });

      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <h1>Task Manager</h1>
      <p>Manage your tasks with a simple full-stack CRUD app.</p>

      <TaskForm
        onSubmit={handleAddOrUpdateTask}
        editingTask={editingTask}
        onCancelEdit={handleCancelEdit}
      />

      <hr style={{ margin: "20px 0" }} />

      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default App;
