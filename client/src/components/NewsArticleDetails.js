import { useLocation } from "react-router-dom";
import "../styles/details.css";
import LoadingSpinner from "./LoadingSpinner";

function NewsArticleDetails() {
  const location = useLocation();
  if (!location.state) return;

  const { article } = location.state;

  return (
    <div className="container my-5">
      {article ? (
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h1 className="mb-4">{article.title}</h1>
            <p className="mb-2">
              <strong>Published by:</strong> {article.author}
            </p>
            <p className="mb-2">
              <strong>Published at:</strong> {article.publishedAt}
            </p>
            <p className="mb-4">
              <strong>Source:</strong> {article.source.name}
            </p>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                className="img-fluid rounded mb-4"
                alt={article.title}
              />
            )}
            <p className="lead mb-4">{article.description}</p>
            <p className="mb-4">{article.content}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn read-more-btn"
            >
              Read All About This
            </a>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default NewsArticleDetails;
