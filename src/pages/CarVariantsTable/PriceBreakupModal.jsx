import React, { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CityIcons = {
  Mumbai: (
    <img
      src="/Landmarks/mumbai.png"
      alt="Gateway of India, Mumbai"
      title="Gateway of India"
      className="w-10 h-10"
    />
  ),
  Bengaluru: (
    <img
      src="/Landmarks/bangalore.png"
      alt="Vidhana Soudha, Bangalore"
      title="Vidhana Soudha"
      className="w-10 h-10"
    />
  ),
  Delhi: (
    <img
      src="/Landmarks/delhi.png"
      alt="India Gate, Delhi"
      title="India Gate"
      className="w-10 h-10"
    />
  ),
  Pune: (
    <img
      src="/Landmarks/pune.png"
      alt="Shaniwar Wada, Pune"
      title="Shaniwar Wada"
      className="w-10 h-10"
    />
  ),
  'Navi Mumbai': (
    <img
      src="/Landmarks/navi-mumbai.png"
      alt="Navi Mumbai"
      title="Navi Mumbai"
      className="w-10 h-10"
    />
  ),
  Hyderabad: (
    <img
      src="/Landmarks/hyderabad.png"
      alt="Charminar, Hyderabad"
      title="Charminar"
      className="w-10 h-10"
    />
  ),
  Chennai: (
    <img
      src="/Landmarks/chennai.png"
      alt="Fort St. George, Chennai"
      title="Fort St. George"
      className="w-10 h-10"
    />
  ),
  Kolkata: (
    <img
      src="/Landmarks/kolkata.png"
      alt="Victoria Memorial, Kolkata"
      title="Victoria Memorial"
      className="w-10 h-10"
    />
  ),
  Chandigarh: (
    <img
      src="/Landmarks/chandigarh.png"
      alt="Chandigarh"
      title="Chandigarh"
      className="w-10 h-10"
    />
  ),
  Ahmedabad: (
    <img
      src="/Landmarks/ahmedabad.png"
      alt="Ahmedabad"
      title="Ahmedabad"
      className="w-10 h-10"
    />
  ),
};

const popularCities = [
  { name: 'Mumbai', pincode: '400001', state: 'Maharashtra' },
  { name: 'Bengaluru', pincode: '560001', state: 'Karnataka' },
  { name: 'Delhi', pincode: '110001', state: 'Delhi' },
  { name: 'Pune', pincode: '411001', state: 'Maharashtra' },
  { name: 'Navi Mumbai', pincode: '400706', state: 'Maharashtra' },
  { name: 'Hyderabad', pincode: '500001', state: 'Telangana' },
  { name: 'Ahmedabad', pincode: '380001', state: 'Gujarat' },
  { name: 'Chennai', pincode: '600001', state: 'Tamil Nadu' },
  { name: 'Kolkata', pincode: '700001', state: 'West Bengal' },
  { name: 'Chandigarh', pincode: '160017', state: 'Chandigarh' },
];

const PriceBreakupModal = ({ carId, variant, onClose, onConfirmCity }) => {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState({ name: 'Bengaluru' });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Cache for API responses
  const cache = useRef(new Map());
  const debounceTimer = useRef(null);

  if (!variant) return null;

  // Clean office name function
  const cleanOfficeName = useCallback((name) => {
    if (!name) return '';
    return name.replace(/(S\.O|B\.O|P\.O)/gi, '').trim();
  }, []);

  // Search by pincode API
  const searchByPincode = async (pincode) => {
    const cacheKey = `pincode-${pincode}`;
    
    if (cache.current.has(cacheKey)) {
      return cache.current.get(cacheKey);
    }

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();
      
      if (data[0]?.Status === 'Success' && data[0]?.PostOffice) {
        const formatted = data[0].PostOffice.map((office) => ({
          pincode: office.Pincode,
          officename: office.Name,
          district: office.District,
          statename: office.State,
          regionname: office.Region,
          circle: office.Circle
        }));
        
        cache.current.set(cacheKey, formatted);
        return formatted;
      }
    } catch (error) {
      console.error('Error fetching pincode data:', error);
    }
    
    return [];
  };

  // Search by city/district name API
  const searchByCity = async (cityName) => {
    const cacheKey = `city-${cityName.toLowerCase()}`;
    
    if (cache.current.has(cacheKey)) {
      return cache.current.get(cacheKey);
    }

    try {
      const response = await fetch(`https://api.postalpincode.in/postoffice/${cityName}`);
      const data = await response.json();
      
      if (data[0]?.Status === 'Success' && data[0]?.PostOffice) {
        const formatted = data[0].PostOffice.map((office) => ({
          pincode: office.Pincode,
          officename: office.Name,
          district: office.District,
          statename: office.State,
          regionname: office.Region,
          circle: office.Circle
        }));
        
        cache.current.set(cacheKey, formatted);
        return formatted;
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
    
    return [];
  };

  // Perform search
  const performSearch = useCallback(async (searchQuery) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    console.log("Searching for:", searchQuery);

    try {
      let results = [];
      
      // Check if query is a pincode (all digits)
      if (/^\d+$/.test(searchQuery)) {
        results = await searchByPincode(searchQuery);
      } else {
        results = await searchByCity(searchQuery);
      }
      
      setSuggestions(results.slice(0, 10)); // Limit to 10 results
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to fetch location data');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    if (query.trim()) {
      debounceTimer.current = setTimeout(() => {
        performSearch(query.trim());
      }, 300); // 300ms debounce
    } else {
      setSuggestions([]);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, performSearch]);

  const handleSuggestionClick = (office) => {
    const city = { 
      name: office.officename, 
      pincode: office.pincode,
      district: office.district,
      statename: office.statename
    };
    setSelectedCity(city);
    setQuery(`${office.pincode} - ${office.district} - ${office.statename}`);
    setSuggestions([]);
  };

  const handleDetect = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation not supported');
      return;
    }

    toast.loading('Detecting your location...');
    
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
          );
          const data = await res.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.district;
          const pincode = data.address.postcode || '';

          console.log("Found city:", city, "Pincode:", pincode);

          // Try to search by pincode first
          let matchedOffices = [];
          if (pincode) {
            matchedOffices = await searchByPincode(pincode);
          }
          
          // If no pincode results, try by city name
          if (!matchedOffices.length && city) {
            matchedOffices = await searchByCity(city);
          }

          if (matchedOffices.length > 0) {
            const matched = matchedOffices[0];
            setQuery(matched.officename || matched.district || matched.pincode);
            setSelectedCity(matched);
            toast.success(
              `Detected: ${cleanOfficeName(matched.officename)}, ${matched.district}`
            );
          } else {
            // Create a basic city object from geolocation data
            const detected = { 
              name: city || 'Unknown', 
              pincode,
              statename: data.address.state || 'Unknown State'
            };
            setQuery(detected.name);
            setSelectedCity(detected);
            toast.info(`Detected: ${detected.name}`);
          }
        } catch (err) {
          console.error(err);
          toast.error('Unable to detect city');
        } finally {
          toast.dismiss();
        }
      },
      (error) => {
        toast.dismiss();
        toast.error('Unable to retrieve location');
        console.error('Geolocation error:', error);
      }
    );
  };

  const handleSelect = (city) => {
    setSelectedCity(city);
    setQuery(city.name);
  };

  const handleDeselect = () => {
    setSelectedCity(null);
    setQuery('');
  };

// Helper function to get state from city name
const getStateFromCityName = (cityName) => {
  const cityStateMap = {
    'Mumbai': 'Maharashtra',
    'Bengaluru': 'Karnataka',
    'Bangalore': 'Karnataka',
    'Delhi': 'Delhi', 
    'Pune': 'Maharashtra',
    'Navi Mumbai': 'Maharashtra',
    'Hyderabad': 'Telangana',
    'Ahmedabad': 'Gujarat',
    'Chennai': 'Tamil Nadu',
    'Kolkata': 'West Bengal',
    'Chandigarh': 'Chandigarh'
  };
  
  return cityStateMap[cityName] || null;
};

const handleConfirm = () => {
  if (!selectedCity) {
    toast.error('Please select a city first');
    return;
  }

  console.log("Selected City for confirmation:", selectedCity);
  
  // Get state name - priority: API statename > city mapping > unknown
  let stateName = selectedCity.statename || 
                  getStateFromCityName(selectedCity.name) || 
                  'Unknown State';
  
  // Validate state name
  if (stateName === 'Unknown State') {
    toast.error('Unable to determine state. Please try selecting a different city.');
    return;
  }
  
  // Format for URL
  const stateLower = stateName.toLowerCase();
  
  // Call callback and navigate
  onConfirmCity(stateName);
  navigate(`/on-road-price/${stateLower}`, {
    state: { 
      carId, 
      city: selectedCity.name, 
      state: stateName,
      variant 
    },
  });

  onClose();
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Select your City</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full px-6 pt-4 pb-2">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
            <svg
              className="w-5 h-5 text-gray-400 mr-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            {selectedCity ? (
              <span className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                {cleanOfficeName(selectedCity.officename || selectedCity.name)}
                <button
                  onClick={handleDeselect}
                  className="ml-1 text-gray-600 hover:text-red-500"
                >
                  ✕
                </button>
              </span>
            ) : (
              <input
                type="text"
                placeholder="Type your Pincode or City"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
                disabled={loading}
              />
            )}
            
            {/* Loading spinner */}
            {loading && !selectedCity && (
              <div className="ml-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={handleDetect}
              className="flex items-center text-blue-600 text-sm hover:underline disabled:opacity-50"
              disabled={loading}
            >
              <svg
                className="w-5 h-5 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
              </svg>
              Detect my location
            </button>

            {/* Confirm button aligned right */}
            {selectedCity && (
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md shadow hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
        <hr className="border-gray-200" />

        {/* Suggestions or Popular Cities Grid */}
        <div className="px-6 py-4">
          {/* Show Suggestions if available */}
          {!selectedCity && suggestions.length > 0 ? (
            <div className="max-h-60 overflow-y-auto">
              {suggestions.map((s, idx) => (
                <div
                  key={`${s.pincode}-${idx}`}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm border-b last:border-b-0"
                >
                  <div className="font-medium">{s.pincode}</div>
                  <div className="text-gray-600">
                    {cleanOfficeName(s.officename)}, {s.district}, {s.statename}
                  </div>
                </div>
              ))}
            </div>
          ) : !selectedCity && query.length >= 3 && !loading ? (
            <div className="text-center py-4 text-gray-500">
              No locations found. Try a different search.
            </div>
          ) : (
            <>
              <h3 className="text-gray-700 font-medium mb-4">Popular Cities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {popularCities.map((city) => (
                  <div
                    key={city.pincode}
                    onClick={() => handleSelect(city)}
                    className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div className="w-14 h-14 flex items-center justify-center border rounded-full bg-gray-50 mb-2">
                      {CityIcons[city.name]}
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {city.name}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceBreakupModal;