import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/logoutUtils";
import { useAuth } from "../context/userContext";
import { toast } from "react-hot-toast";

const HeaderContainer = styled.header`
  background-color: #0a5e66;
  padding: 1.5rem 0;
`;

const HeaderContent = styled.div`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Logo = styled(Link)`
  font-size: 2.5rem;
  font-weight: bold;
  color: wheat;
  margin-bottom: 4px;
  transition: font-size 0.3s ease;
  &:hover {
    color: aliceblue;
    font-size: 2.7rem;
  }
`;

const Tagline = styled.p`
  font-size: 1rem;
  color: wheat;
  margin-top: 0;
`;

const NavLinks = styled.nav`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  @media (min-width: 768px) {
    margin-top: 0;
    margin-left: auto;
  }
`;

const NavLink = styled(Link)`
  color: wheat;
  text-decoration: none;
  margin: 0 20px;
  transition: color 0.3s ease, font-size 0.3s ease;
  font-size: larger;
  &:hover {
    font-size: x-large;
    color: aliceblue;
  }
`;

const LogoutButton = styled(Link)`
  color: wheat;
  text-decoration: none;
  border: none;
  background-color: transparent;
  margin: 0 10px;
  transition: background-color 0.3s ease, font-size 0.3s ease;
  font-size: larger;
  &:hover {
    font-size: x-large;
    color: aliceblue;
  }
`;

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
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          <div className="text-center pr-5">
            <Logo to="/home" className="logo">
              NewsHub
            </Logo>

            <Tagline>Stay Informed</Tagline>
          </div>
          <NavLinks>
            {!isAuthenticated && (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
            {isAuthenticated && (
              <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>
            )}
            <NavLink to="/home">Home</NavLink>
          </NavLinks>
        </HeaderContent>
      </div>
    </HeaderContainer>
  );
}

export default Header;
