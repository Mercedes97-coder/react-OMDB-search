import React from "react";
import "./Footer.css";
import Logo from '../../assets/movie-logo.jpg';
import { useNavigate } from "react-router-dom";

const Footer = () => {
    let navigate = useNavigate();
  return (
    <div className="footer">
      <div className="nav__container footer__container">
        <div className="nav__bar">
          <div className="nav__bar--logo footer__logo">
            <img src={Logo} class="nav__bar--logo-img" alt="" />
          </div>
          <ul className="nav__bar--links footer__links">
            <li className="nav__bar--link" onClick={() => navigate('/')}>Home</li>
            <li className="nav__bar--link"onClick={() => navigate('discover')}>Discover</li>
            <button className="nav__bar--link contact__btn">Contact</button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
