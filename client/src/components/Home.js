import React, { useState, useEffect } from "react";
import styled from "styled-components"; // Import Styled Components
import Article from "./Article";
import _ from "lodash";
import Pagination from "./Pagination";
import { useAuth } from "../context/userContext";
import useArticleFetch from "../utils/useArticleFetch";

const Container = styled.div`
  margin: 1rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const NonRegisteredUserMessage = styled.h3`
  text-align: center;
`;
const Sidebar = styled.div`
  padding-top: 4rem;
  text-align: left;
  margin-left: 1.5rem;
  h3 {
    font-size: 1.5rem;
  }
  input {
    width: 150px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    text-align: left;
  }
`;

const LatestNews = styled.h1`
  text-align: center;
  margin-bottom: 0.5;
`;

const Spinner = styled.div`
  text-align: center;
  .spinner-border {
    color: #007bff;
  }
`;

const Alert = styled.div`
  text-align: center;
  background-color: #dc3545;
  color: #fff;
  padding: 0.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 70rem;
`;

const ArticleContainer = styled.div`
  margin: 1rem;
  width: 100%;
  max-width: 17.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: transform 0.2s;
  min-height: 350px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-0.125rem);
  }
`;

const Home = () => {
  const articlesPerPage = 6;
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
    <>
      {!isAuthenticated && (
        <NonRegisteredUserMessage>
          FREE Register to read all news with details
        </NonRegisteredUserMessage>
      )}
      {isAuthenticated && (
        <Sidebar>
          <h3>Search News</h3>
          <div>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </Sidebar>
      )}
      <Container>
        <LatestNews>Latest News</LatestNews>
        {isLoading ? (
          <Spinner>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </Spinner>
        ) : error || allArticles.length === 0 ? (
          <Alert>{error}</Alert>
        ) : (
          <Row>
            {articlesToDisplay.map((article) => (
              <ArticleContainer key={article.title}>
                <Article article={article} />
              </ArticleContainer>
            ))}
          </Row>
        )}
        <div className="d-flex justify-content-center mt-4">
          {allArticles.length > 3 && (
            <Pagination
              totalPages={Math.ceil(allArticles.length / articlesPerPage)}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </Container>
    </>
  );
};

export default Home;
