
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import carsData from '../data/cars.json';

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const foundCar = carsData.find(c => c.id === id);
    setCar(foundCar);
  }, [id]);

  if (!car) {
    return (
      <div className="container py-5 text-center">
        <h2>Car not found</h2>
        <Link to="/cars" className="btn btn-warning">Back to Cars</Link>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/cars">Cars</Link></li>
          <li className="breadcrumb-item active">{car.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-8">
          {/* Image Gallery */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-0">
              <div id="carImageCarousel" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                  {car.gallery.map((image, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                      <img 
                        src={image} 
                        className="d-block w-100" 
                        alt={`${car.name} ${index + 1}`}
                        style={{ height: '400px', objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carImageCarousel" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon"></span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carImageCarousel" data-bs-slide="next">
                  <span className="carousel-control-next-icon"></span>
                </button>
              </div>
              
              {/* Thumbnail images */}
              <div className="d-flex gap-2 p-3 overflow-auto">
                {car.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`img-thumbnail ${activeImageIndex === index ? 'border-warning' : ''}`}
                    style={{ width: '80px', height: '60px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => setActiveImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Car Details */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h2 className="card-title fw-bold mb-3">{car.name}</h2>
              <p className="text-muted mb-4">{car.description}</p>
              
              <div className="row g-4">
                <div className="col-sm-6 col-lg-3">
                  <div className="text-center p-3 bg-light rounded">
                    <i className="fas fa-gas-pump text-warning fa-2x mb-2"></i>
                    <h6 className="fw-bold">Fuel Type</h6>
                    <span>{car.fuelType}</span>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="text-center p-3 bg-light rounded">
                    <i className="fas fa-cogs text-warning fa-2x mb-2"></i>
                    <h6 className="fw-bold">Transmission</h6>
                    <span>{car.transmission}</span>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="text-center p-3 bg-light rounded">
                    <i className="fas fa-tachometer-alt text-warning fa-2x mb-2"></i>
                    <h6 className="fw-bold">Mileage</h6>
                    <span>{car.mileage}</span>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="text-center p-3 bg-light rounded">
                    <i className="fas fa-users text-warning fa-2x mb-2"></i>
                    <h6 className="fw-bold">Seats</h6>
                    <span>{car.seatingCapacity}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white">
              <h4 className="fw-bold mb-0">Specifications</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td className="fw-semibold">Brand</td>
                        <td>{car.brand}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Model</td>
                        <td>{car.model}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Year</td>
                        <td>{car.year}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Body Type</td>
                        <td>{car.bodyType}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Engine</td>
                        <td>{car.engine}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <table className="table table-borderless">
                    <tbody>
                      <tr>
                        <td className="fw-semibold">KM Driven</td>
                        <td>{car.kmDriven.toLocaleString()} km</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Owner</td>
                        <td>{car.owner} Owner</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Location</td>
                        <td>{car.location}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Seating</td>
                        <td>{car.seatingCapacity} Seater</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Transmission</td>
                        <td>{car.transmission}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white">
              <h4 className="fw-bold mb-0">Key Features</h4>
            </div>
            <div className="card-body">
              <div className="row">
                {car.features.map((feature, index) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-2">
                    <i className="fas fa-check text-success me-2"></i>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Price Card */}
          <div className="card border-0 shadow-sm sticky-top" style={{top: '20px'}}>
            <div className="card-body">
              <div className="text-center mb-4">
                <h3 className="text-primary fw-bold mb-0">{formatPrice(car.price)}</h3>
                <p className="text-muted">EMI starts from {car.emi}</p>
              </div>
              
              <div className="d-grid gap-2 mb-4">
                <button className="btn btn-warning btn-lg">
                  <i className="fas fa-phone me-2"></i>Call Seller
                </button>
                <button className="btn btn-outline-primary">
                  <i className="fas fa-envelope me-2"></i>Send Message
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="fas fa-heart me-2"></i>Add to Wishlist
                </button>
              </div>

              <div className="border-top pt-3">
                <h6 className="fw-bold mb-3">Calculate EMI</h6>
                <div className="mb-3">
                  <label className="form-label">Down Payment</label>
                  <input type="range" className="form-range" min="10" max="50" defaultValue="20" />
                  <div className="d-flex justify-content-between small text-muted">
                    <span>10%</span>
                    <span>50%</span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Loan Tenure</label>
                  <select className="form-select">
                    <option>3 Years</option>
                    <option>4 Years</option>
                    <option selected>5 Years</option>
                    <option>7 Years</option>
                  </select>
                </div>
                <button className="btn btn-primary w-100">Calculate EMI</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
