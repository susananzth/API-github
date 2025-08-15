import { useState, useEffect } from "react";
import SearchForm from "./components/SearchForm";
import RepoList from "./components/RepoList";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [repos, setRepos] = useState([]); // Estado para guardar la lista de repositorios
  const [search, setSearch] = useState(""); // Estado para guardar el término de búsqueda
  const [page, setPage] = useState(1); // Almacena la página actual
  const [perPage, setPerPage] = useState(10); // Almacena la cantidad de repos por página
  const [totalCount, setTotalCount] = useState(0); // Almacena el número total de resultados
  const [isLoading, setIsLoading] = useState(false); // Indica si la petición está en curso

  // Nuevo estado para el modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Leer el tema preferido del sistema o de localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Efecto para aplicar la clase 'dark' al <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Función para alternar el modo oscuro
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Función para obtener los repositorios de la API de GitHub
  const fetchRepos = async () => {
    // Restablece valores si no hay repositorios
    if (!search) {
      setRepos([]);
      setTotalCount(0);
      return;
    }

    setIsLoading(true);

    try {
      // Uso de la API de búsqueda de repositorios de GitHub que incluye parámetros de paginación
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${search}&per_page=${perPage}&page=${page}`
      );
      const data = await response.json();

      // Guardo la lista de repositorios en el estado
      setRepos(data.items);
      // Guarda el número total de repositorios
      setTotalCount(data.total_count);
    } catch (error) {
      console.error("Error al obtener los repositorios:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Uso useEffect para llamar a la API cada vez que cambie el término de búsqueda o la paginación
  useEffect(() => {
    // Retraso la llamada para evitar saturar la API mientras el usuario escribe
    const timeoutId = setTimeout(() => {
      fetchRepos();
    }, 500); // 500ms de espera

    // Limpio el timeout si el componente se desmonta o el search cambia de nuevo
    return () => clearTimeout(timeoutId);
  }, [search, page, perPage]); // El efecto se ejecuta cuando 'search, page, perPage' cambia

  // Lógica para manejar el cambio de página
  const handlePageChange = (newPage) => {
    if (
      newPage > 0 &&
      newPage <= Math.ceil(totalCount / perPage) &&
      !isLoading
    ) {
      setPage(newPage);
    }
  };

  const handleSearchChange = (newSearch) => {
    setSearch(newSearch);  // Actualiza el estado del buscador
    setPage(1); // Reinicia la página a 1 cuando se cambia el buscador
  };

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mx-auto p-4 md:p-8 flex-grow">
        <h1 className="text-4xl font-bold text-center my-8 text-gray-800 dark:text-gray-200">
          Buscador de Repositorios de GitHub
        </h1>

        <div className="flex justify-center mb-6">
          <SearchForm search={search} onSearchChange={handleSearchChange} />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {repos.length > 0 && (
            <>
              <p className="text-gray-600 dark:text-gray-400 mb-2 md:mb-0">
                Mostrando {repos.length} de {totalCount} resultados
              </p>
              <label className="text-gray-600 dark:text-gray-400">
                Resultados por página:
                <select
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setPage(1); // Reinicia la página a 1 cuando se cambia la cantidad de resultados
                  }}
                  className="ml-2 py-1 px-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-white"
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                </select>
              </label>
            </>
          )}
        </div>

        <RepoList repos={repos} isLoading={isLoading} />

        <Pagination
          page={page}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
