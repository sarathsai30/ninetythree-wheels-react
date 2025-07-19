/*
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

export default Header;*/
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path) =>
    location.pathname === path ? 'text-primary fw-bold' : 'text-dark';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container-fluid px-3 px-md-4">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src="/lovable-uploads/c46e1522-af82-4a23-9984-0f13ea99096e.png"
            alt="93Cars logo"
            className="d-inline-block"
            style={{ 
              height: '60px', 
              width: '60px', 
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
        </Link>

        {/* Mobile menu toggle button */}
        <button 
          className="navbar-toggler border-0 p-1" 
          type="button" 
          onClick={toggleMenu}
          aria-controls="navbarNav" 
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          style={{ boxShadow: 'none', fontSize: '1.2rem' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation menu */}
        <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${isActive('/')}`} 
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${isActive('/cars')}`} 
                to="/cars"
                onClick={() => setIsMenuOpen(false)}
              >
                Cars
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${isActive('/about')}`} 
                to="/about"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${isActive('/contact')}`} 
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 ${isActive('/blog')}`} 
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
          </ul>
          
          {/* Browse Cars button */}
          <div className="d-flex">
            <Link 
              to="/cars" 
              className="btn btn-primary px-3 py-2 me-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Cars
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

