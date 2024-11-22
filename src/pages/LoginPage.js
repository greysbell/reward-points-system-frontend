import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://127.0.0.1:8000/api/login/", { name: username, password })
      .then((response) => {
        const { user_id, name, loyalty_score, role } = response.data;
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("name", name);
        localStorage.setItem("loyalty_score", loyalty_score);
        localStorage.setItem("role", role);
        navigate("/points");
      })
      .catch((error) => {
        setError(error.response?.data?.error || "Login failed");
      });
  };

  return (
    <div className="login-container">
      <div className="login-container-inner">
        <h1>Login</h1>
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
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
