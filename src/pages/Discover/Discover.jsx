import React, { useState } from 'react';
import './Discover.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Discover = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const searchTerms = [
    'action', 'comedy', 'drama', 'love', 'adventure', 'hero', 
    'war', 'space', 'mystery', 'family', 'thriller', 'magic',
    'detective', 'robot', 'treasure', 'time', 'alien', 'monster'
  ];

  async function getRandomMovie() {
    setLoading(true);
    

    const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)];
    
 
    const { data } = await axios.get(`https://omdbapi.com/?s=${randomTerm}&apikey=d9398c17`);
    
    if (data.Search && data.Search.length > 0) {
      const randomMovie = data.Search[Math.floor(Math.random() * data.Search.length)];
      const { data: movieDetails } = await axios.get(`https://omdbapi.com/?i=${randomMovie.imdbID}&apikey=d9398c17`); 
      setMovie(movieDetails);
    }
    
    setLoading(false);
  }

  return (
    <div className="discover">
      <div className="discover__header">
        <h1 className="discover__title">Discover Something New</h1>
        <p className="discover__subtitle">Not sure what to watch? Let us surprise you!</p>
        <button className="surprise-btn" onClick={getRandomMovie}>
          🎲 Surprise Me!
        </button>
      </div>

      {loading && (
        <div className="discover__loading">Finding the perfect movie for you...</div>
      )}

      {movie && !loading && (
        <div className="discover__result">
          <div className="discover__movie-card">
            <div className="discover__poster">
              <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className="discover__details">
              <h2 className="discover__movie-title">{movie.Title}</h2>
              <p className="discover__text"><b>Year:</b> {movie.Year}</p>
              <p className="discover__text"><b>Genre:</b> {movie.Genre}</p>
              <p className="discover__text"><b>Rating:</b> {movie.imdbRating}</p>
              <p className="discover__plot">{movie.Plot}</p>
              <button 
                className="details-btn" 
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;