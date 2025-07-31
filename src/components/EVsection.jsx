/*
import React from 'react';
import carsData from '../data/cars.json';

const EVSection = () => {
  const evCars = carsData.filter(car => car.vehicleType === 'EV');

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">⚡ Electric Vehicles</h2>
      <div className="row">
        {evCars.map((car, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <img src={car.image} className="card-img-top" alt={car.name} />
              <div className="card-body">
                <h5 className="card-title">{car.name}</h5>
                <p>🔋 Range: {car.batteryRange}</p>
                <p>⚡ Charging: {car.chargingTime}</p>
                <p>💰 ₹{car.price.toLocaleString()}</p>
                <a href={`/cars/${car.id}`} className="btn btn-outline-primary btn-sm mt-2">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EVSection;*/
/*import React from 'react';
import carsData from '../data/cars.json';

const EVSection = () => {
  // Filter EVs by fuelType
  const evCars = [];
const seenModels = new Set();

carsData.forEach(car => {
  if (car.fuelType === 'Electric' && !seenModels.has(car.name)) {
    evCars.push(car);
    seenModels.add(car.name);
  }
});


  if (evCars.length === 0) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">⚡ Electric Vehicles</h2>
        <p className="text-center text-muted">No EVs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">⚡ Electric Vehicles</h2>

      <div
        className="d-flex gap-3 pb-2"
        style={{
          overflowX: 'auto',
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}
      >
        {evCars.map((car, index) => (
          <div
            key={index}
            className="card shadow-sm"
            style={{
              minWidth: '250px',
              maxWidth: '250px',
              flex: '0 0 auto',
            }}
          >
            <img
              src={car.image}
              className="card-img-top"
              alt={car.name}
              style={{ height: '150px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h6 className="card-title">{car.name}</h6>
              <p className="mb-1">🔋 {car.mileage}</p>
              <p className="mb-1">⚡ {car.chargingTime || '—'}</p>
              <p className="mb-2">💰 ₹{car.price? car.price.toLocaleString('en-IN'):'-'}</p>
              <a href={`/cars/${car.id}`} className="btn btn-primary btn-sm fw-semibold shadow-sm">View</a>
              <button className="btn btn-link btn-sm text-muted">Compare</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EVSection;*/
import React, { useState } from 'react';
import carsData from '../data/cars.json';

const EVSection = () => {
  const [compareList, setCompareList] = useState([]);

  const evCars = [];
  const seenModels = new Set();

  carsData.forEach(car => {
    if (car.fuelType === 'Electric' && !seenModels.has(car.name)) {
      evCars.push(car);
      seenModels.add(car.name);
    }
  });

  const toggleCompare = (car) => {
    setCompareList(prev => {
      const alreadySelected = prev.find(c => c.id === car.id);
      if (alreadySelected) {
        return prev.filter(c => c.id !== car.id);
      } else {
        if (prev.length >= 3) return prev; // max 3
        return [...prev, car];
      }
    });
  };

  const clearCompare = () => setCompareList([]);

  if (evCars.length === 0) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">⚡ Electric Vehicles</h2>
        <p className="text-center text-muted">No EVs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 relative">
      <h2 className="text-center mb-4">⚡ Electric Vehicles</h2>

      <div
        className="d-flex gap-3 pb-2"
        style={{
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {evCars.map((car, index) => {
          const isSelected = compareList.find(c => c.id === car.id);
          return (
            <div
              key={index}
              className={`card shadow-sm border ${isSelected ? 'border-primary' : ''}`}
              style={{ minWidth: '250px', maxWidth: '250px', flex: '0 0 auto' }}
            >
              <img
                src={car.image}
                className="card-img-top"
                alt={car.name}
                style={{ height: '150px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h6 className="card-title">{car.name}</h6>
                <p className="mb-1">🔋 {car.mileage}</p>
                <p className="mb-1">⚡ {car.chargingTime || '—'}</p>
                <p className="mb-2">💰 ₹{car.price ? car.price.toLocaleString('en-IN') : '-'}</p>
                <a href={`/cars/${car.id}`} className="btn btn-primary btn-sm fw-semibold shadow-sm">View</a>
                <button
                  className="btn btn-link btn-sm text-muted"
                  onClick={() => toggleCompare(car)}
                >
                  {isSelected ? 'Remove' : 'Compare'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {compareList.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 bg-white border rounded shadow-lg p-3 d-flex align-items-center gap-3">
          <span className="fw-semibold">Selected: {compareList.length}</span>
          <a
           href={`/compare?ids=${compareList.map(c => c.id).join(',')}`}
           className="btn btn-sm btn-outline-success"
           >
           Compare Now
          </a>

          <button className="btn btn-sm btn-outline-danger" onClick={clearCompare}>Clear</button>
        </div>
      )}
    </div>
  );
};

export default EVSection;

