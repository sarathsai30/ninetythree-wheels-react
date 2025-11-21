import React, { useState, useEffect, useCallback } from 'react';

// Reusable Carousel Component
const CarouselSection = ({ 
  title, 
  items,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [itemsPerView, setItemsPerView] = useState(5);

  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 5;
    const width = window.innerWidth;
    if (width < 640) return 2; // mobile
    if (width < 1024) return 3; // tablet
    if (width < 1280) return 4; // small desktop
    return 5; // large desktop
  };

  // Update items per view on resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle swipe gestures for this carousel
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Navigation functions for this specific carousel
  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Get visible items for current slide of this carousel
  const getVisibleItems = () => {
    const visibleItems = [];
    for (let i = 0; i < itemsPerView; i++) {
      const index = (currentSlide + i) % items.length;
      visibleItems.push(items[index]);
    }
    return visibleItems;
  };

  const handleNavigation = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="mb-8 sm:mb-12 lg:mb-16">
      <div className="flex items-center justify-center mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 text-center px-4">
            {title}
          </h2>
        </div>
      <div className={`rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-6 lg:p-8 bg-gray-50`}>
              
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-2 sm:-left-3 lg:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1.5 sm:p-2 lg:p-3 shadow-md sm:shadow-lg hover:bg-gray-100 transition transform hover:scale-105 sm:hover:scale-110"
            aria-label="Previous slide"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute -right-2 sm:-right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1.5 sm:p-2 lg:p-3 shadow-md sm:shadow-lg hover:bg-gray-100 transition transform hover:scale-105 sm:hover:scale-110"
            aria-label="Next slide"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Container */}
          <div 
            className="overflow-hidden mx-2 sm:mx-4 lg:mx-6"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex gap-2 sm:gap-4 lg:gap-6 transition-transform duration-500 ease-in-out">
              {visibleItems.map((item, index) => (
                <div
                  key={`${item.id}-${currentSlide}-${index}`}
                  className="flex-shrink-0 flex flex-col items-center"
                  style={{ 
                    width: `calc(${100 / itemsPerView}% - ${(8 * (itemsPerView - 1)) / itemsPerView}px)`
                  }}
                >
                  <div 
                    className="bg-white rounded-md sm:rounded-lg lg:rounded-xl shadow-sm sm:shadow-md overflow-hidden hover:shadow-lg lg:hover:shadow-xl transition-all duration-300 cursor-pointer group w-full"
                    onClick={() => handleNavigation(item.amazonLink)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-1.5 sm:mt-2 lg:mt-3 text-center w-full px-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gradient overlays for better visibility */}
          <div className="absolute left-0 top-0 bottom-0 w-3 sm:w-6 lg:w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-3 sm:w-6 lg:w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-4 sm:mt-5 lg:mt-6 space-x-1.5 sm:space-x-2">
          {Array.from({ length: items.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full transition ${
                index === currentSlide 
                  ? 'bg-blue-600 scale-100 sm:scale-110 lg:scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>          
      </div>
    </div>
  );
};

// Vehicle Types Buttons Grid Section Component
const VehicleTypesGrid = () => {
  const vehicleTypes = [
    { 
      id: 1, 
      name: 'VEHICLES', 
      amazonLink: 'https://amazon.com/dp/VEHICLES1'
    },
    { 
      id: 2, 
      name: 'PETROL VEHICLES', 
      amazonLink: 'https://amazon.com/dp/PETROL1'
    },
    { 
      id: 3, 
      name: 'ELECTRIC VEHICLES', 
      amazonLink: 'https://amazon.com/dp/ELECTRIC1'
    },
    { 
      id: 4, 
      name: 'PERFORMANCE MOTORCYCLES', 
      amazonLink: 'https://amazon.com/dp/MOTORCYCLES1'
    }
  ];

  const handleNavigation = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mb-8 sm:mb-12 lg:mb-16">
      <div className="flex items-center justify-center mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 text-center px-4">
            Vehicle Types
          </h2>
        </div>
      <div className="rounded-lg sm:rounded-xl lg:rounded-2xl p-3 sm:p-6 lg:p-8 bg-gray-50">
                
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {vehicleTypes.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => handleNavigation(vehicle.amazonLink)}
              className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="text-center">
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 uppercase tracking-wide group-hover:text-blue-600 transition-colors duration-200">
                  {vehicle.name}
                </h3>                
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function CarBikeAccessories() {
  const [filter, setFilter] = useState('all');

  const carouselItems = [
    { 
      id: 1, 
      name: '90% OFF', 
      image: '/Sale/90.webp',
      amazonLink: 'https://amazon.com/dp/EXAMPLE1'
    },
    { 
      id: 2, 
      name: '80% OFF', 
      image: '/Sale/80.webp',
      amazonLink: 'https://amazon.com/dp/EXAMPLE2'
    },
    { 
      id: 3, 
      name: '70% OFF', 
      image: '/Sale/70.webp',
      amazonLink: 'https://amazon.com/dp/EXAMPLE3'
    },
    { 
      id: 4, 
      name: '60% OFF', 
      image: '/Sale/60.webp',
      amazonLink: 'https://amazon.com/dp/EXAMPLE4'
    },
    { 
      id: 5, 
      name: '50% OFF', 
      image: '/Sale/50.webp',
      amazonLink: 'https://amazon.com/dp/EXAMPLE5'
    },
  ];

  const accessories = [
    { id: 1, name: 'Car Phone Holder', image: '/Affiliate/All Products/car phone holder.webp', amazonLink: 'https://amazon.com/dp/EXAMPLE1', category: 'car' },
    { id: 2, name: 'Bike Helmet', image: '/Affiliate/Vehicle Categories/helmets.webp', amazonLink: 'https://amazon.com/dp/EXAMPLE2', category: 'bike' },
    { id: 3, name: 'Car Seat Covers', image: '/Affiliate/Interior Accessories/Car_Covers.webp', amazonLink: 'https://amazon.com/dp/EXAMPLE3', category: 'car' },
    { id: 4, name: 'Bike Phone Mount', image: '/Affiliate/All Products/bike phone mount.webp', amazonLink: 'https://amazon.com/dp/EXAMPLE4', category: 'bike' },
    { id: 5, name: 'Car Dash Cam', image: '/Affiliate/All Products/car dash cam.webp', amazonLink: 'https://amazon.com/dp/EXAMPLE5', category: 'car' },
    { id: 6, name: 'Bike Lock', image: '/Affiliate/All Products/bike lock.webp', amazonLink: 'https://amazon.com/dp/EXAMPLE6', category: 'bike' }
  ];

  // New sections data based on the images
  const interiorAccessories = [
    { id: 1, name: 'Car Cover', image: '/Affiliate/Interior Accessories/Car_Covers.webp', amazonLink: 'https://amazon.com/dp/INT1' },
    { id: 2, name: 'Car Mats', image: '/Affiliate/Interior Accessories/car_mats.webp', amazonLink: 'https://amazon.com/dp/INT2' },
    { id: 3, name: 'Car Pillows', image: '/Affiliate/Interior Accessories/car_pillows.webp', amazonLink: 'https://amazon.com/dp/INT3' },
    { id: 4, name: 'Seat Covers', image: '/Affiliate/Interior Accessories/Car_Seat_Covers.webp', amazonLink: 'https://amazon.com/dp/INT4' },
    { id: 5, name: 'Organizers', image: '/Affiliate/Interior Accessories/Organizers.webp', amazonLink: 'https://amazon.com/dp/INT5' },
    { id: 6, name: 'Dashboard Accessories', image: '/Affiliate/Interior Accessories/Car_Dashboard_Accessories.webp', amazonLink: 'https://amazon.com/dp/INT6' }
  ];

  const cleaningAccessories = [
    { id: 1, name: 'Wiper Blades', image: '/Affiliate/Cleaning Accessories/wiper_blades.webp', amazonLink: 'https://amazon.com/dp/CLEAN1' },
    { id: 2, name: 'Microfibre Cloth', image: '/Affiliate/Cleaning Accessories/micro_fiber_cloth.webp', amazonLink: 'https://amazon.com/dp/CLEAN2' },
    { id: 3, name: 'Duster', image: '/Affiliate/Cleaning Accessories/duster.webp', amazonLink: 'https://amazon.com/dp/CLEAN3' },
    { id: 4, name: 'Shampoos, Wax & Polish', image: '/Affiliate/Cleaning Accessories/shampoos,wax&polish.webp', amazonLink: 'https://amazon.com/dp/CLEAN4' },
    { id: 5, name: 'Dashboard Cleaners', image: '/Affiliate/Cleaning Accessories/Dashboard_cleaners.webp', amazonLink: 'https://amazon.com/dp/CLEAN5' },
    { id: 6, name: 'Lights', image: '/Affiliate/Cleaning Accessories/lights.webp', amazonLink: 'https://amazon.com/dp/CLEAN6' },
    { id: 7, name: 'Cleaning Kits', image: '/Affiliate/Cleaning Accessories/cleaning_kits.webp', amazonLink: 'https://amazon.com/dp/CLEAN7' }
  ];

  const vehicleCategories = [
    { id: 1, name: 'Helmets', image: '/Affiliate/Vehicle Categories/helmets.webp', amazonLink: 'https://amazon.com/dp/CAT1' },
    { id: 2, name: 'Electric Vehicles', image: '/Affiliate/Vehicle Categories/electric vehicles.webp', amazonLink: 'https://amazon.com/dp/CAT2' },
    { id: 3, name: 'Petrol Vehicles', image: '/Affiliate/Vehicle Categories/petrol vehicles.webp', amazonLink: 'https://amazon.com/dp/CAT3' },
    { id: 4, name: 'Vehicle Tools & Appliances', image: '/Affiliate/Vehicle Categories/vehicle tools & appliances.webp', amazonLink: 'https://amazon.com/dp/CAT4' },
    { id: 5, name: 'Connected Mobility', image: '/Affiliate/Vehicle Categories/connected mobility.webp', amazonLink: 'https://amazon.com/dp/CAT5' },
    { id: 6, name: 'Car & Bike Accessories', image: '/Affiliate/Vehicle Categories/car & bike accessories.webp', amazonLink: 'https://amazon.com/dp/CAT6' },
    { id: 7, name: 'Vehicle Care', image: '/Affiliate/Vehicle Categories/vehicle care.webp', amazonLink: 'https://amazon.com/dp/CAT7' },
    { id: 8, name: 'Vehicle Parts', image: '/Affiliate/Vehicle Categories/vehicle parts.webp', amazonLink: 'https://amazon.com/dp/CAT8' },
    { id: 9, name: 'Car & Bike Tyres', image: '/Affiliate/Vehicle Categories/car & bike tyres.webp', amazonLink: 'https://amazon.com/dp/CAT9' }
  ];

  const filteredItems = accessories.filter(item => filter === 'all' || item.category === filter);

  const handleNavigation = (link) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
          Browse Car & Bike Accessories
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Find the right gear for your ride. Tap any item to jump to Amazon.
        </p>
      </div>

      {/* Discount Offers Carousel */}
      <CarouselSection
        title="Discount Offers Products"
        items={carouselItems}
      />

      {/* Vehicle Types Buttons Grid Section */}
      <VehicleTypesGrid />

      {/* Interior Accessories Carousel */}
      <CarouselSection
        title="Interior Accessories"
        items={interiorAccessories}
      />

      {/* Cleaning Accessories Carousel */}
      <CarouselSection
        title="Cleaning Accessories"
        items={cleaningAccessories}
      />

      {/* Vehicle Categories Carousel */}
      <CarouselSection
        title="Vehicle Categories"
        items={vehicleCategories}
      />

      {/* Filter Buttons */}
      <div className="flex justify-center mb-8 sm:mb-10">
        <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold shadow transition ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setFilter('car')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold shadow transition ${
              filter === 'car' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Car Accessories
          </button>
          <button
            onClick={() => setFilter('bike')}
            className={`px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold shadow transition ${
              filter === 'bike' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Bike Accessories
          </button>
        </div>
      </div>

      {/* Products Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
  {filteredItems.map(product => (
    <div
      key={product.id}
      className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl sm:hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col"
    >
      {/* Image Container - Flexible for full image display */}
      <div className="relative flex items-center justify-center bg-gray-100 min-h-[166px]">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full w-auto h-auto object-contain"
        />
        <span
          className={`absolute top-2 sm:top-3 right-2 sm:right-3 px-2 sm:px-3 py-1 text-xs font-bold rounded-full shadow text-white ${
            product.category === 'car' ? 'bg-blue-600' : 'bg-green-600'
          }`}
        >
          {product.category === 'car' ? 'Car' : 'Bike'}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2 flex-1">
          {product.name}
        </h3>

        <button
          onClick={() => handleNavigation(product.amazonLink)}
          className="w-full py-2 sm:py-3 bg-yellow-400 hover:bg-yellow-500 font-semibold text-gray-900 rounded-lg sm:rounded-lg shadow flex items-center justify-center gap-2 transition text-sm sm:text-base mt-auto"
        >
          Buy Now
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </button>              
      </div>
    </div>
  ))}
</div>
    </div>
  );
}