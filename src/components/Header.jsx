import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={{ 
      backgroundColor: 'white', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000,
      padding: '1rem 0'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img
            src="/lovable-uploads/c46e1522-af82-4a23-9984-0f13ea99096e.png"
            alt="93Cars logo"
            style={{ 
              height: '60px', 
              width: '60px', 
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '2rem',
          '@media (max-width: 768px)': {
            display: isMenuOpen ? 'flex' : 'none'
          }
        }}>
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              color: isActive('/') ? '#3b82f6' : '#1e293b',
              fontWeight: isActive('/') ? '600' : '500',
              fontSize: '16px'
            }}
          >
            Home
          </Link>
          <Link 
            to="/cars" 
            style={{ 
              textDecoration: 'none', 
              color: isActive('/cars') ? '#3b82f6' : '#1e293b',
              fontWeight: isActive('/cars') ? '600' : '500',
              fontSize: '16px'
            }}
          >
            Cars
          </Link>
          <Link 
            to="/about" 
            style={{ 
              textDecoration: 'none', 
              color: isActive('/about') ? '#3b82f6' : '#1e293b',
              fontWeight: isActive('/about') ? '600' : '500',
              fontSize: '16px'
            }}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            style={{ 
              textDecoration: 'none', 
              color: isActive('/contact') ? '#3b82f6' : '#1e293b',
              fontWeight: isActive('/contact') ? '600' : '500',
              fontSize: '16px'
            }}
          >
            Contact
          </Link>
          <Link 
            to="/blog" 
            style={{ 
              textDecoration: 'none', 
              color: isActive('/blog') ? '#3b82f6' : '#1e293b',
              fontWeight: isActive('/blog') ? '600' : '500',
              fontSize: '16px'
            }}
          >
            Blog
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          style={{
            display: 'none',
            '@media (max-width: 768px)': {
              display: 'block'
            },
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          ☰
        </button>

        {/* Browse Cars Button */}
        <Link 
          to="/cars"
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          Browse Cars
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div style={{
          display: 'block',
          backgroundColor: 'white',
          padding: '1rem',
          borderTop: '1px solid #e5e7eb',
          '@media (min-width: 769px)': {
            display: 'none'
          }
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              style={{ 
                textDecoration: 'none', 
                color: isActive('/') ? '#3b82f6' : '#1e293b',
                fontWeight: isActive('/') ? '600' : '500',
                fontSize: '16px',
                padding: '0.5rem 0'
              }}
            >
              Home
            </Link>
            <Link 
              to="/cars" 
              onClick={() => setIsMenuOpen(false)}
              style={{ 
                textDecoration: 'none', 
                color: isActive('/cars') ? '#3b82f6' : '#1e293b',
                fontWeight: isActive('/cars') ? '600' : '500',
                fontSize: '16px',
                padding: '0.5rem 0'
              }}
            >
              Cars
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsMenuOpen(false)}
              style={{ 
                textDecoration: 'none', 
                color: isActive('/about') ? '#3b82f6' : '#1e293b',
                fontWeight: isActive('/about') ? '600' : '500',
                fontSize: '16px',
                padding: '0.5rem 0'
              }}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsMenuOpen(false)}
              style={{ 
                textDecoration: 'none', 
                color: isActive('/contact') ? '#3b82f6' : '#1e293b',
                fontWeight: isActive('/contact') ? '600' : '500',
                fontSize: '16px',
                padding: '0.5rem 0'
              }}
            >
              Contact
            </Link>
            <Link 
              to="/blog" 
              onClick={() => setIsMenuOpen(false)}
              style={{ 
                textDecoration: 'none', 
                color: isActive('/blog') ? '#3b82f6' : '#1e293b',
                fontWeight: isActive('/blog') ? '600' : '500',
                fontSize: '16px',
                padding: '0.5rem 0'
              }}
            >
              Blog
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          nav {
            display: none !important;
          }
          button {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          button {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;