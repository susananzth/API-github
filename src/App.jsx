import { useState, useEffect } from "react";
import reactLogo from "./assets/logo.png";
import viteLogo from "/logo.png";
import "./App.css";

function App() {
  const [repos, setRepos] = useState([]); // Estado para guardar la lista de repositorios
  const [search, setSearch] = useState(""); // Estado para guardar el término de búsqueda
  const [page, setPage] = useState(1); // Almacena la página actual
  const [perPage, setPerPage] = useState(10); // Almacena la cantidad de repos por página
  const [totalCount, setTotalCount] = useState(0); // Almacena el número total de resultados
  const [isLoading, setIsLoading] = useState(false); // Indica si la petición está en curso

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
      const response = await fetch(`https://api.github.com/search/repositories?q=${search}&per_page=${perPage}&page=${page}`);
      const data = await response.json();

      // Guardo la lista de repositorios en el estado
      setRepos(data.items);
      // Guarda el número total de repositorios
      setTotalCount(data.total_count);
    } catch (error) {
      console.error('Error al obtener los repositorios:', error);
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
    if (newPage > 0 && newPage <= Math.ceil(totalCount / perPage) && !isLoading) {
      setPage(newPage);
    }
  };

  // Calcular las páginas a mostrar en los botones
  const maxPages = 3;
  const totalPages = Math.ceil(totalCount / perPage);
  const startPage = Math.max(1, page - 1);
  const endPage = Math.min(totalPages, startPage + maxPages - 1);
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="App">
      <h1>Buscador de Repositorios de GitHub</h1>
      <input
        type="text"
        placeholder="Escribe el nombre de un repositorio..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value); // Actualiza el estado del buscador
          setPage(1); // Reinicia la página a 1 cuando se cambia el buscador
        }}
      />

      <div className="info-bar">
        {repos.length > 0 && (
          <>
            <p>Mostrando {repos.length} de {totalCount} resultados</p>
            <label>
              Resultados por página:
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1); // Reinicia la página a 1 cuando se cambia la cantidad de resultados
                }}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
            </label>
          </>
        )}
      </div>

      <div className="repo-list">
        {isLoading ? (
          <p>Cargando repositorios...</p>
        ) : (
          repos.length > 0 ? (
            <ul>
              {repos.map((repo) => (
                <li key={repo.id}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                  <p>{repo.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron repositorios. ¡Intenta buscar algo!</p>
          )
        )}
      </div>
      {/* Interfaz de Paginación */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            &lt;
          </button>
          
          {pageNumbers.map(p => (
            <button
              key={p}
              onClick={() => handlePageChange(p)}
              className={p === page ? 'active' : ''}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
