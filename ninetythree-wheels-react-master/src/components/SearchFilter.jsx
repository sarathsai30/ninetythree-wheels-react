
import React from 'react';

const SearchFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedBrand, 
  setSelectedBrand,
  selectedFuelType,
  setSelectedFuelType,
  selectedBodyType,
  setSelectedBodyType,
  priceRange,
  setPriceRange,
  filters
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-light p-4 rounded mb-4">
      <div className="row g-3">
        <div className="col-lg-3 col-md-6">
          <label className="form-label fw-semibold">Search Cars</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by car name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="col-lg-2 col-md-6">
          <label className="form-label fw-semibold">Brand</label>
          <select
            className="form-select"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {filters.brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="col-lg-2 col-md-6">
          <label className="form-label fw-semibold">Fuel Type</label>
          <select
            className="form-select"
            value={selectedFuelType}
            onChange={(e) => setSelectedFuelType(e.target.value)}
          >
            <option value="">All Fuel Types</option>
            {filters.fuelTypes.map(fuel => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </div>

        <div className="col-lg-2 col-md-6">
          <label className="form-label fw-semibold">Body Type</label>
          <select
            className="form-select"
            value={selectedBodyType}
            onChange={(e) => setSelectedBodyType(e.target.value)}
          >
            <option value="">All Body Types</option>
            {filters.bodyTypes.map(body => (
              <option key={body} value={body}>{body}</option>
            ))}
          </select>
        </div>

        <div className="col-lg-3 col-md-6">
          <label className="form-label fw-semibold">
            Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
          </label>
          <input
            type="range"
            className="form-range"
            min={filters.priceRange.min}
            max={filters.priceRange.max}
            step={filters.priceRange.step}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
