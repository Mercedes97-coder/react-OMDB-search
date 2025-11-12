
import "./Home.css";
import watchMovies from '../../assets/undraw_movie-night_pkvp beige.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {

  const [searchTerm, setSearchTerm] = useState('');
  
  let navigate = useNavigate();

   function handleSearch(event) {
    event.preventDefault(); 
    if (searchTerm.trim()) {
      navigate(`/movies?search=${searchTerm}`);
    }
  }

  return (
    
    <div className='home'>
      <section id="movies">
        <div className="search__bar--wrapper">
          <h1 className="search__bar--title">Browse Movie Titles</h1>
          <div className="search__bar">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for a movie"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
                <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="search__btn"
                style={{color: '#c65764'}}
                onClick={handleSearch}
              />
              <div id="searchResults"></div>
            </form>
          </div>
        </div>
      <div className="place-holder__img--wrapper">
        <img
          src={watchMovies}
          className="place-holder__img"
          alt=""
        />
      </div>
      
    </section>
    </div>
  )
}

export default Home
