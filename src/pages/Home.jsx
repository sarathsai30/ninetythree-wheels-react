
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { carService } from '../services/carService';
import ModernHeroSection from '../components/ModernHeroSection';
import ModernFeaturedCars from '../components/ModernFeaturedCars';
import PopularBrands from '../components/PopularBrands';
import VideoSection from '../components/VideoSection';
import BlogSection from '../components/BlogSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ParkingChecker from '../components/ParkingChecker';
import PageLoader from '../components/PageLoader';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch cars from Firebase
        const cars = await carService.getCars();
        
        // Filter cars to only show main variants (car001, car002, etc.) - not sub-variants
        const mainVariantCars = cars.filter(car => /^\D+\d+$/.test(car.id));
        // Get featured cars (first 8 main variants)
        setFeaturedCars(mainVariantCars.slice(0, 8));
        
        // Get unique brands
        const uniqueBrands = await carService.getBrands();
        setBrands(uniqueBrands);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        // Show loader for at least 1.5 seconds
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };
    
    loadData();
  }, []);

  const handleBrandClick = (brand) => {
    // Navigate to cars page with brand filter
    navigate(`/cars?brand=${encodeURIComponent(brand)}`);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <ModernHeroSection />
      <ModernFeaturedCars featuredCars={featuredCars} />
      <PopularBrands brands={brands} onBrandClick={handleBrandClick} />
      <VideoSection />
      <ParkingChecker />
      {/*<BlogSection />*/}
      <WhyChooseUs />
    </div>
  );
};

export default Home;
