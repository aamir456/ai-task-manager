// frontend/src/App.jsx
import { useState, useEffect } from "react";
import api from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/");     // GET /tasks/
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      setLoading(true);
      setError("");
      await api.post("/", form);          // POST /tasks/
      setForm({ title: "", description: "" });
      await loadTasks();
    } catch (err) {
      console.error(err);
      setError("Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Task description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Add Task"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <h2>Existing Tasks</h2>
      {loading && tasks.length === 0 && <p>Loading...</p>}
      {tasks.length === 0 && !loading && <p>No tasks yet.</p>}

      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t.id} className="task-item">
            <strong>{t.title}</strong>
            <p>{t.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
