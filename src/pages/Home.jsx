
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import carsData from '../data/cars.json';
import HeroSection from '../components/HeroSection';
import FeaturedCars from '../components/FeaturedCars';
import PopularBrands from '../components/PopularBrands';
import VideoSection from '../components/VideoSection';
import BlogSection from '../components/BlogSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ChatBot from '../components/ChatBot';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter cars to only show main variants (car001, car002, etc.) - not sub-variants
    const mainVariantCars = carsData.filter(car => /^\D+\d+$/.test(car.id));
    // Get featured cars (first 3 main variants)
    setFeaturedCars(mainVariantCars.slice(0, 8));
    
    // Get unique brands
    const uniqueBrands = [...new Set(carsData.map(car => car.brand))];
    setBrands(uniqueBrands);
  }, []);

  const handleBrandClick = (brand) => {
    // Navigate to cars page with brand filter
    navigate(`/cars?brand=${encodeURIComponent(brand)}`);
  };

  const handleCarSearch = (searchTerm) => {
    setIsSearching(true);
    
    // Filter cars based on search term
    const filteredCars = carsData.filter(car => 
      car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Only show main variants (car001, car002, etc.) - not sub-variants
    const mainVariantResults = filteredCars.filter(car => /^\D+\d+$/.test(car.id));
    
    setSearchResults(mainVariantResults.slice(0, 8));
    setIsSearching(searchTerm.trim() !== '');
  };

  return (
    <div>
      <HeroSection />
      <FeaturedCars 
        featuredCars={isSearching ? searchResults : featuredCars} 
        title={isSearching ? "Search Results" : "Featured Cars"}
      />
      <PopularBrands brands={brands} onBrandClick={handleBrandClick} />
      <VideoSection />
      {/*<BlogSection />*/}
      <WhyChooseUs />
      <ChatBot onCarSearch={handleCarSearch} />
    </div>
  );
};

export default Home;
