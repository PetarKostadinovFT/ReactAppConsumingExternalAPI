import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import { useAuth } from "../context/userContext";
import { handleLogin } from "../utils/loginUtils";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    handleLogin(data, setIsAuthenticated, navigate);
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center container-login">
      <div className="card shadow p-5">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login</h3>
          <form onSubmit={loginUser}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email..."
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter Password..."
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-block login-btn">
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/register">Register here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
