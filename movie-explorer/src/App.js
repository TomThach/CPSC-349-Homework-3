import { useState, useEffect } from 'react';
import MovieCard from './components/MovieCard';
import Controls from './components/Controls';
import Pagination from './components/Pagination';
import './App.css';

const API_KEY = 'cf372bba7cd2368da8e55bd22957146e';
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getMovies(currentPage);
  }, [currentPage, search, sortBy]);

  async function getMovies(page) {
    const sortParam = sortBy || 'popularity.desc';
    const url = search
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}&page=${page}`
      : `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortParam}&page=${page}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.results) {
        setCurrentPage(data.page);
        if (page === 1) setTotalPages(data.total_pages);

        let results = data.results;
        if (search && sortBy) {
          const [field, direction] = sortBy.split('.');
          results = [...results].sort((a, b) => {
            const valA = a[field] || '';
            const valB = b[field] || '';
            return direction === 'asc' ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
          });
        }
        setMovies(results);
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  }

  function handleSearch(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleSort(value) {
    setSortBy(value);
    setCurrentPage(1);
  }

  return (
    <>
      <header>
        <h1>Movie Explorer</h1>
      </header>

      <Controls search={search} sortBy={sortBy} onSearch={handleSearch} onSort={handleSort} />

      <main id="movie-container">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </main>

      <footer>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => { setCurrentPage(p => p - 1); window.scrollTo(0, 0); }}
          onNext={() => { setCurrentPage(p => p + 1); window.scrollTo(0, 0); }}
        />
      </footer>
    </>
  );
}

export default App;