import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCode,
  faClock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const RepoCard = ({ repo }) => {
  const lastUpdated = new Date(repo.updated_at).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <li className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
      <div className="flex items-center mb-2">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-[#FFB6C1] text-xl font-semibold hover:underline"
        >
          {repo.name}
        </a>
        <div className="flex items-center ml-auto text-gray-700 dark:text-gray-300">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
          <span>{repo.stargazers_count}</span>
        </div>
      </div>

      <p className="mt-2 text-gray-700 dark:text-gray-300">
        {repo.description || "Sin descripción"}
      </p>

      <div className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
        <div className="flex items-center mb-1">
          <FontAwesomeIcon
            icon={faUser}
            className="text-gray-400 dark:text-gray-500 mr-2"
          />
          <span>{repo.owner.login}</span>
        </div>
        <div className="flex items-center mb-1">
          <FontAwesomeIcon
            icon={faCode}
            className="text-gray-400 dark:text-gray-500 mr-2"
          />
          <span>Lenguaje: {repo.language || "No especificado"}</span>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faClock}
            className="text-gray-400 dark:text-gray-500 mr-2"
          />
          <span>Última actualización: {lastUpdated}</span>
        </div>
      </div>
    </li>
  );
};

export default RepoCard;
