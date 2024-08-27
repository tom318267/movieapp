import React, { useEffect, useState } from "react";
import { fetchMovies, fetchPopularMovies } from "../services/api";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchPopularMovies();
      setMovies(data);
      setLoading(false);
    };
    getMovies();
  }, []);

  // Define the handleSearch function here
  const handleSearch = async (query) => {
    const data = await fetchMovies(query);
    setMovies(data);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <SearchBar onSearch={handleSearch} /> {/* Use handleSearch function */}
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
