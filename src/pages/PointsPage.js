import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./PointsPage.css";


const PointsPage = () => {
  const [userData, setUserData] = useState({
    name: "USER",
    points: 0,
    role: "user",
  });

  const [rewards, setRewards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newReward, setNewReward] = useState({
    reward_name: "",
    reward_description: "",
    points_required: 0,
  });

  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [couponCode, setCouponCode] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name") || "Login to see profile!";
    const points = parseInt(localStorage.getItem("loyalty_score"), 10) || 0;
    const role = localStorage.getItem("role") || "user";

    setUserData({ name, points, role });

    axios
      .get("http://localhost:8000/api/loyaltyrewards/")
      .then((response) => setRewards(response.data))
      .catch((error) => console.error("Error fetching rewards:", error));
  }, []);

  const handleAddReward = () => {
    axios
      .post("http://localhost:8000/api/loyaltyrewards/", newReward)
      .then(() => {
        setShowModal(false);
        window.location.reload();
      })
      .catch((error) => console.error("Error adding reward:", error));
  };

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReward((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClaimReward = (reward) => {
    if (userData.points < reward.points_required) {
      alert("You do not have enough points to redeem this reward.");
      return;
    }
    setSelectedReward(reward);
    setConfirmModal(true);
  };

  const generateCoupon = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length: Math.floor(Math.random() * 3) + 6 })
      .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
      .join("");
  };

  const confirmRedemption = () => {
    const coupon = generateCoupon();
    axios
      .post("http://localhost:8000/api/redeem-reward/", {
        user_id: localStorage.getItem("user_id"),
        reward_id: selectedReward.reward_id,
        coupon,
      })
      .then(() => {
        setCouponCode(coupon);
        setConfirmModal(false);
        const updatedPoints = userData.points - selectedReward.points_required;
        setUserData((prevData) => ({ ...prevData, points: updatedPoints }));
        localStorage.setItem("loyalty_score", updatedPoints);
        alert("Reward successfully redeemed! Your coupon: " + coupon);
        window.location.reload();
      })
      .catch((error) => console.error("Error redeeming reward:", error));
  };

  return (
    <div className="points-page">
      <Sidebar userData={userData} onNavigate={handleNavigate} />
      <main className="main-content">
        <h1>Claim Rewards</h1>
        {userData.role === "admin" && (
          <button className="add-reward-btn" onClick={() => setShowModal(true)}>
            Add Reward
          </button>
        )}
        <div className="rewards-grid">
          {rewards.map((reward) => (
            <div key={reward.reward_id} className="reward-card">
              <div className="reward-image"></div>
              <h3>{reward.reward_name}</h3>
              <p>{reward.reward_description}</p>
              <p className="points-required">
                Points Required: {reward.points_required}
              </p>
              <StyledButton onClick={() => handleClaimReward(reward)}>
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
                Claim Reward!
              </StyledButton>
            </div>
          ))}
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Reward</h2>
            <input
              type="text"
              name="reward_name"
              placeholder="Reward Name"
              value={newReward.reward_name}
              onChange={handleInputChange}
            />
            <textarea
              name="reward_description"
              placeholder="Reward Description"
              value={newReward.reward_description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="points_required"
              placeholder="Points Required"
              value={newReward.points_required}
              onChange={handleInputChange}
            />
            <button onClick={handleAddReward}>Submit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {confirmModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Redemption</h2>
            <p>
              Are you sure you want to redeem {selectedReward.reward_name} for{" "}
              {selectedReward.points_required} points?
            </p>
            <button onClick={confirmRedemption}>Yes</button>
            <button onClick={() => setConfirmModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

const StyledButton = styled.button`
  background-color: #ffffff00;
  color: black;
  width: 10em;
  font-size: 15px;
  height: 2.9em;
  border: white 0.2em solid;
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

export default PointsPage;
