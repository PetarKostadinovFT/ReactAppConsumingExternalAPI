import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Article from "./Article";

function NewsArticles({ searchQuery }) {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, [searchQuery]);

  const fetchArticles = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get("/api/", { params: { q: searchQuery } });
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
        <div className="row">
          {articles.map((article) => (
            <Article key={article.title} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsArticles;
