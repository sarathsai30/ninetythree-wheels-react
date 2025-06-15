
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const logoUrl = '/lovable-uploads/c46e1522-af82-4a23-9984-0f13ea99096e.png';

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img 
            src={logoUrl} 
            alt="93cars logo" 
            style={{ height: '80px', width: '80px', borderRadius: '50%', objectFit: 'cover' }} 
          />
        </Link>
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          style={{ boxShadow: 'none' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/cars' ? 'active' : ''}`} 
                to="/cars"
              >
                Cars
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} 
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`} 
                to="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link to="/cars" className="btn btn-primary me-2">
              Browse Cars
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
