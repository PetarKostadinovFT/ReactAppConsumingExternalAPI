import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/login.css";
import axios from "axios";
import { toast } from "react-hot-toast";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      console.log("ee");
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
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
            <button type="submit" className="btn bg-info  btn-block">
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
