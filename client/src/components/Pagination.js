import React from "react";
import "../styles/pagination.css";

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
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      </li>
      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={`page-item ${pageNumber === currentPage ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        </li>
      ))}
      <li
        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
