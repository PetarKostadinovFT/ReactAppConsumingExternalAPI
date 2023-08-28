import React, { useState } from "react";
import NewsArticles from "./NewsArticles";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="home-container">
      <section>
        <div className="container">
          <div className="row">
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
