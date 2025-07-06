
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CarCard from '../components/CarCard';
import SearchFilter from '../components/SearchFilter';
import carsData from '../data/cars.json';
import filtersData from '../data/filters.json';

const CarList = () => {
  const [searchParams] = useSearchParams();
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedFuelType, setSelectedFuelType] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [priceRange, setPriceRange] = useState([filtersData.priceRange.min, filtersData.priceRange.max]);
  const [sortBy, setSortBy] = useState('name');

  // Handle URL parameters for filtering
  useEffect(() => {
    console.log('URL params changed:', Object.fromEntries(searchParams.entries()));
    
    const brandFromUrl = searchParams.get('brand');
    const bodyTypeFromUrl = searchParams.get('bodyType');
    const minPriceFromUrl = searchParams.get('minPrice');
    const maxPriceFromUrl = searchParams.get('maxPrice');
    
    if (brandFromUrl) {
      console.log('Setting brand from URL:', brandFromUrl);
      setSelectedBrand(brandFromUrl);
    }
    
    if (bodyTypeFromUrl) {
      console.log('Setting body type from URL:', bodyTypeFromUrl);
      setSelectedBodyType(bodyTypeFromUrl);
    }
    
    if (minPriceFromUrl && maxPriceFromUrl) {
      console.log('Setting price range from URL:', minPriceFromUrl, maxPriceFromUrl);
      setPriceRange([parseInt(minPriceFromUrl), parseInt(maxPriceFromUrl)]);
    }
  }, [searchParams]);

  // Apply all filters whenever any filter changes
  useEffect(() => {
    console.log('Applying filters:', {
      searchTerm,
      selectedBrand,
      selectedFuelType,
      selectedBodyType,
      priceRange
    });

    // let filtered = [...carsData];
    let filtered = carsData.filter(car => /^\D+\d+$/.test(car.id));

    // Search filter - check name, brand, and model
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(searchLower) ||
        car.brand.toLowerCase().includes(searchLower) ||
        car.model.toLowerCase().includes(searchLower)
      );
    }

    // Brand filter
    if (selectedBrand && selectedBrand !== '') {
      filtered = filtered.filter(car => car.brand === selectedBrand);
    }

    // Fuel type filter
    if (selectedFuelType && selectedFuelType !== '') {
      filtered = filtered.filter(car => car.fuelType === selectedFuelType);
    }

    // Body type filter
    if (selectedBodyType && selectedBodyType !== '') {
      filtered = filtered.filter(car => car.bodyType === selectedBodyType);
    }

    // Price range filter
    filtered = filtered.filter(car => 
      car.price >= priceRange[0] && car.price <= priceRange[1]
    );

    console.log('Filtered cars before sorting:', filtered.length);

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

    // Remove duplicates by ID (keep first occurrence after sorting)
    const uniqueFiltered = filtered.reduce((acc, car) => {
      if (!acc.find(existingCar => existingCar.id === car.id)) {
        acc.push(car);
      }
      return acc;
    }, []);

    console.log('Final filtered cars:', uniqueFiltered.length);
    setFilteredCars(uniqueFiltered);
  }, [searchTerm, selectedBrand, selectedFuelType, selectedBodyType, priceRange, sortBy]);

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

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="text-muted">Found {filteredCars.length} models matching your criteria</p>
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

      {filteredCars.length === 0 ? (
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
          {filteredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
