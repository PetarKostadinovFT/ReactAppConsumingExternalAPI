import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";
import Article from "./Article";
import Cookies from "js-cookie";
import Pagination from "./Pagination";
import { useAuth } from "../context/userContext";

function NewsArticles() {
  const [allArticles, setAllArticles] = useState([]);
  const { isAuthenticated } = useAuth();
  const articlesPerPage = 6; // articles per page
  const [currentPage, setCurrentPage] = useState(1);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let debounceTimer;

    if (searchQuery) {
      debounceTimer = setTimeout(() => {
        fetchArticles();
      }, 800);
    } else {
      fetchArticles();
    }

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery, isAuthenticated]);

  const fetchArticles = async () => {
    setIsLoading(true);

    try {
      const token = Cookies.get("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get("/api/articles/home", {
        params: { q: searchQuery },
        headers,
      });
      const fetchedArticles = response.data;

      if (fetchedArticles) {
        setAllArticles(fetchedArticles);
        setError(null);
      } else {
        setAllArticles([]);
        setError("No articles found.");
      }
    } catch (error) {
      setAllArticles([]);
      setError("Error loading news. Please try again later.");
    }

    setIsLoading(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const articlesToDisplay = allArticles.slice(startIndex, endIndex);

  return (
    <div className="container my-5 catalog">
      {!isAuthenticated && (
        <div className="text-center responsive-text">
          <h3>FREE Register to read all news with details</h3>
        </div>
      )}
      {isAuthenticated && (
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
      )}
      <h1 className="text-center mb-4">Latest News</h1>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div>
          <div className="row">
            {articlesToDisplay.map((article) => (
              <Article key={article.title} article={article} />
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            {allArticles.length > 3 && (
              <Pagination
                totalPages={Math.ceil(allArticles.length / articlesPerPage)}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsArticles;
