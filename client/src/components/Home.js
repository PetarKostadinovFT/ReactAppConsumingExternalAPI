import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";
import Article from "./Article";
import _ from "lodash";
import Pagination from "./Pagination";
import { useAuth } from "../context/userContext";
import useArticleFetch from "../utils/useArticleFetch";

function Home() {
  const articlesPerPage = 6; // articles per page
  const [currentPage, setCurrentPage] = useState(1);

  const { isAuthenticated } = useAuth();

  const {
    allArticles,
    error,
    isLoading,
    searchQuery,
    handleSearchChange,
    fetchArticles,
  } = useArticleFetch();

  const debouncedFetchArticles = _.debounce(fetchArticles, 800);

  useEffect(() => {
    if (searchQuery) {
      debouncedFetchArticles();
    } else {
      fetchArticles();
    }
  }, [searchQuery, isAuthenticated]);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const articlesToDisplay = allArticles.slice(startIndex, endIndex);

  return (
    <div className="container my-5 catalog">
      {!isAuthenticated && (
        <div className="text-center responsive-text">
          <h3 className="nonRegisteredUserMessage">
            FREE Register to read all news with details
          </h3>
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
      <h1 className="latest text-center mb-4">Latest News</h1>
      {isLoading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error || allArticles === [] ? (
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

export default Home;
