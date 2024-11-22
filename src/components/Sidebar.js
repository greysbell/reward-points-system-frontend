import React from "react";
import "./Sidebar.css";

const Sidebar = ({ userData, onNavigate }) => {
  return (
    <aside className="sidebar">
      <div className="user-info">
        <div className="user-icon">
          <span role="img" aria-label="User">
            👤
          </span>
        </div>
        <div className="user-details">
          <h2>{userData.name}</h2>
          <p>POINTS AVAILABLE:</p>
          <p className="points">{userData.points} PTS</p>
        </div>
      </div>
      <div className="sidebar-buttons">
        <button onClick={() => onNavigate("/points")}>Claim Rewards</button>
        <button onClick={() => onNavigate("/earn")}>Earn Points</button>
        <button onClick={() => onNavigate("/transactions")}>Transaction History</button>
        <button onClick={() => onNavigate("/faq")}>FAQ</button>
      </div>
    </aside>
  );
};

export default Sidebar;
