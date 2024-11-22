import React from "react";
import { useNavigate } from "react-router-dom";

const MyAccountPage = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const loyaltyScore = localStorage.getItem("loyalty_score");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login"); 
  };

  return (
    <div>
      {name ? (
        <>
          <h1>Welcome, {name}</h1>
          <p>Loyalty Points: {loyaltyScore}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div>
          <p>You are not signed in.</p>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/create-account")}>Create Account</button>
        </div>
      )}
    </div>
  );
};

export default MyAccountPage;
