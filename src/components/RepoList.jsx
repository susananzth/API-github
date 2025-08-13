import React from "react";
import RepoCard from "./RepoCard";

const RepoList = ({ repos, isLoading }) => {
  if (isLoading) {
    return (
      <p className="text-center text-gray-500 mt-8">Cargando repositorios...</p>
    );
  }

  if (repos.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No se encontraron repositorios. ¡Intenta buscar algo!
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </ul>
  );
};

export default RepoList;
