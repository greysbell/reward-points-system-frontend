import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./TransactionsPage.css";

const TransactionPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [userData, setUserData] = useState({
      name: "USER",
      points: 0,
    });
  
    useEffect(() => {
      const userId = localStorage.getItem("user_id");
      const name = localStorage.getItem("name") || "Login to see profile!";
      const points = parseInt(localStorage.getItem("loyalty_score"), 10) || 0;
  
      setUserData({ name, points });
  
      axios
        .get(`http://localhost:8000/api/transactions/${userId}/`)
        .then((response) => {
          setTransactions(response.data.transactions);
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });
    }, []);
  
    const handleNavigate = (path) => {
      window.location.href = path;
    };
  
    const clearTransactions = () => {
      setTransactions([]); 
    };
  
    return (
      <div className="transaction-page">
        <Sidebar
          userData={userData}
          onNavigate={handleNavigate}
          onLogout={clearTransactions} 
        />
        <main className="main-content">
          <h1>Transaction History</h1>
          <div className="transaction-list">
            {transactions.map((transaction) => (
              <div key={transaction.transaction_id} className="transaction-item">
                <div className="details">
                  <div className="title">{transaction.reward_name}</div>
                  <div className="description">
                    Redeemed for {transaction.reward_cost} points
                  </div>
                  <div className="coupon">
                    <strong>Coupon:</strong> {transaction.coupon}
                  </div>
                </div>
                <div className="time">{transaction.date}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  };
  
  export default TransactionPage;
  