import React, { useState, useEffect } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = input;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
    }

    setInput("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  const clearAll = () => {
    setTasks([]);
  };

  return (
    <div>

      {/* HERO */}
      <div className="hero">
        <h1>Organize Your Life</h1>
        <p>Simple and smart Todo App to manage your daily tasks</p>
        <button>Get Started</button>
      </div>

      {/* FEATURES */}
      <div className="features">
        <h2>Features</h2>
        <div className="feature-box">
          <div className="feature">✔ Add Tasks</div>
          <div className="feature">✏️ Edit Tasks</div>
          <div className="feature">🗑 Delete Tasks</div>
          <div className="feature">💾 Auto Save</div>
        </div>
      </div>

      {/* TODO APP */}
      <div className="container">
        <h1>Todo List</h1>

        <div className="input-container">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task"
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button onClick={addTask}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="list-item">
              <span
                onClick={() => toggleTask(index)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  cursor: "pointer",
                }}
              >
                {task.text}
              </span>

              <div>
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <button className="clear-btn" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

    </div>
  );
}
