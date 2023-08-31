import React from "react";
import { Link } from "react-router-dom";
import "../styles/notFound.css";

function NotFound() {
  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist.</p>
        <Link to="/home" className="btn notfound-btn">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
