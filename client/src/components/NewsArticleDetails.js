import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components"; 
import LoadingSpinner from "./LoadingSpinner";

const Container = styled.div`
  margin: 2rem;
  text-align: center;
`;

const ArticleContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ArticleTitle = styled.h1`
  margin: 0;
  margin-bottom: 2rem;
`;

const ArticleDetail = styled.p`
  margin: 0;
  margin-bottom: 0.2rem;
`;

const ArticleImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 2rem;
  border-radius: 8px;
`;

const ArticleDescription = styled.p`
  margin-bottom: 2rem;
`;

const ReadMoreButton = styled.a`
  margin-top: 2rem;
  display: inline-block;
  padding: 10px 20px;
  background-color: #0a5e66;
  color: wheat;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0a5e66;
    color: aliceblue;
  }
`;

function NewsArticleDetails() {
  const location = useLocation();
  if (!location.state) return null;

  const { article } = location.state;

  return (
    <Container>
      {article ? (
        <ArticleContainer>
          <ArticleTitle>{article.title}</ArticleTitle>

          {article.urlToImage && (
            <ArticleImage
              src={article.urlToImage}
              alt={article.title}
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          <ArticleDescription>{article.description}</ArticleDescription>
          <p>{article.content}</p>
          <ArticleDetail>
            <strong>Published by:</strong> {article.author}
          </ArticleDetail>
          <ArticleDetail>
            <strong>Published at:</strong> {article.publishedAt}
          </ArticleDetail>
          <ArticleDetail>
            <strong>Source:</strong> {article.source.name}
          </ArticleDetail>
          <ReadMoreButton
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read All About This
          </ReadMoreButton>
        </ArticleContainer>
      ) : (
        <LoadingSpinner />
      )}
    </Container>
  );
}

export default NewsArticleDetails;
