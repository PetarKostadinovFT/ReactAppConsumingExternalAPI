import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/register.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/userContext";

function Register() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [data, setData] = useState({ email: "", password: "", repass: "" });

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const { email, password, repass } = data;

    if (email === "" || password === "" || repass === "") {
      return toast.error("All fields are required!");
    }
    if (password !== repass) {
      toast.error("Passwords don't match!");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        email,
        password,
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        setIsAuthenticated(true);
        toast.success("Register Successful. Welcome!");
        navigate("/home");
      }
    } catch (err) {
      toast.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center ">
      <div className="card shadow p-5">
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Register</h3>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                id="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="Enter Email..."
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
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="Enter Password..."
              />
            </div>
            <div className="mb-3">
              <label htmlFor="repass" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="repass"
                value={data.repass}
                onChange={(e) => setData({ ...data, repass: e.target.value })}
                placeholder="Repeat Password..."
              />
            </div>
            <button
              data-testid="register-button"
              type="submit"
              className="btn btn-primary btn-block register-btn"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
