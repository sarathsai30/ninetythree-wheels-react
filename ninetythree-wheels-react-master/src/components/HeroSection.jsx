
import React from 'react';
import { Link } from 'react-router-dom';
import QuickSearch from './QuickSearch';
import BlogPopup from './BlogPopup';

const HeroSection = () => {
  return (
    <section 
      className="position-relative overflow-hidden" 
      style={{ 
        minHeight: '60vh', 
        backgroundColor: '#3b82f6',
        backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100" 
        style={{ 
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          zIndex: 1 
        }}
      ></div>
      
      <div className="container position-relative" style={{ minHeight: '60vh', zIndex: 2 }}>
        <div className="row h-100 align-items-center">
          {/* Filter Section - Left Side */}
          <div className="col-lg-4 col-md-5">
            <QuickSearch />
          </div>
          
          {/* Text Content - Right Side */}
          <div className="col-lg-8 col-md-7">
            <div className="text-white text-end">
              <h1 className="display-4 fw-bold mb-4">
                Find Your Perfect Car with <span className="text-warning">93cars</span>
              </h1>
              <p className="lead mb-4">
                Discover a wide range of quality new cars with transparent pricing, 
                detailed specifications, and trusted service. Your dream car is just a click away.
              </p>
              <div className="d-flex gap-3 justify-content-end">
                <Link to="/cars" className="btn btn-warning btn-lg px-4">
                  Browse Cars
                </Link>
                <Link to="/about" className="btn btn-outline-light btn-lg px-4">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog Popup */}
      <BlogPopup />
    </section>
  );
};

export default HeroSection;
