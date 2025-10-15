import React, { useState, useMemo } from 'react';
import dealersData from '../data/dealers.json';

const Dealers = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showAllBrands, setShowAllBrands] = useState(false);

  // Memoized brand data from imported JSON
  const brandsData = useMemo(() => 
    dealersData.brands, 
    []
  );

  // Number of brands to show initially
  const INITIAL_BRANDS_COUNT = 12;

  // Get brands to display (limited or all based on showAllBrands state)
  const displayedBrands = useMemo(() => {
    return showAllBrands ? brandsData : brandsData.slice(0, INITIAL_BRANDS_COUNT);
  }, [brandsData, showAllBrands]);

  // Memoized cities for selected brand
  const citiesForBrand = useMemo(() => {
    if (!selectedBrand) return [];
    const brand = brandsData.find(b => b.name === selectedBrand);
    return brand ? brand.cities.map(city => city.name) : [];
  }, [selectedBrand, brandsData]);

  // Memoized dealers for selected brand and city
  const dealers = useMemo(() => {
    if (!selectedBrand || !selectedCity) return [];
    
    const brand = brandsData.find(b => b.name === selectedBrand);
    if (!brand) return [];
    
    const city = brand.cities.find(c => c.name === selectedCity);
    return city ? city.dealers : [];
  }, [selectedBrand, selectedCity, brandsData]);

  // Get brand logo
  const getBrandLogo = (brandName) => {
    const brand = brandsData.find(b => b.name === brandName);
    return brand?.logo || null;
  };

  const handleBrandChange = (brandName) => {
    setSelectedBrand(brandName);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const toggleBrandsView = () => {
    setShowAllBrands(!showAllBrands);
  };

  // Function to open Google Maps with the dealer's address
  const handleGetDirections = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FFF8E1] rounded-full shadow-lg mb-4 border border-[#FFC107]">
            <svg className="w-10 h-10 text-[#FFC107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect Dealer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover authorized car dealers near you with just a few clicks
          </p>
        </div>

        {/* Selection Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Brand Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#FFF8E1] rounded-lg flex items-center justify-center border border-[#FFC107]">
                  <svg className="w-5 h-5 text-[#FFC107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-1">
                    BRAND
                  </label>
                  <p className="text-sm text-gray-500">Select Your Brand</p>
                </div>
              </div>
              <select
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="w-full p-3 border-2 border-[#FFC107] rounded-xl focus:ring-2 focus:ring-[#FFC107] focus:border-[#FFC107] transition-all duration-200 bg-white hover:bg-[#FFF8E1]"
              >
                <option value="">Choose a brand...</option>
                {brandsData.map(brand => (
                  <option key={brand.name} value={brand.name}>{brand.name}</option>
                ))}
              </select>
            </div>

            {/* City Selection */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#FFF8E1] rounded-lg flex items-center justify-center border border-[#FFC107]">
                  <svg className="w-5 h-5 text-[#FFC107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-1">
                    CITY
                  </label>
                  <p className="text-sm text-gray-500">Select Your City</p>
                </div>
              </div>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                disabled={!selectedBrand}
                className="w-full p-3 border-2 border-[#FFC107] rounded-xl focus:ring-2 focus:ring-[#FFC107] focus:border-[#FFC107] transition-all duration-200 bg-white hover:bg-[#FFF8E1] disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a city...</option>
                {citiesForBrand.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Brand Grid Section */}
          {!selectedBrand && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Explore dealer showrooms by brand
              </h2>
              
              {/* Brands Grid with Logos - Exactly like the image */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
                {displayedBrands.map((brand) => {
                  const brandLogo = brand.logo;
                  return (
                    <div
                      key={brand.name}
                      onClick={() => handleBrandChange(brand.name)}
                      className="bg-white border border-gray-300 rounded-3xl p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg hover:border-[#FFC107] transition-all duration-300"
                    >
                      {/* Brand Logo */}
                      <div className="w-24 h-24 flex items-center justify-center mb-2 transition-colors duration-300 group-hover:bg-[#FFF8E1] rounded-xl overflow-hidden">
                        <img
                          src={brandLogo}
                          alt={brand.name}
                          className="w-full h-full object-contain"
                          onError={(e) => (e.target.style.display = 'none')}
                        />
                      </div>

                      {/* Brand Name */}
                      <span className="text-sm font-medium text-gray-900 text-center group-hover:text-[#FF8F00]">
                        {brand.name}
                      </span>
                    </div>

                  );
                })}
              </div>
              
              {/* View More/Less Brands Button */}
              {brandsData.length > INITIAL_BRANDS_COUNT && (
                <div className="text-center">
                  <button
                    onClick={toggleBrandsView}
                    className="bg-[#FFC107] text-gray-900 px-8 py-4 rounded-2xl hover:bg-[#FFB300] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl text-lg"
                  >
                    {showAllBrands ? 'View Less Brands' : 'View More Brands'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="results-section">
          {dealers.length > 0 ? (
            <div>
              {/* Results Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {dealers.length} {selectedBrand} Dealers in {selectedCity}
                  </h2>
                  <p className="text-gray-600">Authorized dealerships near you</p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className="inline-flex items-center px-4 py-2 bg-[#FFC107] text-black rounded-full text-sm font-medium border border-[#FFC107]">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {dealers.length} dealers found
                  </span>
                </div>
              </div>
              
              {/* Dealers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {dealers.map((dealer, index) => {
                  const brandLogo = getBrandLogo(selectedBrand);
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                      <div className="p-6">
                        {/* Dealer Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#FF8F00] transition-colors duration-200">
                              {dealer.shop_name}
                            </h3>
                            <span className="inline-block mt-2 bg-[#FFC107] text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                              {selectedBrand} Authorized
                            </span>
                          </div>
                          <div className="w-12 h-12 bg-[#FFF8E1] rounded-xl flex items-center justify-center group-hover:bg-[#FFC107] transition-colors duration-200 border border-[#FFC107] overflow-hidden">
                            {brandLogo ? (
                              <img 
                                src={brandLogo} 
                                alt={selectedBrand}
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'block';
                                }}
                              />
                            ) : null}
                            <svg className={`w-6 h-6 text-[#FFC107] group-hover:text-black transition-colors duration-200 ${brandLogo ? 'hidden' : 'block'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Dealer Info */}
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-8 h-8 bg-[#FFF8E1] rounded-lg flex items-center justify-center mt-1 mr-3 border border-[#FFC107]">
                              <svg className="w-4 h-4 text-[#FFC107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              </svg>
                            </div>
                            <p className="text-gray-700 leading-relaxed flex-1">
                              {dealer.address}
                            </p>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-[#FFF8E1] rounded-lg flex items-center justify-center mr-3 border border-[#FFC107]">
                              <svg className="w-4 h-4 text-[#FFC107]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                            </div>
                            <a 
                              href={`tel:${dealer.contact_number}`}
                              className="text-lg font-semibold text-gray-700 hover:text-[#FF6F00] transition-colors duration-200"
                            >
                              {dealer.contact_number}
                            </a>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="mt-6 flex gap-3">
                          <a
                            href={`tel:${dealer.contact_number}`}
                            className="flex-1 bg-[#FFC107] text-gray-900 py-3 px-4 rounded-xl hover:bg-[#FFB300] transition-all duration-200 font-semibold text-center shadow-md hover:shadow-lg"
                          >
                            Call Now
                          </a>
                          <button 
                            onClick={() => handleGetDirections(dealer.address)}
                            className="flex-1 border-2 border-[#FFC107] text-gray-700 py-1 px-3 rounded-xl hover:bg-[#FFF8E1] transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                          >
                            Get Directions
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : selectedBrand && selectedCity ? (
            /* No Results State */
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-200">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Dealers Found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                We couldn't find any {selectedBrand} dealers in {selectedCity}. Try selecting a different city or brand.
              </p>
              <button
                onClick={() => {
                  setSelectedBrand('');
                  setSelectedCity('');
                }}
                className="bg-[#FFC107] text-gray-900 px-8 py-3 rounded-xl hover:bg-[#FFB300] transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
              >
                Search Again
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Dealers;