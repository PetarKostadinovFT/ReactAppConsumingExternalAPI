import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth } from "../context/userContext";

const ArticleCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 18rem;
  min-height: 39rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: transform 0.2s;
  background-color: aliceblue;
  &:hover {
    transform: translateY(-0.125rem);
  }
`;

const ArticleImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardBody = styled.div`
  flex-grow: 1;
  padding: 1rem;
`;

const CardTitle = styled.h5`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #333;
`;

const DetailsButton = styled(Link)`
  display: block;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  text-decoration: none;

  transition: background-color 0.2s;
  background-color: #0a5e66;
  color: wheat;
  font-size: x-large;
  text-align: center;

  &:hover {
    background-color: #0a5e66;
    color: aliceblue;
  }
`;

function Article({ article }) {
  const { isAuthenticated } = useAuth();

  return (
    <ArticleCard data-testid="articles">
      {article.urlToImage && (
        <ArticleImage
          src={article.urlToImage}
          onError={(e) => (e.target.style.display = "none")}
          alt={article.title}
        />
      )}
      <CardBody>
        <CardTitle>{article.title}</CardTitle>
        <CardText>{article.description}</CardText>
      </CardBody>
      <div className="card-footer">
        {isAuthenticated && (
          <DetailsButton
            to="/details"
            state={{ article }}
            className="btn details-btn"
            data-testid="details-button"
          >
            Details
          </DetailsButton>
        )}
      </div>
    </ArticleCard>
  );
}

export default Article;
