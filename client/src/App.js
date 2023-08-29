import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NewsArticles from "./components/NewsArticles";
import NewsArticleDetails from "./components/NewsArticleDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      <Header />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<NewsArticles />} />
        <Route path="/details" element={<NewsArticleDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
