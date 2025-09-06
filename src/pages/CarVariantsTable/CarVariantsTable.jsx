import React, { useState, useMemo } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postOffices from "../../data/pincode.json";

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
  "Navi Mumbai": (
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


const PriceBreakupModal = ({ carId, variant, onClose, onConfirmCity }) => {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState({ name: "Bengaluru" });
  const [selectedStateName, setSelectedStateName] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();


  const popularCities = [
    { name: 'Mumbai', pincode: '400001' },
    { name: 'Bengaluru', pincode: '560001' },
    { name: 'Delhi', pincode: '110001' },
    { name: 'Pune', pincode: '411001' },
    { name: "Navi Mumbai", pincode: "400706" },
    { name: 'Hyderabad', pincode: '500001' },
    { name: "Ahmedabad", pincode: "380001" },
    { name: 'Chennai', pincode: '600001' },
    { name: 'Kolkata', pincode: '700001' },
    { name: "Chandigarh", pincode: "160017" },
  ];

  if (!variant) return null;

// triggers query after 3rd letter then matches with json data

  useEffect(() => {
    console.log("Query changed:", query);
    if (query.length >= 3) {
      const lower = query.toLowerCase();
      // case-insensitive search for pincode OR officename/district
      const matches = postOffices.filter(
        (o) =>
          o.pincode.startsWith(query) || // match numbers
          o.district.toLowerCase().startsWith(lower) || // match city/district
          o.officename.toLowerCase().startsWith(lower) // match office name
      );
      setSuggestions(matches); // limit to 6
    } else {
      setSuggestions([]);
    }
  }, [query]);

// giving seuggestons to select based on matching
  const handleSuggestionClick = (office) => {
    const city = { name: office.officename, pincode: office.pincode };
    const state = { name: office.statename };
    setSelectedCity(city);
    setSelectedStateName(state);
    setQuery(`${office.pincode} - ${office.district} - ${office.statename}`);
    console.log("office name in set query : ", office.statename);
    setSuggestions([]);
  };

// clearing the S.O, P.O, in offices name
  const cleanOfficeName = (name) => {
    if (!name) return "cleaning office name is empty"; // fallback so it never crashes
      return name.replace(/(S\.O|B\.O|P\.O)/gi, "").trim();
  };

// when user clicks on the detect location
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

          // Try to match with your JSON data
          let matched = postOffices.find(
            (entry) =>
              entry.pincode === pincode ||
              entry.district?.toLowerCase() === city?.toLowerCase()
          );

          if (matched) {
            setQuery(matched.officename || matched.district || matched.pincode);
            setSelectedCity(matched);
            console.log("office name:" + matched.officename);
            console.log("state name:" + matched.statename);

            toast.success(
              `Detected: ${cleanOfficeName(matched.officename)}, ${matched.district}`
            );
          } else {
            // fallback to just using the API data
            const detected = { name: city || "Unknown", pincode };
            setQuery(detected.name);
            setSelectedCity(detected);

            toast.info(`Detected (not matched): ${detected.name}`);
          }
        } catch (err) {
          console.error(err);
          toast.error("Unable to detect city");
        }
      },
      () => toast.error("Unable to retrieve location")
    );
  };

// when user wants to select the city
  const handleSelect = (city) => {
    setSelectedCity(city);
    setQuery(city.name);
  };

// when user wants to deselect the city
  const handleDeselect = () => {
    setSelectedCity(null);
    setQuery("");
  };

// when user clicks on the confirm button
  const handleConfirm = () => {
  if (selectedCity) {
    const city = selectedCity.name || selectedCity.statename;
    console.log("Selected City:", selectedCity);

    // Normalize city name (remove S.O / B.O / P.O)
    const cityName = city
      ?.replace(/(S\.O|B\.O|P\.O)/gi, "")
      .trim()
      .toLowerCase();

    // Find exact match in JSON
    let matchedOffice = postOffices.find(
      (office) =>
        office.officename
          ?.replace(/(S\.O|B\.O|P\.O)/gi, "")
          .trim()
          .toLowerCase() === cityName
    );

    // Fallback: partial match if exact not found
    if (!matchedOffice) {
      matchedOffice = postOffices.find((office) =>
        office.regionname
          ?.replace(/region/gi, "")
          .trim()
          .toLowerCase()
          .includes(cityName)
      );
    }

    if (matchedOffice) {
      console.log("Matched statename:", matchedOffice.statename);
      onConfirmCity(matchedOffice.statename);
      let state_lower = matchedOffice.statename
        .toLowerCase();
      navigate(`/on-road-price/${state_lower}`, {
        state: { carId, city: matchedOffice.statename, variant },
      });
    } else {
      console.log("Else Part because this is object printing statname:", selectedCity.statename);
      onConfirmCity(selectedCity.statename);
      console.log("statename in else: ",selectedCity.statename);
      let state_lower = selectedCity.statename
        .toLowerCase();
      navigate(`/on-road-price/${state_lower}`, {
        state: { carId, city: selectedCity.statename, variant },
      });
    }

    onClose();
  }
  else{
    console.log("else part selected City Statename: ", selectedCity.stateName);
    onConfirmCity(selectedCity.stateName);
    let state_lower = matchedOffice.statename
        .toLowerCase();
    navigate(`/on-road-price/${state_lower}`, {
      state: { carId, city: selectedCity.statename, variant },
    });
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
            {/* Show Suggestions if available, otherwise show Popular Cities */}
            {!selectedCity && suggestions.length > 0 ? (
              <div className="max-h-60 overflow-y-auto">
                {suggestions.map((s, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSuggestionClick(s)}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm border-b last:border-b-0"
                  >
                    <div className="font-medium">{s.pincode}</div>
                    <div className="text-gray-600">
                      {cleanOfficeName(s.officename)}, {s.district}
                    </div>
                  </div>
                ))}
              </div>

            ) : (
              <>
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
              </>
            )}
          </div>        
        </div>
        <Toaster position="top-right" />
      </div>
  );
};

{/* Price View Breakup Ending */}





{/* Filtering Table Based on Car Variant Starting */}


const FilterButton = ({ children, selected, onClick, onConfirmCity }) => (
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

 //Filter Button of Fuel Type & Transmission

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

const CarVariantsTable = ({ variants = [], currentId, onCitySelect, onModelVariant }) => {
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [modalVariant, setModalVariant] = useState(null); {/* view price breakup modal */}

  const getCompositeKey = (v) => `${v.id}-${v.model}-${v.fuelType}`;

  console.log("variants : ",variants);
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
  const handleModalConfirm = (city) => {
    if (onCitySelect) {
      onCitySelect(city); // send city to parent
      onModelVariant(modalVariant);
    }
  };

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
          
        </div>
      )}
      {modalVariant && ( <PriceBreakupModal variant={modalVariant} carId={currentId} onClose={() => setModalVariant(null)} onConfirmCity={handleModalConfirm} /> )}
    </div>
  );
};

{/* Filtering Table Based on Car Variant Ending */}

export default CarVariantsTable;

