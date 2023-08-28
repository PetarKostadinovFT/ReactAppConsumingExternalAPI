import React from "react";
import { Link } from "react-router-dom";

function Article({ article }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            className="card-img-top img-fluid"
            alt={article.title}
            style={{ maxHeight: "200px", objectFit: "cover" }}
          />
        )}

        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.description}</p>
          <Link to="/details" state={{ article }}>
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Article;
