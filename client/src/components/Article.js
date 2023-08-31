import React from "react";
import { Link } from "react-router-dom";
import "../styles/articles.css";
import { useAuth } from "../context/userContext";

function Article({ article }) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card shadow-sm h-100">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            className="card-img-top article-image"
            alt={article.title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "../../public/logo192.png";
            }}
          />
        )}
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.description}</p>
        </div>
        <div className="card-footer">
          {isAuthenticated && (
            <Link to="/details" state={{ article }} className="btn details-btn">
              Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Article;
