import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Article from "./Article";
import Cookies from "js-cookie";
import Pagination from "./Pagination";

function NewsArticles({ searchQuery }) {
  const articlesPerPage = 6; //articles per page
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, [searchQuery, currentPage]);

  const fetchArticles = async () => {
    setIsLoading(true);

    try {
      const token = Cookies.get("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get("/api/", {
        params: { q: searchQuery },
        headers,
      });
      const fetchedArticles = response.data;

      if (fetchedArticles) {
        setArticles(fetchedArticles);
        setError(null);
      } else {
        setArticles([]);
        setError("No articles found.");
      }
    } catch (error) {
      setArticles([]);
      setError("Error loading news. Please try again later.");
    }

    setIsLoading(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const articlesToDisplay = articles.slice(startIndex, endIndex);

  return (
    <div className="container my-5">
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
            <Pagination
              totalPages={Math.ceil(articles.length / articlesPerPage)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsArticles;
