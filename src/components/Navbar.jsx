import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import logo from "/logo.png";

const Navbar = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-[#1A1A2E] p-4 shadow-lg transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <a
          href="/"
          className="text-gray-800 dark:text-white text-2xl font-bold flex items-center"
        >
          <img
            src={logo}
            alt="Logo de la aplicación"
            className="w-8 h-8 mr-3"
          />
          Buscador de Repositorios
        </a>
        <button
          onClick={toggleDarkMode}
          className="text-gray-800 dark:text-yellow-400 focus:outline-none transition-colors duration-300"
          aria-label="Alternar modo oscuro/claro"
        >
          {isDarkMode ? (
            <FontAwesomeIcon icon={faSun} size="lg" />
          ) : (
            <FontAwesomeIcon icon={faMoon} size="lg" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
