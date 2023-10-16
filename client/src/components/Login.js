import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/userContext";
import { handleLogin } from "../utils/loginUtils";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  @media (max-height: 575px) {
    min-height: 100vh;
  }
  @media (max-width: 767px) {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  padding: 20px;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 60px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const LoginButton = styled.button`
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

const RegisterLink = styled.p`
  text-align: center;
  margin-top: 10px;
`;
const LinkToRegister = styled.a`
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

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    handleLogin(data, setIsAuthenticated, navigate);
  };

  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <Form onSubmit={loginUser}>
          <FormField>
            <Label>Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter Email..."
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </FormField>
          <FormField>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter Password..."
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              id="password"
            />
          </FormField>
          <LoginButton type="submit">Login</LoginButton>
        </Form>
        <RegisterLink>
          Don't have an account?{" "}
          <LinkToRegister href="/register">Register here</LinkToRegister>
        </RegisterLink>
      </Card>
    </Container>
  );
}

export default Login;
