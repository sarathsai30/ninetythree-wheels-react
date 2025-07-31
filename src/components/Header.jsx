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
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-700';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 h-[105px]">
      <div className="max-w-[1300px] mx-auto px-6 h-full flex items-center justify-between">
        
        {/* Left: Logo + Menu */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link to="/">
            <img
              src="/lovable-uploads/c46e1522-af82-4a23-9984-0f13ea99096e.png"
              alt="93Cars logo"
              className="h-20 w-20 object-cover"
            />
          </Link>

          {/* Menu Items */}
          <nav className="flex items-center space-x-5 text-[17px] font-medium">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/cars" className={isActive('/cars')}>Cars</Link>
            <Link to="/evs" className={isActive('/evs')}>EVs</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            <Link to="/blog" className={isActive('/blog')}>Blog</Link>

          </nav>
        </div>

        {/* Right: Button */}
        <Link
          to="/cars"
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-[10px] rounded"
        >
          Browse Cars
        </Link>
      </div>
    </header>
  );
};

export default Header;

