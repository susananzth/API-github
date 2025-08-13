import React from "react";

const RepoCard = ({ repo }) => {
  return (
    <li className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow duration-300">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl font-semibold text-blue-600 hover:underline"
      >
        {repo.name}
      </a>
      <p className="mt-2 text-gray-700">{repo.description}</p>
    </li>
  );
};

export default RepoCard;
