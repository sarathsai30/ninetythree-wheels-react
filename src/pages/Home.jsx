
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import carsData from '../data/cars.json';
import HeroSection from '../components/HeroSection';
import FeaturedCars from '../components/FeaturedCars';
import PopularBrands from '../components/PopularBrands';
import VideoSection from '../components/VideoSection';
import BlogSection from '../components/BlogSection';
import WhyChooseUs from '../components/WhyChooseUs';
import EVsection from '../components/EVsection.jsx';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter cars to only show main variants (car001, car002, etc.) - not sub-variants
    const mainVariantCars = carsData.filter(car => /^\D+\d+$/.test(car.id) && car.fuelType !== 'Electric');
    // Get featured cars (first 3 main variants)
    setFeaturedCars(mainVariantCars.slice(0, 3));
    
    // Get unique brands
    const uniqueBrands = [...new Set(carsData.map(car => car.brand))];
    setBrands(uniqueBrands);
  }, []);

  const handleBrandClick = (brand) => {
    // Navigate to cars page with brand filter
    navigate(`/cars?brand=${encodeURIComponent(brand)}`);
  };

  return (
    <div>
      <HeroSection />
      <FeaturedCars featuredCars={featuredCars} />
      <EVsection />
      <PopularBrands brands={brands} onBrandClick={handleBrandClick} />
      <VideoSection />
      {/*<BlogSection />*/}
      <WhyChooseUs />
  
    </div>
  );
};

export default Home;