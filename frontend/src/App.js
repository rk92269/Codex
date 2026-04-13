import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import api from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks when the page opens
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
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

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === "completed") {
      return task.completed;
    }

    if (statusFilter === "pending") {
      return !task.completed;
    }

    return true;
  });

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Customer Task Workspace</p>
          <h1>Task Manager Dashboard</h1>
          <p className="hero-text">
            Track requests, update progress, and keep your team aligned with a
            clean task workflow.
          </p>
        </div>

        <div className="hero-badge">
          <span>Live Overview</span>
          <strong>{totalTasks} Tasks</strong>
        </div>
      </section>

      <section className="summary-grid">
        <article className="summary-card">
          <span>Total Tasks</span>
          <strong>{totalTasks}</strong>
          <p>All task records currently in your workspace.</p>
        </article>

        <article className="summary-card">
          <span>Pending</span>
          <strong>{pendingTasks}</strong>
          <p>Tasks that still need follow-up or delivery.</p>
        </article>

        <article className="summary-card">
          <span>Completed</span>
          <strong>{completedTasks}</strong>
          <p>Finished work ready for review or archive.</p>
        </article>
      </section>

      <section className="content-grid">
        <div className="panel">
          <TaskForm
            onSubmit={handleAddOrUpdateTask}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
          />
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Task List</h2>
              <p>Review tasks in a table and manage them quickly.</p>
            </div>

            <label className="filter-group" htmlFor="statusFilter">
              <span>Filter</span>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </label>
          </div>

          <TaskList
            tasks={filteredTasks}
            isLoading={isLoading}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onToggleComplete={handleToggleComplete}
          />
        </div>
      </section>
    </main>
  );
}

export default App;
