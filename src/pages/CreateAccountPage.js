import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateAccountPage.css";

const CreateAccountPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    axios
      .post("http://127.0.0.1:8000/api/users/", {
        name: username,
        password: password,
        loyalty_score: 100,
        role: "user",
      })
      .then(() => {
        alert("Account created successfully!");
        navigate("/login");
      })
      .catch(() => {
        setError("Error creating account. Please try again.");
      });
  };

  return (
    <div className="create-account-container">
      <div className="create-account-container-inner">
        <h1>Create Account</h1>
        {error && <p>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleCreateAccount}>Create Account</button>
      </div>
    </div>
  );
};

export default CreateAccountPage;
