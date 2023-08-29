import React, { useState } from "react";
import { useAuth } from "../context/userContext";
import NewsArticles from "./NewsArticles";
import "../styles/home.css";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="home-container">
      <section>
        <div className="container">
          <div className="row">
            {!isAuthenticated && (
              <div className="text-center responsive-text">
                <h3>FREE Register to read all news with details</h3>
              </div>
            )}
            <div className="col-md-8">
              <div className="col-md-4">
                <div className="sidebar pt-4">
                  <h3>Search News</h3>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by title..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
              </div>
              <NewsArticles searchQuery={searchQuery} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
