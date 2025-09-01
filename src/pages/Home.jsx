
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import carsData from '../data/cars.json';
import HeroSection from '../components/HeroSection';
import FeaturedCars from '../components/FeaturedCars';
import PopularBrands from '../components/PopularBrands';
import VideoSection from '../components/VideoSection';
import BlogSection from '../components/BlogSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ParkingChecker from '../components/ParkingChecker';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [brands, setBrands] = useState([]);
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

  return (
    <div>
      <HeroSection />
      <FeaturedCars featuredCars={featuredCars} />
      <PopularBrands brands={brands} onBrandClick={handleBrandClick} />
      <VideoSection />
      <ParkingChecker />
      {/*<BlogSection />*/}
      <WhyChooseUs />
    </div>
  );
};

export default Home;
