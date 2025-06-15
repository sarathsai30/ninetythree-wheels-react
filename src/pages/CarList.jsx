
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/CarCard';
import SearchFilter from '../components/SearchFilter';
import carsData from '../data/cars.json';
import filtersData from '../data/filters.json';

const CarList = () => {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState(carsData);
  const [filteredCars, setFilteredCars] = useState(carsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [priceRange, setPriceRange] = useState([filtersData.priceRange.min, filtersData.priceRange.max]);
  const [sortBy, setSortBy] = useState('name');

  // Handle URL parameters for brand filtering
  useEffect(() => {
    const brandFromUrl = searchParams.get('brand');
    if (brandFromUrl) {
      setSelectedBrand(brandFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = cars;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Brand filter
    if (selectedBrand) {
      filtered = filtered.filter(car => car.brand === selectedBrand);
    }

    // Fuel type filter
    if (selectedFuelType) {
      filtered = filtered.filter(car => car.fuelType === selectedFuelType);
    }

    // Body type filter
    if (selectedBodyType) {
      filtered = filtered.filter(car => car.bodyType === selectedBodyType);
    }

    // Price range filter
    filtered = filtered.filter(car => 
      car.price >= priceRange[0] && car.price <= priceRange[1]
    );

    // Sort cars
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'year':
          return b.year - a.year;
        case 'mileage':
          return parseFloat(a.mileage) - parseFloat(b.mileage);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredCars(filtered);
  }, [searchTerm, selectedBrand, selectedFuelType, selectedBodyType, priceRange, sortBy, cars]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedFuelType('');
    setSelectedBodyType('');
    setPriceRange([filtersData.priceRange.min, filtersData.priceRange.max]);
    setSortBy('name');
    // Clear URL parameters
    window.history.replaceState({}, '', '/cars');
  };

  const getUniqueCarsByName = (carList) => {
    const unique = carList.reduce((acc, car) => {
      if (!acc[car.name]) {
        acc[car.name] = car;
      }
      return acc;
    }, {});
    return Object.values(unique);
  };
  
  const uniqueFilteredCars = getUniqueCarsByName(filteredCars);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">New Cars for Sale</h1>
          <p className="text-muted">Found {uniqueFilteredCars.length} models matching your criteria</p>
        </div>
        <div className="d-flex gap-2">
          <select 
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{width: '200px'}}
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="year">Year: Newest First</option>
            <option value="mileage">Mileage</option>
          </select>
          <button 
            className="btn btn-outline-secondary"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedFuelType={selectedFuelType}
        setSelectedFuelType={setSelectedFuelType}
        selectedBodyType={selectedBodyType}
        setSelectedBodyType={setSelectedBodyType}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        filters={filtersData}
      />

      {uniqueFilteredCars.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="fas fa-car fa-3x text-muted"></i>
          </div>
          <h3>No cars found</h3>
          <p className="text-muted">Try adjusting your search criteria or clearing filters</p>
          <button className="btn btn-warning" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="row">
          {uniqueFilteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
