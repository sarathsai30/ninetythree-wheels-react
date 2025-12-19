
import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCars } from '../utils/carDataUtils';
import HeroSection from '../components/HeroSection';
import FeaturedCars from '../components/FeaturedCars';
import PopularBrands from '../components/PopularBrands';
const VideoSection = React.lazy(() => import('../components/VideoSection'));
import BlogSection from '../components/BlogSection';
import WhyChooseUs from '../components/WhyChooseUs';
import ChatBot from '../components/ChatBot';
import PageLoader from '../components/PageLoader';

const Home = () => {
    const [featuredCars, setFeaturedCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            const carsData = getAllCars();
            // Filter cars to only show main variants (car001, car002, etc.) - not sub-variants
            const mainVariantCars = carsData.filter(car => /^\D+\d+$/.test(car.id));
            // Get featured cars (first 3 main variants)
            setFeaturedCars(mainVariantCars.slice(0, 8));

            // Get unique brands
            const uniqueBrands = [...new Set(carsData.map(car => car.brand))];
            setBrands(uniqueBrands);

            // Show loader for at least 1.5 seconds
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        };
        loadData();
    }, []);

    const handleBrandClick = (brand) => {
        // Navigate to cars page with brand filter
        navigate(`/cars?brand=${encodeURIComponent(brand)}`);
    };

    const handleCarSearch = (searchTerm) => {
        setIsSearching(true);

        const carsData = getAllCars();
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

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <div>
            <HeroSection />
            <FeaturedCars
                featuredCars={isSearching ? searchResults : featuredCars}
                title={isSearching ? "Search Results" : "Featured Cars"}
            />
            <PopularBrands brands={brands} onBrandClick={handleBrandClick} />
            <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading videos...</div>}>
                <VideoSection />
            </Suspense>
            {/*<BlogSection />*/}
            <WhyChooseUs />
            <ChatBot onCarSearch={handleCarSearch} />
        </div>
    );
};

export default Home;