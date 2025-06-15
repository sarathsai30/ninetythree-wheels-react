
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';
import carsData from '../data/cars.json';
import { BadgeCheck, IndianRupee, Handshake, Clock } from 'lucide-react';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get featured cars (first 3)
    setFeaturedCars(carsData.slice(0, 3));
    
    // Get unique brands
    const uniqueBrands = [...new Set(carsData.map(car => car.brand))];
    setBrands(uniqueBrands);
  }, []);

  const handleBrandClick = (brand) => {
    // Navigate to cars page with brand filter
    navigate(`/cars?brand=${encodeURIComponent(brand)}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="position-relative overflow-hidden" style={{ minHeight: '60vh', backgroundColor: '#3b82f6' }}>
        <div className="container position-relative text-white d-flex align-items-center" style={{ minHeight: '60vh', zIndex: 2 }}>
          <div className="row">
            <div className="col-lg-8">
              <h1 className="display-4 fw-bold mb-4">
                Find Your Perfect Car with <span className="text-warning">93cars</span>
              </h1>
              <p className="lead mb-4">
                Discover a wide range of quality used cars with transparent pricing, 
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

      {/* Quick Search */}
      <section className="py-4 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="row g-3 align-items-end">
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Brand</label>
                      <select className="form-select">
                        <option>Select Brand</option>
                        {brands.map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label fw-semibold">Body Type</label>
                      <select className="form-select">
                        <option>Select Body Type</option>
                        <option>SUV</option>
                        <option>Sedan</option>
                        <option>Hatchback</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <Link to="/cars" className="btn btn-primary w-100">
                        <i className="fas fa-search me-2"></i>Search Cars
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Featured Cars</h2>
            <p className="text-muted">Handpicked cars with the best value for money</p>
          </div>
          <div className="row">
            {featuredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/cars" className="btn btn-warning btn-lg px-5">
              View All Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Top Brands */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Popular Brands</h2>
            <p className="text-muted">Choose from top automotive brands</p>
          </div>
          <div className="row g-4">
            {brands.slice(0, 6).map(brand => (
              <div key={brand} className="col-lg-2 col-md-4 col-6">
                <div 
                  className="card border-0 shadow-sm text-center h-100 brand-card" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleBrandClick(brand)}
                >
                  <div className="card-body d-flex align-items-center justify-content-center">
                    <h5 className="fw-bold mb-0">{brand}</h5>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Embed Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="fw-bold mb-4">Discover the 93cars Difference</h2>
              <p className="text-muted">
                At 93cars, we're dedicated to simplifying your car search. As a premier car listing company, we don't sell cars directly. Instead, we provide a comprehensive platform where you can explore a wide variety of vehicles. We offer detailed information, features, and specifications for every car listed, empowering you to make an informed decision. Our goal is to connect you with your ideal car by providing all the necessary details in one place.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="ratio ratio-16x9 rounded overflow-hidden shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/aVLYr_E1tJQ"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose 93cars?</h2>
            <p className="text-muted">We make car discovery simple, transparent, and trustworthy</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <BadgeCheck className="text-dark" size={40} />
                </div>
                <h5 className="fw-bold">Comprehensive Listings</h5>
                <p className="text-muted">Detailed specifications, features, and high-quality images for every car.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <IndianRupee className="text-dark" size={40} />
                </div>
                <h5 className="fw-bold">Transparent Information</h5>
                <p className="text-muted">Clear information, including pricing, to help you compare options easily.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <Handshake className="text-dark" size={40} />
                </div>
                <h5 className="fw-bold">Trusted Platform</h5>
                <p className="text-muted">Connect with sellers on a reliable and user-friendly platform.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <Clock className="text-dark" size={40} />
                </div>
                <h5 className="fw-bold">Effortless Discovery</h5>
                <p className="text-muted">Our powerful search tools make finding your next car simple and fast.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
