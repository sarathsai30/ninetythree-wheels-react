import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaLinkedin, FaFacebookF, FaXTwitter} from 'react-icons/fa6';

const Footer = () => {
  const logoUrl = '/lovable-uploads/c46e1522-af82-4a23-9984-0f13ea99096e.png';
  const [hovered, setHovered] = useState('');

  return (
    <footer style={{ backgroundColor: '#191F23' }} className="text-white mt-5">
      <div className="container py-5">
        <div className="row">
          {/* Branding */}
          <div className="col-lg-4 col-md-6 mb-4">
            <img 
              src={logoUrl} 
              alt="93cars logo" 
              className="mb-3"
              style={{ height: '50px', width: '50px', borderRadius: '50%', objectFit: 'cover' }} 
            />
            <p className="text-white-50">
              Your trusted partner in finding the perfect new car. We offer a wide range of 
              quality new cars with transparent pricing and detailed information.
            </p>

            
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3 text-white">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
              <li><Link to="/cars" className="text-white-50 text-decoration-none">Cars</Link></li>
              <li><Link to="/about" className="text-white-50 text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-white-50 text-decoration-none">Contact</Link></li>
              <li><Link to="/blog" className="text-white-50 text-decoration-none">Blog</Link></li>
              <li><Link to="/EVs" className="text-white-50 text-decoration-none">EVs</Link></li>
            </ul>
          </div>

          {/* Car Brands */}
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

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold mb-3 text-white">Contact Us</h6>
            <div className="text-white-50 small">
              <p>
                CARS93 INFOTECH PRIVATE LIMITED<br />
                Bengaluru, Karnataka, India
              </p>
              <p><i className="fas fa-phone mb-2"></i> +91 7026433985</p>
              <p><i className="fas fa-envelope mb-2"></i> contact@93cars.com</p>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="d-flex justify-content-center flex-wrap gap-3 mt-3 mb-5">
            <a
              href="https://youtube.com/@93carsofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex text-white text-decoration-none"
              style={{
                backgroundColor: hovered === 'youtube' ? '#FF0000' : '#1E252A',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
              onMouseEnter={() => setHovered('youtube')}
              onMouseLeave={() => setHovered('')}
            >
              <div className="d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: hovered === 'youtube' ? '#ff6b6bff' : '#293034' }}>
                <FaYoutube size={30} color={'#fff'} />
              </div>
              <div className="d-flex align-items-center px-3 py-3" style={{ fontWeight: '500' }}>
                Subscribe On Youtube
              </div>
            </a>

            <a
              href="https://www.facebook.com/93carsofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex text-white text-decoration-none"
              style={{
                backgroundColor: hovered === 'facebook' ? '#1877F2' : '#1E252A',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
              onMouseEnter={() => setHovered('facebook')}
              onMouseLeave={() => setHovered('')}
            >
              <div className="d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: hovered === 'facebook' ? '#64a4f8ff' : '#293034' }}>
                <FaFacebookF size={20} color={'#fff'} />
              </div>
              <div className="d-flex align-items-center px-3 py-3" style={{ fontWeight: '500' }}>
                Follow On Facebook
              </div>
            </a>

            <a
              href="https://www.instagram.com/93carsofficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex text-white text-decoration-none"
              style={{
                backgroundColor: hovered === 'instagram' ? '#E1306C' : '#1E252A',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
              onMouseEnter={() => setHovered('instagram')}
              onMouseLeave={() => setHovered('')}
            >
              <div className="d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: hovered === 'instagram' ? '#ff88b0ff' : '#293034' }}>
                <FaInstagram size={20} color={'#fff'} />
              </div>
              <div className="d-flex align-items-center px-3 py-3" style={{ fontWeight: '500' }}>
                Follow On Instagram
              </div>
            </a>

            <a
              href="https://twitter.com/93carsofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex text-white text-decoration-none"
              style={{
                backgroundColor: hovered === 'twitter' ? '#1DA1F2' : '#1E252A',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
              onMouseEnter={() => setHovered('twitter')}
              onMouseLeave={() => setHovered('')}
            >
              <div className="d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: hovered === 'twitter' ? '#5ebaf3ff' : '#293034' }}>
                <FaXTwitter size={20} color={'#fff'} />
              </div>
              <div className="d-flex align-items-center px-3 py-3" style={{ fontWeight: '500' }}>
                Follow On Twitter (X)
              </div>
            </a>

            <a
              href="https://www.linkedin.com/company/93cars/"
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex text-white text-decoration-none"
              style={{
                backgroundColor: hovered === 'linkedin' ? '#0077B5' : '#1E252A',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
              onMouseEnter={() => setHovered('linkedin')}
              onMouseLeave={() => setHovered('')}
            >
              <div className="d-flex align-items-center justify-content-center px-3" style={{ backgroundColor: hovered === 'linkedin' ? '#3c92c0ff' : '#293034' }}>
                <FaLinkedin size={20} color={'#fff'} />
              </div>
              <div className="d-flex align-items-center px-3 py-3" style={{ fontWeight: '500' }}>
                Follow On LinkedIn
              </div>
            </a>
          </div>
        </div>
        <hr className="border-secondary" />
        <div className="row mt-3">
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
