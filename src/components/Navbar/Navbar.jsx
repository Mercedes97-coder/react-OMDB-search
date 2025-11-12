import React from 'react';
import './Navbar.css';
import Logo from '../../assets/movie-logo.jpg';
import Banner from '../../assets/video-banner.jpg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  let navigate = useNavigate();

  return (
    <div className='navbar'>
      <div className="img__wrapper--banner">
        <img src={Banner} className="image__banner" alt="" />
      </div>
      <div className="nav__container">
        <div className="nav__bar">
          <div className="nav__bar--logo">
            <img src={Logo} className="nav__bar--logo-img" alt="" />
          </div>
          <ul className="nav__bar--links">
            <li className="nav__bar--link" onClick={() => navigate('/')}>Home</li>
            <li className="nav__bar--link">Find Your Movie</li>
            <li className="nav__bar--link btn">Sign In</li>
          </ul>
        </div>
    </div>
    </div>
  )
}

export default Navbar
