import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/userContext";
import { handleRegister } from "../utils/registerUtils";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 20px;
  background-color: #fff;
`;

const CardTitle = styled.h3`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  margin-top: 2rem;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  background-color: #0a5e66;
  color: wheat;
  font-size: x-large;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
  border-radius: 4px;
  padding: 10px;
  margin-top: 4rem;
  margin-bottom: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #0a5e66;
    color: aliceblue;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LinkToLogin = styled.a`
  color: #0a5e66;
  text-decoration: solid;
  &:hover {
    color: #0a5e66;
    text-decoration: underline;
    font-weight: bold;
    text-underline-offset: 4px;
    cursor: pointer;
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [data, setData] = useState({ email: "", password: "", repass: "" });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRegister(data, setIsAuthenticated, navigate);
    setLoading(true);
  };

  return (
    <Container>
      <Card>
        <CardTitle>Register</CardTitle>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Enter Email..."
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Enter Password..."
            />
          </div>
          <div>
            <Label htmlFor="repass">Confirm Password</Label>
            <Input
              type="password"
              id="repass"
              value={data.repass}
              onChange={(e) => setData({ ...data, repass: e.target.value })}
              placeholder="Repeat Password..."
            />
          </div>
          <Button
            data-testid="register-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Form>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          Already have an account?{" "}
          <LinkToLogin href="/login">Login here</LinkToLogin>
        </p>
      </Card>
    </Container>
  );
};

export default Register;

