import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import axios from "axios";

import { logout } from "../utils/logoutUtils";
import { useAuth } from "../context/userContext";
import { toast } from "react-hot-toast";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const logoutHandler = async () => {
    const success = await logout(setIsAuthenticated);
    if (success) {
      toast.success("Logout successfully");
      navigate("/home");
    } else {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <header className="header-top text-white py-3 header-container">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="text-center pr-5">
            <h1 className="logo">
              <Link to="/home" className="logo">
                NewsHub
              </Link>
            </h1>
            <p className="tagline">Stay Informed</p>
          </div>
          <nav className="nav-links">
            {!isAuthenticated && (
              <>
                <Link to="/login" className="btn">
                  Login
                </Link>
                <Link to="/register" className="btn">
                  Register
                </Link>
              </>
            )}

            {isAuthenticated && (
              <>
                <Link className="btn" onClick={logoutHandler}>
                  Logout
                </Link>
              </>
            )}
            <Link to="/home" className="btn">
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
