import { useLocation } from "react-router-dom";

function NewsArticleDetails() {
  const location = useLocation();
  const { article } = location.state;

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
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
            className="btn btn-primary"
          >
            Read All About This
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsArticleDetails;
