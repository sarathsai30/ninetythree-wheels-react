import { Link } from 'react-router-dom';
import carsData from '../data/cars.json';
import { createCarSlug } from '../utils/carUtils';

const CarCard = ({ car }) => {
  // Converting the price (₹) into lakhs with 2 decimals
  const formatToLakh = (price) => {
    return (price / 100000).toFixed(2);
  };

  // Comparing the names to lowercase for comparison
  const relatedCars = carsData.filter(
    (c) => c.name.toLowerCase() === car.name.toLowerCase()
  );

  // Finding the min and max price for this current model
  const prices = relatedCars.map((c) => c.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100 border-0 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
        <div className="position-relative overflow-hidden rounded-top">
          <div
            className="d-flex align-items-center justify-content-center bg-light"
            style={{ height: '220px', overflow: 'hidden' }}
          >
            <img
              src={car.image}
              alt={car.name}
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
            />
          </div>

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
                <h5 className="text-primary fw-bold mb-0">
                  ₹{formatToLakh(minPrice)} - {formatToLakh(maxPrice)} Lakh*
                </h5>
              </div>
            </div>
                <Link to={`/cars/${createCarSlug(car.brand, car.name)}`} className="btn btn-primary w-100 fw-semibold">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
