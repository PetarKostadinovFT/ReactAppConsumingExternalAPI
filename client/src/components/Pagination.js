import React from "react";
import styled from "styled-components";

const PaginationContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const PageItem = styled.li`
  &.active {
    .page-link {
      background-color: #007bff;
      color: #fff;
    }
  }
`;

const PageLink = styled.button`
  background-color: transparent;
  border: none;
  color: #0a5e66;
  padding: 6px 12px;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 0.125rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #0a5e66;
    color: #fff;
  }
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);

    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PaginationContainer>
      <PageItem className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <PageLink onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </PageLink>
      </PageItem>
      {pageNumbers.map((pageNumber) => (
        <PageItem
          key={pageNumber}
          className={`page-item ${pageNumber === currentPage ? "active" : ""}`}
        >
          <PageLink onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </PageLink>
        </PageItem>
      ))}
      <PageItem
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <PageLink onClick={() => handlePageChange(currentPage + 1)}>
          Next
        </PageLink>
      </PageItem>
    </PaginationContainer>
  );
};

export default Pagination;


