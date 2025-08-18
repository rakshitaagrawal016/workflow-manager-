import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Dashboard = () => {
  const [goals, setGoals] = useState([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch goals
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/goals", config);
        setGoals(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (token) fetchGoals();
  }, [token]);

  // Add goal
  const addGoal = async (e) => {
    e.preventDefault();
    if (!text) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/goals",
        { text },
        config
      );
      setGoals([...goals, res.data]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete goal
  const deleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/goals/${id}`, config);
      setGoals(goals.filter((goal) => goal._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  // Update goal
const updateGoal = async (id, newText) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/goals/${id}`,
      { text: newText },
      config
    );
    setGoals(goals.map((goal) => (goal._id === id ? res.data : goal)));
  } catch (err) {
    console.error(err);
  }
};

  // Logout
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>

      <form onSubmit={addGoal} style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Enter new goal..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" style={{ marginTop: "10px", width: "100%" }}>
          Add Goal
        </button>
      </form>

      <ul>
        {goals.length > 0 ? (
          goals.map((goal) => (
            <li key={goal._id}>
  <span>{goal.text}</span>
  <div>
    <button
      onClick={() => {
        const newText = prompt("Edit your goal:", goal.text);
        if (newText) updateGoal(goal._id, newText);
      }}
      style={{ marginRight: "8px", background: "#28a745" }}
    >
      ✏️
    </button>
    <button onClick={() => deleteGoal(goal._id)}>❌</button>
  </div>
</li>

          ))
        ) : (
          <p>No goals yet. Add one above!</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
