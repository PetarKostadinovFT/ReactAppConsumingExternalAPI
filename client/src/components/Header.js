import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
  return (
    <header className="bg-info text-white py-3 header-container">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="text-center pr-5">
            <h1 className="logo">
              <Link to="/" className="logo">
                NewsHub
              </Link>
            </h1>
            <p className="tagline">Stay Informed</p>
          </div>
          <nav className="nav-links">
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/register" className="btn">
              Register
            </Link>
            <Link to="/" className="btn">
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
