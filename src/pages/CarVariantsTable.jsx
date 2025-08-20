import React, { useState, useMemo } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
{/* Price View Breakup Starting */}

const CityIcons = {
  Mumbai: (
    <img
      src="/Landmarks/mumbai.png"
      alt="Gateway of India, Mumbai"
      title="Gateway of India"
      className="w-10 h-10"
    />
  ),
  Bangalore: (
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
  NaviMumbai: (
    <img
      src="/Landmarks/navi-mumbai.png"
      alt="Charminar, Hyderabad"
      title="Charminar"
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
    <img src="/Landmarks/chandigarh.png" 
    alt="Chandigarh" 
    title="Chandigarh"
    className="w-10 h-10" 
    />
  ),
  Ahmedabad: (
    <img src="/Landmarks/ahmedabad.png" 
    alt="Ahmedabad" 
    title="Ahmedabad"
    className="w-10 h-10" 
    />
  ),
};


const PriceBreakupModal = ({ variant, onClose, onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [detectedCity, setDetectedCity] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  if (!variant) return null;

  const popularCities = [
    { name: 'Mumbai', pincode: '400001' },
    { name: 'Bangalore', pincode: '560001' },
    { name: 'Delhi', pincode: '110001' },
    { name: 'Pune', pincode: '411001' },
    { name: "NaviMumbai", pincode: "400706" },
    { name: 'Hyderabad', pincode: '500001' },
    { name: "Ahmedabad", pincode: "380001" },
    { name: 'Chennai', pincode: '600001' },
    { name: 'Kolkata', pincode: '700001' },
    { name: "Chandigarh", pincode: "160017" },
  ];

const handleDetect = () => {
  if (!navigator.geolocation) {
    toast.error("Geolocation not supported");
    return;
  }

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
        const pincode = data.address.postcode || "";

        const detected = { name: city || "Unknown", pincode };

        setQuery(detected.name);
        setSelectedCity(detected);

        toast.success(`Detected: ${detected.name}`);
      } catch (err) {
        console.error(err);
        toast.error("Unable to detect city");
      }
    },
    () => toast.error("Unable to retrieve location")
  );
};


// when user clicks/detects a city
const handleSelect = (city) => {
  setSelectedCity(city);
  setQuery(city.name);
};

// when user wants to deselect
const handleDeselect = () => {
  setSelectedCity(null);
  setQuery("");
};

const handleConfirm = () => {
  if (selectedCity) {
    onCitySelect(selectedCity);
    onClose();
  }
};


const findCityByQuery = (q) => {
  if (!q) return null;
  const lower = q.toLowerCase().trim();
  return popularCities.find(
    (c) =>
      c.name.toLowerCase() === lower ||
      c.pincode === lower
  ) || null;
};

const handleSearch = async () => {
  if (!query) return;

  try {
    let url;

    if (/^\d{6}$/.test(query.trim())) {
      url = `https://nominatim.openstreetmap.org/search?postalcode=${query.trim()}&countrycodes=IN&format=json&addressdetails=1&limit=1`;
    } else {
      url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
      )}&countrycodes=IN&format=json&addressdetails=1&limit=1`;
    }

    const res = await fetch(url);
    const data = await res.json();

    if (data.length > 0) {
      const result = data[0];
      const cityName =
        result.address.city ||
        result.address.town ||
        result.address.village ||
        result.address.district;
      const pincode = result.address.postcode || "";

      const matchedCity =
        popularCities.find(
          (c) =>
            c.pincode === pincode ||
            c.name.toLowerCase() === (cityName || "").toLowerCase()
        ) || { name: cityName || "Unknown", pincode };

      setSelectedCity(matchedCity);
      setQuery(matchedCity.name);
      toast.success(
        matchedCity.pincode
          ? `Found: ${matchedCity.name} (${matchedCity.pincode})`
          : `Found: ${matchedCity.name}`
      );
    } else {
      toast.error("No city found for that input");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error fetching city");
  }
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
          <div className="px-6 pt-4 pb-2">
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
                  {selectedCity.name}
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
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
                />


              )}
            </div>


            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={handleDetect}
                className="flex items-center text-blue-600 text-sm hover:underline"
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
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md shadow hover:bg-blue-700"
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
          <hr className="border-gray-200" />

          {/* Popular Cities Grid */}
          <div className="px-6 py-10">
            <h3 className="text-gray-700 font-medium mb-4">Popular Cities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {popularCities.map((city) => (
                <div
                  key={city.pincode}
                  onClick={() => handleSelect(city)}
                  className="flex flex-col items-center text-center cursor-pointer"
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
          </div>
                    
        </div>
        <Toaster position="top-right" />
      </div>
  );
};

{/* Price View Breakup Ending */}

const FilterButton = ({ children, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`
      relative min-w-[135px] h-12 px-5 py-2 rounded-lg font-medium text-base transition-colors duration-150
      flex items-center justify-center overflow-hidden
      text-gray-700 bg-white hover:bg-gray-50
    `}
    style={{
      border: '1px solid',
      borderColor: selected ? '#16a34a' : '#ccc', // green or gray
      color: selected ? '#166534' : '#444', // optional: text color match
    }}
  >
    {children}
    {selected && (
      <span
        className="absolute top-0 right-0"
        style={{
          width: 40,
          height: 40,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <svg width="30" height="30" style={{ position: 'absolute', top: 0, right: 0, zIndex: 2 }}>
          <polygon points="0,0 40,40 40,0" fill="#16a34a" />
          <line
            x1="0"
            y1="40"
            x2="40"
            y2="0"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />
        </svg>

        <svg
          width={13}
          height={13}
          viewBox="0 0 20 20"
          fill="none"
          style={{
            position: 'absolute',
            top: 3,
            right: 2,
            zIndex: 3,
          }}
        >
          <polyline
            points="2,9 7,15 18,4"
            stroke="#fff"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    )}
  </button>
);



const ButtonGroup = ({ options, selected, onToggle }) => (
  <div className="flex flex-wrap gap-3">
    {options.map(option => (
      <FilterButton
        key={option}
        selected={selected.includes(option)}
        onClick={() => onToggle(option)}
      >
        {option}
      </FilterButton>
    ))}
  </div>
);

const CarVariantsTable = ({ variants = [], currentId }) => {
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [modalVariant, setModalVariant] = useState(null); {/* view price breakup modal */}

  const getCompositeKey = (v) => `${v.id}-${v.model}-${v.fuelType}`;

  const variantsWithDuplicateFlag = useMemo(() => {
    const seen = new Set();
    return variants.map((v) => {
      const key = getCompositeKey(v);
      const isDuplicate = seen.has(key);
      seen.add(key);
      return { ...v, compositeKey: key, isDuplicate };
    });
  }, [variants]);

  const fuelTypes = useMemo(
    () => [...new Set(variantsWithDuplicateFlag.map((v) => v.fuelType))],
    [variantsWithDuplicateFlag]
  );
  const transmissionTypes = useMemo(
    () => [...new Set(variantsWithDuplicateFlag.map((v) => v.transmission))],
    [variantsWithDuplicateFlag]
  );

  const toggleSelection = (value, arr, setArr) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const filtered = useMemo(
    () =>
      variantsWithDuplicateFlag.filter((v) => {
        const fuelOk = !selectedFuels.length || selectedFuels.includes(v.fuelType);
        const transOk = !selectedTransmissions.length || selectedTransmissions.includes(v.transmission);
        return fuelOk && transOk;
      }),
    [variantsWithDuplicateFlag, selectedFuels, selectedTransmissions]
  );

  const formatPrice = (p) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(p);

  const displayedVariants = showAll ? filtered : filtered.slice(0, 4);

  return (
    <div className="max-w-3xl p-4 bg-white rounded-xl shadow mt-3">
      {/* Filters */}
      <div className="mb-4">
        <div className="flex items-center text-gray-600 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={30}
            height={30}
          >
            <path d="M7 8h34L28 24v12l-8 4V24L7 8z" stroke="currentColor" fill="none" />
          </svg>
          <span className="text-lg font-semibold">Filter By Fuel type &amp; Transmission</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <ButtonGroup
            options={fuelTypes}
            selected={selectedFuels}
            onToggle={(v) => toggleSelection(v, selectedFuels, setSelectedFuels)}
          />
          <ButtonGroup
            options={transmissionTypes}
            selected={selectedTransmissions}
            onToggle={(v) => toggleSelection(v, selectedTransmissions, setSelectedTransmissions)}
          />
        </div>
      </div>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-3 bg-gray-50 border border-gray-200 rounded-t-lg px-4 py-2 text-gray-600 font-medium">
        <div>Variants</div>
        <div className="text-center">Ex-Showroom price</div>
        <div className="text-center">Compare</div>
      </div>

      {/* List */}
      <div className="border border-t-0 border-gray-200 rounded-b-lg divide-y divide-gray-200">
        {displayedVariants.length ? (
          displayedVariants.map((v, i) => (
            <div
              key={`${v.compositeKey}-${i}`}
              className={`relative grid grid-cols-1 md:grid-cols-3 items-center p-4 ${
                v.isDuplicate ? 'bg-yellow-50' : 'bg-white'
              }`}
            >
              {v.id === currentId && (
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                  Current Car
                </span>
              )}
              {/* Variants column */}
              <div>
                <div className="font-semibold text-gray-800">{v.model}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {v.engine}, {v.fuelType}, {v.transmission}, {v.mileage}
                </div>
              </div>
              {/* Price column */}
              <div className="mt-4 md:mt-0 text-base font-semibold text-gray-800 text-center">
                {formatPrice(v.price)}
              </div>
              {/* Compare column */}
              <div className="mt-4 md:mt-0 flex flex-col items-end">
                <label className="flex items-center text-gray-600 text-sm space-x-1">
                  <span>Compare</span>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </label>
                <div className="mt-2 text-sm text-blue-600 space-x-2 font-semibold">
                  <a href="" className="hover:underline" 
                  onClick={(e) => {
                    e.preventDefault();
                    setModalVariant(v);
                    }}>
                    View Price Breakup
                  </a>
                  <span>|</span>
                  <a href="#" className="hover:underline">
                    Get Offers
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">No variants match the selected filters.</div>
        )}
      </div>

      {/* View More */}
      {filtered.length > 4 && (
        <div className="mt-4 text-center">
          <button
            className="inline-flex items-center text-blue-600 hover:underline text-sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View More Variants'}
            <svg
              className={`w-4 h-4 ml-1 transform ${showAll ? 'rotate-270' : 'rotate-90'}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {modalVariant && ( <PriceBreakupModal variant={modalVariant} onClose={() => setModalVariant(null)} /> )}
        </div>
      )}
    </div>
  );
};

export default CarVariantsTable;

