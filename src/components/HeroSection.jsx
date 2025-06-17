
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="position-relative overflow-hidden" style={{ minHeight: '60vh', backgroundColor: '#3b82f6' }}>
      <div className="container position-relative text-white d-flex align-items-center" style={{ minHeight: '60vh', zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-8">
            <h1 className="display-4 fw-bold mb-4">
              Find Your Perfect Car with <span className="text-warning">93cars</span>
            </h1>
            <p className="lead mb-4">
              Discover a wide range of quality new cars with transparent pricing, 
              detailed specifications, and trusted service. Your dream car is just a click away.
            </p>
            <div className="d-flex gap-3">
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
    </section>
  );
};

export default HeroSection;
