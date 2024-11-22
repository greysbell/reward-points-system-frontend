import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import styled from "styled-components";
import logo from '../assets/images/Leaf.png'
import { useNavigate } from "react-router-dom";
import logo2 from '../assets/images/Account.jpg'



const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const name = localStorage.getItem("name");

  const handleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setDropdownOpen(false);
    navigate("/login");
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo}></img>
        <Link to="/">Green Leaf</Link>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#" className="static-link">
            Home
          </a>
        </li>
        <li>
          <Link to="/points">Points & Rewards</Link>
        </li>
        <li>
          <a href="#" className="static-link">
            Services
          </a>
        </li>
        <li className="account-link">
          <a href="#" onClick={handleDropdown}>
            My Account
          </a>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {name ? (
                <>
                  <StyledButton onClick={handleLogout}>
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
                    Logout
                  </StyledButton>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={handleLinkClick}
                  >
                    Login
                  </Link>
                  <Link
                    to="/create-account"
                    className="dropdown-item"
                    onClick={handleLinkClick}
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          )}
        </li>
        <img src={logo2} style={{width:60, top: 2, right:2, position:"absolute" }}></img>
      </ul>
    </nav>
  );
};

const StyledButton = styled.button`
  background-color: #ffffff00;
  color: black;
  width: 8.5em;
  height: 2.9em;
  border: #ffffff 0.2em solid;
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

export default Navbar;
