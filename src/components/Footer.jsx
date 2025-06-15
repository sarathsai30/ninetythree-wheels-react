
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="fw-bold mb-3 text-white">
              <span className="text-warning">93</span>cars
            </h5>
            <p className="text-white-50">
              Your trusted partner in finding the perfect new car. We offer a wide range of 
              quality new cars with transparent pricing and detailed information.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-warning text-decoration-none" style={{ fontSize: '1.2rem' }}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-warning text-decoration-none" style={{ fontSize: '1.2rem' }}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-warning text-decoration-none" style={{ fontSize: '1.2rem' }}>
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3 text-white">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
              <li><Link to="/cars" className="text-white-50 text-decoration-none">Cars</Link></li>
              <li><Link to="/about" className="text-white-50 text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-white-50 text-decoration-none">Contact</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3 text-white">Car Brands</h6>
            <ul className="list-unstyled">
              <li><span className="text-white-50">Hyundai</span></li>
              <li><span className="text-white-50">Tata</span></li>
              <li><span className="text-white-50">Maruti</span></li>
              <li><span className="text-white-50">Kia</span></li>
              <li><span className="text-white-50">Mahindra</span></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3 text-white">Contact Info</h6>
            <div className="text-white-50">
              <p><i className="fas fa-map-marker-alt me-2"></i>Mumbai, India</p>
              <p><i className="fas fa-phone me-2"></i>+91 93000 93000</p>
              <p><i className="fas fa-envelope me-2"></i>info@93cars.com</p>
            </div>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="row">
          <div className="col-md-6">
            <p className="text-white-50 mb-0">&copy; 2024 93cars. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="text-white-50 mb-0">Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
