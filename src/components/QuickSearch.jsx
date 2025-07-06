
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const QuickSearch = () => {
  const [searchType, setSearchType] = useState('budget');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  // Budget options
  const budgetOptions = [
    { label: 'Under 5 Lakh', value: '0-500000' },
    { label: '5-10 Lakh', value: '500000-1000000' },
    { label: '10-15 Lakh', value: '1000000-1500000' },
    { label: '15-20 Lakh', value: '1500000-2000000' },
    { label: 'Above 20 Lakh', value: '2000000-5000000' }
  ];

  // Vehicle types
  const vehicleTypes = ['SUV', 'Hatchback', 'Sedan', 'MUV', 'Convertible', 'Coupe'];
  
  // Brand options
  const brands = ['Hyundai', 'Tata', 'Maruti', 'Kia', 'Mahindra', 'Honda', 'Toyota', 'Ford', 'Skoda', 'Volkswagen'];

  // Load carousel images from Firebase
  useEffect(() => {
    const loadCarouselImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'carouselImages'));
        const images = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => a.order - b.order);
        setBackgroundImages(images);
      } catch (error) {
        console.error('Error loading carousel images:', error);
      }
    };
    
    loadCarouselImages();
  }, []);

  // Auto-rotate carousel every 20 seconds
  useEffect(() => {
    if (backgroundImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % backgroundImages.length);
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [backgroundImages.length]);

  const handleSearch = () => {
    let queryParams = new URLSearchParams();
    
    if (searchType === 'budget') {
      if (selectedBudget) {
        const [min, max] = selectedBudget.split('-');
        queryParams.append('minPrice', min);
        queryParams.append('maxPrice', max);
      }
      if (selectedVehicleType) {
        queryParams.append('bodyType', selectedVehicleType);
      }
    } else {
      if (selectedBrand) {
        queryParams.append('brand', selectedBrand);
      }
      if (selectedModel) {
        queryParams.append('model', selectedModel);
      }
    }

    navigate(`/cars?${queryParams.toString()}`);
  };

  const currentBackgroundImage = backgroundImages.length > 0 
    ? backgroundImages[currentImageIndex]?.imageUrl 
    : null;

  return (
    <div className="position-relative">
      {/* Background Image */}
      {currentBackgroundImage && (
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 rounded"
          style={{
            backgroundImage: `url(${currentBackgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -1,
            opacity: 0.3
          }}
        />
      )}
      
      <div className="bg-white rounded shadow-lg" style={{ maxWidth: '320px' }}>
        {/* Header */}
        <div className="text-center py-3 text-white fw-bold" style={{ backgroundColor: '#f1c40f', fontSize: '16px' }}>
          SEARCH THE RIGHT CAR
        </div>
        
        {/* Content */}
        <div className="p-3">
          {/* Radio Options */}
          <div className="d-flex gap-3 mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="searchType"
                id="byBudget"
                checked={searchType === 'budget'}
                onChange={() => setSearchType('budget')}
                style={{ backgroundColor: searchType === 'budget' ? '#f1c40f' : '', borderColor: '#f1c40f' }}
              />
              <label className="form-check-label fw-semibold" htmlFor="byBudget" style={{ color: '#f1c40f' }}>
                BY BUDGET
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="searchType"
                id="byModel"
                checked={searchType === 'model'}
                onChange={() => setSearchType('model')}
                style={{ backgroundColor: searchType === 'model' ? '#f1c40f' : '', borderColor: '#f1c40f' }}
              />
              <label className="form-check-label fw-semibold" htmlFor="byModel" style={{ color: '#f1c40f' }}>
                BY MODEL
              </label>
            </div>
          </div>

          {/* Conditional Dropdowns */}
          {searchType === 'budget' ? (
            <>
              <div className="mb-3">
                <select 
                  className="form-select"
                  value={selectedBudget}
                  onChange={(e) => setSelectedBudget(e.target.value)}
                  style={{ borderColor: '#ddd' }}
                >
                  <option value="">Select Budget</option>
                  {budgetOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <select 
                  className="form-select"
                  value={selectedVehicleType}
                  onChange={(e) => setSelectedVehicleType(e.target.value)}
                  style={{ borderColor: '#ddd' }}
                >
                  <option value="">All Vehicle Types</option>
                  {vehicleTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                <select 
                  className="form-select"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  style={{ borderColor: '#ddd' }}
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <select 
                  className="form-select"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  style={{ borderColor: '#ddd' }}
                >
                  <option value="">Select Model</option>
                  {/* You can populate this based on selected brand */}
                </select>
              </div>
            </>
          )}

          {/* Search Button */}
          <button 
            className="btn w-100 fw-bold"
            onClick={handleSearch}
            style={{ backgroundColor: '#f1c40f', color: 'white', border: 'none' }}
          >
            SEARCH
          </button>

          {/* Advanced Search Link */}
          <div className="text-center mt-3">
            <button 
              className="btn btn-link p-0 text-decoration-none fw-semibold"
              onClick={() => navigate('/cars')}
              style={{ color: '#f1c40f' }}
            >
              ADVANCED SEARCH ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickSearch;
