import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import logo from "../assets/images/Check.png";
import axios from "axios";
import styled from "styled-components";
import "./EarnPointsPage.css";

const EarnPointsPage = () => {
  const [userData, setUserData] = useState({
    name: "USER",
    points: 0,
    role: "user",
  });
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    task_name: "",
    task_description: "",
    points: 0,
  });

  useEffect(() => {
    const name = localStorage.getItem("name") || "Login to see profile!";
    const points = parseInt(localStorage.getItem("loyalty_score"), 10) || 0;
    const role = localStorage.getItem("role") || "user";

    setUserData({ name, points, role });

    axios
      .get("http://localhost:8000/api/tasks/")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  const handleAddTask = () => {
    axios
      .post("http://localhost:8000/api/tasks/", newTask)
      .then(() => {
        setShowModal(false);
        window.location.reload();
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCompleteTask = (task) => {
    const userId = localStorage.getItem("user_id");

    axios
      .post("http://localhost:8000/api/update-points/", {
        user_id: userId,
        points: task.points,
      })
      .then((response) => {
        const updatedPoints = response.data.updated_points;

        localStorage.setItem("loyalty_score", updatedPoints);
        setUserData((prevState) => ({
          ...prevState,
          points: updatedPoints,
        }));

        alert(`Task completed! You earned ${task.points} points.`);
      })
      .catch((error) => console.error("Error updating points:", error));
  };

  return (
    <div className="earn-points-page">
      <Sidebar userData={userData} onNavigate={handleNavigate} />
      <main className="main-content">
        <h1>Earn More Points...</h1>

        {userData.role === "admin" && (
          <button className="add-task-btn" onClick={() => setShowModal(true)}>
            Add Task
          </button>
        )}

        <div className="task-grid">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-icon">
                <img src={logo} alt="Task Icon" />
              </div>
              <h3 className="task-title">{task.task_name}</h3>
              <p className="task-description" style={{margin: 0}}>Do this to earn more points.</p>
              <p className="task-points">Points: {task.points}</p>
              <StyledButton onClick={() => handleCompleteTask(task)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
                Claim Task!
              </StyledButton>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Task</h2>
            <input
              type="text"
              name="task_name"
              placeholder="Task Title"
              value={newTask.task_name}
              onChange={handleInputChange}
            />
            <textarea
              name="task_description"
              placeholder="Task Description"
              value={newTask.task_description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="points"
              placeholder="Points"
              value={newTask.points}
              onChange={handleInputChange}
            />
            <button onClick={handleAddTask}>Submit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarnPointsPage;

const StyledButton = styled.button`
  background-color: #ffffff00;
  color: black;
  width: 9em;
  font-size: 15px;
  height: 2.9em;
  border: #f9f9f9 0.2em solid;
  border-radius: 11px;
  text-align: right;
  transition: all 0.6s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1em;
    margin-right: 0.5em;
    transition: all 0.6s ease;
  }

  &:hover {
    background-color: #dedfe8;
    cursor: pointer;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;
