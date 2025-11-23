import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { carService } from '../services/carService';
import carsData from '../data/cars.json';
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
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const uploadCarsToFirebase = async () => {
    if (isUploading) return;
    
    setIsUploading(true);
    setUploadStatus('Starting upload...');
    
    try {
      // Check if collection already has data
      const existingCars = await getDocs(collection(db, 'cars'));
      if (existingCars.size > 0) {
        setUploadStatus(`Warning: Collection already has ${existingCars.size} documents. Upload cancelled.`);
        setIsUploading(false);
        return;
      }

      let successCount = 0;
      const totalCars = carsData.length;
      
      setUploadStatus(`Uploading 0/${totalCars} cars...`);

      // Upload each car
      for (const car of carsData) {
        await addDoc(collection(db, 'cars'), {
          ...car,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        successCount++;
        
        if (successCount % 10 === 0) {
          setUploadStatus(`Uploading ${successCount}/${totalCars} cars...`);
        }
      }

      setUploadStatus(`✅ Successfully uploaded ${successCount} cars!`);
    } catch (error) {
      console.error('Error uploading cars:', error);
      setUploadStatus(`❌ Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

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
      {/* Temporary Upload Button */}
      <div className="fixed top-20 right-4 z-50 bg-background border border-border rounded-lg p-4 shadow-lg max-w-xs">
        <button
          onClick={uploadCarsToFirebase}
          disabled={isUploading}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-semibold mb-2"
        >
          {isUploading ? 'Uploading...' : 'Upload Cars to Firebase'}
        </button>
        {uploadStatus && (
          <p className="text-sm text-muted-foreground mt-2">{uploadStatus}</p>
        )}
      </div>

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
