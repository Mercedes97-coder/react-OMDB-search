import React, { useState, useEffect } from "react";
import "./Movies.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import watchMovies from "../../assets/undraw_movie-night_pkvp beige.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Movies = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const navigate = useNavigate();

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      const { data } = await axios.get(
        `https://omdbapi.com/?s=${searchTerm}&apikey=d9398c17`
      );
      setMovies(data.Search || []);
      setLoading(false);
    }

    if (searchTerm) {
      getMovies();
    }
  }, [searchTerm]);

  function getSortedMovies() {
    const moviesCopy = [...movies];
    
    switch(sortBy) {
      case "year-newest":
        return moviesCopy.sort((a, b) => b.Year - a.Year);
      case "year-oldest":
        return moviesCopy.sort((a, b) => a.Year - b.Year);
      case "title-az":
        return moviesCopy.sort((a, b) => a.Title.localeCompare(b.Title));
      default:
        return moviesCopy;
    }
  }

  const sortedMovies = getSortedMovies();

  return (
    <div className="movies">
      <div className="movies__wrapper">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </button>
        
        {!loading && movies.length > 0 && (
          <div className="filter__container">
            <label htmlFor="sort-select">Sort by:</label>
            <select 
              id="sort-select"
              className="filter__select" 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="year-newest">Year (Newest First)</option>
              <option value="year-oldest">Year (Oldest First)</option>
              <option value="title-az">Title (A-Z)</option>
            </select>
          </div>
        )}

        <div className="movies__container">
          <div className="movies__row">
            <div className="movie-list">
              {loading ? (
                new Array(6).fill(0).map((element, index) => (
                  <div className="movie-card skeleton__movie-card" key={index}>
                    <div className="skeleton__loading skeleton__poster"></div>
                    <div className="skeleton__loading skeleton__title"></div>
                    <div className="skeleton__loading skeleton__year"></div>
                  </div>
                ))
              ) : movies.length === 0 ? (
                <div className="no-results">
                  <h2>No movies found</h2>
                  <p>Try searching for a different movie title</p>
                  <button
                    className="back-to-search-btn"
                    onClick={() => navigate("/")}
                  >
                    Back to Search
                  </button>
                  <img src={watchMovies} className="no-results__img" alt="" />
                </div>
              ) : (
                sortedMovies
                  .map((movie) => (
                    <div
                      className="movie-card"
                      key={movie.imdbID}
                      onClick={() => navigate(`/movie/${movie.imdbID}`)}
                    >
                      <div className="movie-card__container">
                        <h3>{movie.Title}</h3>
                        <p>
                          <b>Year:</b> {movie.Year}
                        </p>
                      </div>
                      <div className="movie-card__img--wrapper">
                        <div className="movie-card__img">
                          <img
                            src={movie.Poster}
                            className="poster__img"
                            alt="Movie Poster"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                  .slice(0, 6)
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;