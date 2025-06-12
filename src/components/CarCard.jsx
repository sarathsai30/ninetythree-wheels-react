
import React from 'react';
import { Link } from 'react-router-dom';

const CarCard = ({ car }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 border-0 shadow-sm">
        <div className="position-relative overflow-hidden">
          <img 
            src={car.image} 
            className="card-img-top" 
            alt={car.name}
            style={{ height: '220px', objectFit: 'cover' }}
          />
          <div className="position-absolute top-0 start-0 p-2">
            <span className="badge bg-danger text-white">{car.year}</span>
          </div>
          <div className="position-absolute top-0 end-0 p-2">
            <span className="badge bg-info">{car.fuelType}</span>
          </div>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold text-dark">{car.name}</h5>
          <p className="text-muted small mb-2">{car.model} • {car.bodyType}</p>
          
          <div className="row text-center mb-3">
            <div className="col-4">
              <small className="text-muted d-block">Mileage</small>
              <span className="fw-semibold small">{car.mileage}</span>
            </div>
            <div className="col-4">
              <small className="text-muted d-block">Engine</small>
              <span className="fw-semibold small">{car.engine}</span>
            </div>
            <div className="col-4">
              <small className="text-muted d-block">Seats</small>
              <span className="fw-semibold small">{car.seatingCapacity}</span>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted small">
              <i className="fas fa-map-marker-alt me-1"></i>{car.location}
            </span>
            <span className="text-muted small">{car.kmDriven.toLocaleString()} km</span>
          </div>

          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="text-danger fw-bold mb-0">{formatPrice(car.price)}</h5>
                <small className="text-muted">EMI from {car.emi}</small>
              </div>
            </div>
            <Link to={`/cars/${car.id}`} className="btn btn-danger w-100 fw-semibold">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
