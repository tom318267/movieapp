import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Function to fetch movies based on a search query
export const fetchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });
  return response.data.results;
};

// Function to fetch popular movies
export const fetchPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results;
};

// Function to fetch movie details by movie ID
export const fetchMovieDetails = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data;
};

// Function to fetch the movie trailer by movie ID
export const fetchMovieTrailer = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
    params: {
      api_key: API_KEY,
    },
  });

  // Filter the results to find the YouTube trailer
  const trailer = response.data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  return trailer;
};
