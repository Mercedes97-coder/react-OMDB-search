import './MovieInfo.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const MovieInfo = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  async function getMovieDetails() {
    setLoading(true);
    const { data } = await axios.get(`https://omdbapi.com/?i=${id}&apikey=d9398c17`);
    setMovie(data);
    setLoading(false);
  }

  useEffect(() => {
    getMovieDetails();
  }, [id]);

   if (loading) {
    return (
      <div className="movie-info">
        <div className="movie-info__container">
          <div className="movie-info__poster">
            <div className="skeleton__loading skeleton__movie-poster"></div>
          </div>
          <div className="movie-info__details">
            <div className="skeleton__loading skeleton__movie-title"></div>
            <div className="skeleton__loading skeleton__movie-text"></div>
            <div className="skeleton__loading skeleton__movie-text"></div>
            <div className="skeleton__loading skeleton__movie-text"></div>
            <div className="skeleton__loading skeleton__movie-text"></div>
            <div className="skeleton__loading skeleton__movie-plot"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    
    <div className="movie-info">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <div className="movie-info__container">
        <div className="movie-info__poster">
          <img src={movie.Poster} alt={movie.Title} />
        </div>
        <div className="movie-info__details">
          <h1 className="movie-info__title">{movie.Title}</h1>
          <p className="movie-info__text"><b>Year:</b> {movie.Year}</p>
          <p className="movie-info__text"><b>Rating:</b> {movie.imdbRating}</p>
          <p className="movie-info__text"><b>Director:</b> {movie.Director}</p>
          <p className="movie-info__text"><b>Actors:</b> {movie.Actors}</p>
          <p className="movie-info__plot"><b>Plot:</b> {movie.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
