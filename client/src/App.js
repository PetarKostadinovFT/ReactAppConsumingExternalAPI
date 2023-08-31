import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NewsArticleDetails from "./components/NewsArticleDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/NotFound";
import { useAuth } from "./context/userContext";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      <Header />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/home" element={<Home />} />
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <Route path="/details" element={<NewsArticleDetails />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
