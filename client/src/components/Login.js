import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/userContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      if (email === "" || password === "") {
        return toast.error("All fields are required!");
      }
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        // setEmail({});
        // setPassword({});
        setIsAuthenticated(true);
        toast.success("Login Successful. Welcome!");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center container-login">
      <div className="card shadow p-5">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Login</h3>
          <form data-testid="login-form" onSubmit={loginUser}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              data-testid="login-button"
              type="submit"
              className="btn btn-block login-btn"
            >
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
