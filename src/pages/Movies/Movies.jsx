import React, { useState, useEffect } from "react";
import "./Movies.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Movies = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  async function getMovies() {
    setLoading(true);
    const { data } = await axios.get(
      `https://omdbapi.com/?s=${searchTerm}&apikey=d9398c17`
    );
    setMovies(data.Search || []);
    setLoading(false);
  }

  useEffect(() => {
    if (searchTerm) {
      getMovies();
    }
  }, [searchTerm]);

  return (
    <div className="movies">
      <div className="movies__container">
        <div className="movies__row">
          <button className="back-btn" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
          <div className="movie-list">
            {loading
              ? new Array(6).fill(0).map((element, index) => (
                  <div className="movie-card skeleton__movie-card">
                    <div className="skeleton__loading skeleton__poster"></div>
                    <div className="skeleton__loading skeleton__title"></div>
                    <div className="skeleton__loading skeleton__year"></div>
                  </div>
                ))
              : movies
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
                  .slice(0, 6)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
