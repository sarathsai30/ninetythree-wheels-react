/*import React from 'react';
import EVSection from '../components/EVsection';

const EVs = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">⚡ Explore All Electric Vehicles</h2>
      <EVSection />
    </div>
  );
};

export default EVs;*/
import React, { useState } from 'react';
import carsData from '../data/cars.json';

const EVs = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [selectedRange, setSelectedRange] = useState('');
  const [filters, setFilters] = useState(null);

  const evCars = [];
  const seenNames = new Set();

  carsData.forEach(car => {
    if (car.fuelType === 'Electric' && !seenNames.has(car.name)) {
      evCars.push(car);
      seenNames.add(car.name);
    }
  });

  let filteredCars = evCars.filter(car => {
    if (!filters) return true;

    const withinBrand = filters.brand === '' || car.brand === filters.brand;
    const withinBody = filters.bodyType === '' || car.bodyType === filters.bodyType;

    const withinPrice = (() => {
      if (!filters.price) return true;
      const [min, max] = filters.price.split('-').map(Number);
      return car.price >= min && car.price <= max;
    })();

    const withinRange = (() => {
      if (!filters.range || !car.mileage) return true;
      const km = parseInt(car.mileage.replace(/\D/g, '')) || 0;
      if (filters.range === '<200') return km < 200;
      if (filters.range === '200-400') return km >= 200 && km <= 400;
      if (filters.range === '>400') return km > 400;
      return true;
    })();

    return withinBrand && withinPrice && withinBody && withinRange;
  });

  // Optional: Sort by price low to high
  filteredCars.sort((a, b) => a.price - b.price);

  return (
    <div className="container my-5">
      <h2 className="mb-4">⚡ Browse Electric Vehicles</h2>

      {/* Filter Controls */}
      <div className="d-flex flex-wrap gap-3 mb-3 align-items-end">
        <select className="form-select" style={{ maxWidth: '180px' }} value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
          <option value="">All Brands</option>
          {[...new Set(evCars.map(car => car.brand))].map((b, i) => <option key={i} value={b}>{b}</option>)}
        </select>

        <select className="form-select" style={{ maxWidth: '180px' }} value={selectedPrice} onChange={e => setSelectedPrice(e.target.value)}>
          <option value="">All Prices</option>
          <option value="0-1000000">Under ₹10L</option>
          <option value="1000000-2000000">₹10L - ₹20L</option>
          <option value="2000000-9999999">₹20L+</option>
        </select>

        <select className="form-select" style={{ maxWidth: '180px' }} value={selectedBodyType} onChange={e => setSelectedBodyType(e.target.value)}>
          <option value="">All Body Types</option>
          {[...new Set(evCars.map(car => car.bodyType))].map((t, i) => <option key={i} value={t}>{t}</option>)}
        </select>

        <select className="form-select" style={{ maxWidth: '180px' }} value={selectedRange} onChange={e => setSelectedRange(e.target.value)}>
          <option value="">All Ranges</option>
          <option value="<200">&lt; 200 km</option>
          <option value="200-400">200–400 km</option>
          <option value=">400">&gt; 400 km</option>
        </select>

        <button
          className="btn btn-primary"
          onClick={() =>
            setFilters({
              brand: selectedBrand,
              price: selectedPrice,
              bodyType: selectedBodyType,
              range: selectedRange,
            })
          }
        >
          Search
        </button>

        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            setSelectedBrand('');
            setSelectedPrice('');
            setSelectedBodyType('');
            setSelectedRange('');
            setFilters(null);
          }}
        >
          Reset
        </button>
      </div>

      {/* Selected Filter Tags */}
      {filters && (
        <div className="mb-3">
          <strong>Filters: </strong>
          {filters.brand && <span className="badge bg-primary me-2">{filters.brand}</span>}
          {filters.price && <span className="badge bg-success me-2">₹{filters.price.replace('-', ' - ₹')}</span>}
          {filters.bodyType && <span className="badge bg-warning text-dark me-2">{filters.bodyType}</span>}
          {filters.range && <span className="badge bg-info text-dark me-2">{filters.range} km</span>}
        </div>
      )}

      {/* Results Count */}
      <div className="mb-3">
        <strong>{filteredCars.length}</strong> electric vehicle{filteredCars.length !== 1 ? 's' : ''} found
      </div>

      {/* EV Cards */}
      <div className="row">
        {filteredCars.length === 0 ? (
          <p className="text-muted">No matching EVs found.</p>
        ) : (
          filteredCars.map((car, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="card h-100 shadow-sm">
                <img src={car.image} className="card-img-top" alt={car.name} style={{ height: '160px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{car.name}</h5>
                  <p className="mb-1">🔋 {car.mileage}</p>
                  <p className="mb-1">💰 ₹{car.price.toLocaleString('en-IN')}</p>
                  <a href={`/cars/${car.id}`} className="btn btn-sm btn-primary">View</a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EVs;
