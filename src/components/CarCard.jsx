
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
            className="card-img-top border border-1 border-secondary" 
            alt={car.name}
            style={{ height: '220px', objectFit: 'cover' }}
          />
          <div className="position-absolute top-0 end-0 p-2">
            <span className="badge bg-info">{car.fuelType}</span>
          </div>
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold text-dark">{car.name}</h5>
          <p className="text-muted small mb-2">{car.bodyType}</p>

          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="text-primary fw-bold mb-0">{formatPrice(car.price)}</h5>
              </div>
            </div>
            <Link to={`/cars/${car.id}`} className="btn btn-primary w-100 fw-semibold">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;

