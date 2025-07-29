import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <header>
      <div className="nav-container">
        <div className="logo">
          <h2>Tuinue Wasichana</h2>
        </div>
        <div className="nav-links">
          <Link to="/login" className="login">Login</Link>
          <Link to="/donor-signup" className="donate">Donate Now</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;