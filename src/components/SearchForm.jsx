import React from "react";

const SearchForm = ({ search, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Escribe el nombre de un repositorio..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full md:w-3/4 p-3 text-lg border border-gray-300 rounded-lg shadow-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchForm;
