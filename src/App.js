import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PointsPage from "./pages/PointsPage";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import MyAccountPage from "./pages/MyAccountPage";
import TransactionsPage from "./pages/TransactionsPage";
import EarnPointsPage from "./pages/EarnPointsPage";
import FaqPage from "./pages/Faq";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/points" element={<PointsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/account" element={<MyAccountPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/earn" element={<EarnPointsPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
    </Router>
  );
};

export default App;
