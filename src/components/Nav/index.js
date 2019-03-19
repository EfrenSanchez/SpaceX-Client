//Dependencies
import React from 'react';
//Dependencies
import { Link } from 'react-router-dom';

//Components
import logo from '../../assets/spacex_logo.png';

//Styles
import './nav.css';

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/">
        <img src={logo} alt="SpaceX" className="nav__logo" />
      </Link>
      <div className="nav__links">
        <Link className="nav__link" to="/rockets">Rockets</Link>
        <Link className="nav__link" to="/launches">Launches</Link>
      </div>
    </nav>
  )
}
