import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ page, totalPages, handlePageChange }) => {
  const maxPages = 3;
  const startPage = Math.max(1, page - 1);
  const endPage = Math.min(totalPages, startPage + maxPages - 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className="py-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {pageNumbers.map((p) => (
        <button
          key={p}
          onClick={() => handlePageChange(p)}
          className={`py-2 px-4 rounded-lg ${
            p === page
              ? "bg-[#4B0082] text-white"
              : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className="py-2 px-4 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;
