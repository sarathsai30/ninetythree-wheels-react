
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CarCard from '../components/CarCard';
import carsData from '../data/cars.json';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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

  const carouselImages = [
    "https://images.unsplash.com/photo-1549924231-f129b911e442?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&h=800&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=1200&h=800&fit=crop&q=80"
  ];

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="position-relative" style={{ minHeight: '60vh' }}>
        <Carousel
          plugins={[plugin.current]}
          className="w-100 h-100 position-absolute top-0 start-0"
          opts={{ loop: true }}
        >
          <CarouselContent className="h-100">
            {carouselImages.map((src, index) => (
              <CarouselItem key={index} className="h-100 p-0">
                <div 
                  className="w-100 h-100"
                  style={{ 
                    backgroundImage: `url(${src})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 text-white bg-black/20 hover:bg-black/40 border-0" />
          <CarouselNext className="absolute right-4 text-white bg-black/20 hover:bg-black/40 border-0" />
        </Carousel>
        
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(59, 130, 246, 0.5)' }}></div>

        <div className="container position-relative text-white d-flex align-items-center" style={{ minHeight: '60vh' }}>
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

      {/* Why Choose Us */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose 93cars?</h2>
            <p className="text-muted">We make car buying simple, transparent, and trustworthy</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-certificate text-dark fa-2x"></i>
                </div>
                <h5 className="fw-bold">Quality Assured</h5>
                <p className="text-muted">Every car is thoroughly inspected and verified for quality</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-rupee-sign text-dark fa-2x"></i>
                </div>
                <h5 className="fw-bold">Best Prices</h5>
                <p className="text-muted">Competitive pricing with transparent cost breakdown</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-handshake text-dark fa-2x"></i>
                </div>
                <h5 className="fw-bold">Trusted Service</h5>
                <p className="text-muted">Reliable customer service and post-purchase support</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-clock text-dark fa-2x"></i>
                </div>
                <h5 className="fw-bold">Quick Process</h5>
                <p className="text-muted">Fast and hassle-free car buying experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
