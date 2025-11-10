import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import rtoData from "../../data/RTO.json";
import cars from "../../data/cars.json";
import postOffices from "../../data/pincode.json";
import GetBrouchers from "./GetBrouchers";
import OffersModal from "./OffersModal";
import EMICalculatorModal from "./EMICalculatorModal";

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


const PriceBreakupModal = ({ carId, displayVariant, onClose, onConfirmCity }) => {
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

  if (!displayVariant) return null;

// triggers query after 3rd letter then matches with json data

  useEffect(() => {
    // console.log("Query changed:", query);
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
    // console.log("office name in set query : ", office.statename);
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
            // console.log("office name:" + matched.officename);
            // console.log("state name:" + matched.statename);

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
          // console.error(err);
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
    // console.log("Selected City:", selectedCity);

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
      // console.log("Matched statename:", matchedOffice.statename);
      onConfirmCity(matchedOffice.statename);
      let state_lower = matchedOffice.statename
        .toLowerCase();
      navigate(`/on-road-price/${state_lower}`, {
        state: { carId, city: matchedOffice.statename, displayVariant },
      });
    } else {
      // console.log("Else Part because this is object printing statname:", selectedCity.statename);
      onConfirmCity(selectedCity.statename);
      let state_lower = selectedCity.statename
        .toLowerCase();
      navigate(`/on-road-price/${state_lower}`, {
        state: { carId, city: selectedCity.statename, displayVariant },
      });
    }

    onClose();
  }
  else{
    // console.log("else part selected City Statename: ", selectedCity.stateName);
    onConfirmCity(selectedCity.stateName);
    let state_lower = matchedOffice.statename
        .toLowerCase();
    navigate(`/on-road-price/${state_lower}`, {
      state: { carId, city: selectedCity.statename, displayVariant },
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

const OnRoadPrice = ({ onOffersClick, onEditRegistration, onCitySelect }) => {
  const { statename } = useParams();
  const location = useLocation();
  const { carId, city, variant: initialVariant } = location.state || {};
  
  // State management for variants
  const [displayVariant, setDisplayVariant] = useState(initialVariant);
  const [localCurrentVariantId, setLocalCurrentVariantId] = useState(initialVariant?.id || null);
  const [modalVariant, setModalVariant] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [car, setCar] = useState(null);
  const [modelVariants, setModelVariants] = useState([]);
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [selectedOfferVariant, setSelectedOfferVariant] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(initialVariant);

  const [isEMIModalOpen, setIsEMIModalOpen] = useState(false);

  // Sync with initial variant
  useEffect(() => {
    if (initialVariant) {
      setDisplayVariant(initialVariant);
      setLocalCurrentVariantId(initialVariant.id);
    }
  }, [initialVariant]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  // --- Fetch state data ---
  const stateData = rtoData.find(
    (s) => s.stateName?.toLowerCase() === statename?.toLowerCase()
  );

  if (!stateData || !displayVariant || !selectedVariant) return null;

  const exShowroom = displayVariant.price;
  const fuelType = displayVariant.fuelType;

  const fuelKeyMap = {
    petrol: "petrol",
    diesel: "diesel",
    electric: "ev",
    ev: "ev",
  };
  // Compute On-Road Price per variant
  const computeOnRoadPrice = (variant) => {
    if (!variant) return 0;
    const exShowroom = variant.price;
    const fuelType = variant.fuelType;

    const rtoRule = stateData.rtoRules.find(
      (r) => exShowroom >= r.minPrice && exShowroom <= r.maxPrice
    );
    const rtoPercentage = rtoRule
      ? rtoRule.fuelRates[fuelKeyMap[fuelType?.toLowerCase()] || fuelType?.toLowerCase()] || 0
      : 0;

    const registration = Math.round((exShowroom * rtoPercentage) / 100);
    const insurance = Math.round(
      (exShowroom * (stateData.insurancePercentage || 3)) / 100
    );
    const otherCharges = stateData.otherCharges || 0;

    return exShowroom + registration + insurance + otherCharges;
  };

  // --- getting the RTO Rate based on formula ---
  const getRtoRate = () => {
    const rule = stateData.rtoRules.find(
      (r) => exShowroom >= r.minPrice && exShowroom <= r.maxPrice
    );
    if (!rule) return 0;
    const key = fuelKeyMap[fuelType?.toLowerCase()] || fuelType?.toLowerCase();
    return rule.fuelRates[key] ?? 0;
  };

  const rtoPercentage = getRtoRate();

  const registration = Math.round((exShowroom * rtoPercentage) / 100);
  const insurance = Math.round(
    (exShowroom * (stateData.insurancePercentage || 3)) / 100
  );
  const otherCharges = stateData.otherCharges ?? 0;
  const onRoadPrice = exShowroom + registration + insurance + otherCharges;

  // --- Fetch cars variants which matches cars.json ---
  useEffect(() => {
    if (!carId) return;
    const foundCar = cars.find((c) => c.id === carId);
    if (!foundCar) return;

    const seriesName = foundCar.name.split(" ").slice(0, 2).join(" ");
    const variants = cars.filter(
      (c) => c.brand === foundCar.brand && c.name.startsWith(seriesName)
    );
    setModelVariants(variants);
    setSelectedVariant(initialVariant || variants[0]);
  }, [carId, initialVariant]);

  // --- Variant Table ---

  const getCompositeKey = (v) => `${v.id}-${v.model}-${v.fuelType}`;

  const variantsWithDuplicateFlag = useMemo(() => {
    const seen = new Set();
    return modelVariants.map((v) => {
      const key = getCompositeKey(v);
      const isDuplicate = seen.has(key);
      seen.add(key);
      return { ...v, compositeKey: key, isDuplicate };
    });
  }, [modelVariants]);

  const fuelTypes = useMemo(
    () => [...new Set(variantsWithDuplicateFlag.map((v) => v.fuelType))],
    [variantsWithDuplicateFlag]
  );

  const transmissionTypes = useMemo(
    () => [...new Set(variantsWithDuplicateFlag.map((v) => v.transmission))],
    [variantsWithDuplicateFlag]
  );

  const toggleSelection = (value, arr, setArr) => {
    setArr(
      arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value]
    );
  };

  const filtered = useMemo(
    () =>
      variantsWithDuplicateFlag.filter((v) => {
        const fuelOk =
          !selectedFuels.length || selectedFuels.includes(v.fuelType);
        const transOk =
          !selectedTransmissions.length ||
          selectedTransmissions.includes(v.transmission);
        return fuelOk && transOk;
      }),
    [variantsWithDuplicateFlag, selectedFuels, selectedTransmissions]
  );

  const formatPrice = (p) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(p);

  const displayedVariants = showAll ? filtered : filtered.slice(0, 4);

  // Handle variant selection with immediate visual feedback
  const handleVariantClick = (variant) => {
    console.log("Variant clicked:", variant.id, "Current ID:", localCurrentVariantId);
    
    if (String(variant.id) !== String(localCurrentVariantId)) {
      // Update local state immediately for visual feedback
      setLocalCurrentVariantId(variant.id);
      setDisplayVariant(variant);
    }
  };

  const FilterButton = ({ children, selected, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`min-w-[100px] sm:min-w-[135px] h-12 px-5 py-2 rounded-lg font-medium text-base transition-colors duration-150
        flex items-center justify-center overflow-hidden
        text-gray-700 bg-white hover:bg-gray-50`}
      style={{
        border: "1px solid",
        borderColor: selected ? "#16a34a" : "#ccc",
        color: selected ? "#166534" : "#444",
      }}
    >
      {children}
      {selected && (
        <span
          className="absolute top-0 right-0"
          style={{
            width: 40,
            height: 40,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          <svg
            width="30"
            height="30"
            style={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}
          >
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
            style={{ position: "absolute", top: 3, right: 2, zIndex: 3 }}
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
      {options.map((option) => (
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

  const handleModalConfirm = (city) => {
    if (onCitySelect) {
      onCitySelect(city);
    }
  };

  console.log("car name: ", displayVariant.name);

  return (
    <div className="mx-4 sm:mx-6 md:mx-10 mt-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/cars">Cars</Link></li>
          <li className="breadcrumb-item">
            <Link to={`/cars?brand=${encodeURIComponent(displayVariant.brand)}`}>
              {displayVariant.brand}
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/cars?brand=${encodeURIComponent(displayVariant.name)}`}>
              {displayVariant.name}
            </Link>
          </li>
          <li className="breadcrumb-item active">{displayVariant.model}</li>
        </ol>
      </nav>
      
      {/* Top Section: Car details + Price card */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left: Car details */}
        <div className="col-span-5 md:col-span-3 bg-white border border-gray-200 rounded-lg shadow p-4 sm:p-6">
          <img
            src={
              displayVariant.image.startsWith("http")
                ? displayVariant.image
                : `/${displayVariant.image}`
            }
            alt={displayVariant.model}
            className="w-full h-48 sm:h-60 object-cover rounded-xl mb-4 sm:mb-6"
          />
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            {displayVariant.model}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {displayVariant.description ||
              "This car offers great mileage, features, and solid performance."}
          </p>
          {displayVariant.features && displayVariant.features.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md sm:text-lg font-semibold mb-2">
                Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base text-gray-700">
                {displayVariant.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <svg
                      className="w-4 h-4 text-green-600 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Price Card */}
        <div className="col-span-5 md:col-span-2 max-w-md w-full mx-auto bg-white border border-gray-200 rounded-lg shadow p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">
              {displayVariant.model} On Road Price in {stateData.stateName}
            </h2>
            <div className="space-y-3 sm:space-y-4 px-1 sm:px-2">
              {/* Location Edit Button */}
              <div className="flex items-center text-gray-600">
                <span>Location: {stateData.stateName}</span>
                <button
                  onClick={() => setModalVariant(displayVariant)}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  aria-label="Edit Location"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#000"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 3.487a2.25 2.25 0 013.182 3.182l-10.5 10.5a2.25 2.25 0 01-1.061.59l-4.125.917a.75.75 0 01-.917-.917l.917-4.125a2.25 2.25 0 01.59-1.061l10.5-10.5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 7.5l-3-3"
                    />
                  </svg>
                </button>
              </div>

              {/* Ex-Showroom */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="text-gray-600">Ex-Showroom Price</div>
                <div className="font-semibold break-words">
                  {formatINR(displayVariant.price)}
                </div>
              </div>

              {/* RTO */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="flex items-center text-gray-600">
                  <span>RTO Charges ~({rtoPercentage}%)</span>
                  <button
                    onClick={onEditRegistration}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    aria-label="Edit Registration Charges"
                  />
                </div>
                <div className="font-semibold break-words">
                  {formatINR(registration)}
                </div>
              </div>

              {/* Insurance */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="text-gray-600">
                  Insurance ({stateData.insurancePercentage}%)
                </div>
                <div className="font-semibold break-words">
                  {formatINR(insurance)}
                </div>
              </div>

              {/* Other Charges */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="text-gray-600">Other Charges</div>
                <div className="font-semibold break-words">
                  {formatINR(otherCharges)}
                </div>
              </div>

              {/* Optional Packages */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="text-gray-600">Optional Packages</div>
                <button className="text-blue-600 hover:underline text-sm mt-1 sm:mt-0">
                  Add
                </button>
              </div>

{/* EMI Calculator Section */}
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
  {/* First Line: EMI Amount and Get EMI Offers button */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
    {/* Left Section: EMI Info */}
    <div className="flex flex-col xs:flex-row xs:items-center gap-3">
      {/* EMI Label with Tooltip */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-blue-800 whitespace-nowrap">EMI</span>
        {/* Tooltip Icon */}
        <div className="group relative flex-shrink-0">
          <svg 
            className="w-4 h-4 text-blue-500 cursor-help hover:text-blue-600 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          
          {/* Tooltip Content */}
          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-72 sm:w-80 z-50">
            <div className="bg-gray-900 text-white text-xs rounded-lg p-4 shadow-xl border border-gray-700">
              <div className="font-semibold mb-2 text-blue-300">EMI Calculated basis:</div>
              <ul className="space-y-1.5">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Down Payment - {formatINR(257490)}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Interest Rate - 10% p.a.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  <span>Tenure - 5 Years</span>
                </li>
              </ul>
              <div className="mt-3 pt-2 border-t border-gray-700">
                <div className="text-blue-200 text-[11px] leading-relaxed">
                  For exact EMI quotes please get in touch with Authorized Dealer
                </div>
                <div className="text-blue-200 text-[11px] leading-relaxed mt-1">
                  Fill in your details and get best loan deals
                </div>
                <div className="text-white font-medium text-[11px] mt-1">
                  Visit 93Cars Loan page
                </div>
              </div>
              
              {/* Tooltip arrow */}
              <div className="absolute top-full left-3 border-8 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* EMI Amount and Duration */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-lg font-bold text-gray-900 whitespace-nowrap">
          {formatINR(Math.round(computeOnRoadPrice(displayVariant) * 0.02))}
          <span className="text-sm text-gray-600 font-normal ml-1">/month</span>
        </span>
        <span className="text-sm text-gray-600 whitespace-nowrap">for 5 years</span>
      </div>
    </div>
    
    {/* Get EMI Offers Button */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        // toast.success("EMI Offers will be shown here");
      }}
      className="px-2 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white font-medium text-sm transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md w-full sm:w-auto text-center"
    >
      Get EMI Offers
    </button>
  </div>

  {/* Second Line: Calculate EMI link */}
  <div className="flex items-center justify-between pt-2 border-t border-blue-200">
    <Link 
      to="#" 
      onClick={(e) => {
        e.preventDefault();
        setIsEMIModalOpen(true);
      }}
      className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors flex items-center gap-1"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      Calculate EMI
    </Link>
    <div className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
      Starting from 8.5% p.a.
    </div>
  </div>
</div>

      {/* Expand Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center text-blue-600 hover:underline text-sm w-full justify-center mt-2 select-none"
        aria-expanded={expanded}
      >
        {expanded
          ? "Hide Detailed Price Breakup"
          : "Show Detailed Price Breakup"}
        <svg
          className={`w-4 h-4 ml-1 transform ${
            expanded ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded">
          <p>
            Road Tax ({rtoPercentage}%): {formatINR(registration)}
          </p>
          <p>
            Insurance ({stateData.insurancePercentage}%):{" "}
            {formatINR(insurance)}
          </p>
          <p>Other Charges: {formatINR(otherCharges)}</p>
        </div>
      )}
              
            </div>
          </div>

          <hr className="border-gray-200 my-4" />

          <div className="px-2 pb-4 flex flex-col sm:flex-col md:flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4 md:gap-4 lg:gap-6">
            <div className="text-center lg:text-left w-full lg:w-auto">
              <div className="text-gray-600 text-sm">
                On Road Price in {stateData.stateName}
              </div>
              <div className="text-xl sm:text-2xl md:text-2xl lg:text-2xl font-bold break-words">
                {formatINR(computeOnRoadPrice(displayVariant))}
              </div>
            </div>

            <button
              onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOfferVariant(displayVariant);
                        setIsOfferModalOpen(true);
                      }}
              className="w-full sm:w-full md:w-full lg:w-auto px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 min-w-[140px]"
            >
              Get Offers
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Filters + List */}
      <div className="mt-8 bg-white rounded-xl shadow p-6 max-w-3xl">
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
              <path
                d="M7 8h34L28 24v12l-8 4V24L7 8z"
                stroke="currentColor"
                fill="none"
              />
            </svg>
            <span className="text-lg font-semibold ml-2">
              Filter By Fuel type & Transmission
            </span>
          </div>
          <div className="flex flex-wrap gap-4">
            <ButtonGroup
              options={fuelTypes}
              selected={selectedFuels}
              onToggle={(v) =>
                toggleSelection(v, selectedFuels, setSelectedFuels)
              }
            />
            <ButtonGroup
              options={transmissionTypes}
              selected={selectedTransmissions}
              onToggle={(v) =>
                toggleSelection(v, selectedTransmissions, setSelectedTransmissions)
              }
            />
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 bg-gray-50 border border-gray-200 rounded-t-lg px-4 py-2 text-gray-600 font-medium">
          <div className="col-span-6">Variants</div>
          <div className="col-span-3 text-center">On Road Price</div>
          <div className="col-span-3 text-center">Compare</div>
        </div>

        {/* List - UPDATED WITH PROPER SELECTION FUNCTIONALITY */}
        <div className="border border-t-0 border-gray-200 rounded-b-lg divide-y divide-gray-200 overflow-x-auto">
          {displayedVariants.length ? (
            displayedVariants.map((v, i) => (
              <div
                key={`${v.compositeKey}-${i}`}
                onClick={() => {
                  handleVariantClick(v);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative grid grid-cols-1 md:grid-cols-12 items-center p-4 transition cursor-pointer ${
                  String(v.id) === String(localCurrentVariantId) 
                    ? 'bg-blue-50 border-l-4 border-l-blue-600 cursor-default' 
                    : 'bg-white hover:bg-gray-50 cursor-pointer'
                }`}
              >
                {/* Current Car badge */}
                {String(v.id) === String(localCurrentVariantId) && (
                  <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded">
                    {v.id === selectedVariant.id ? 'Current Car' : 'Selected'}
                  </span>
                )}

                {/* Variant Column */}
                <div className="col-span-6">
                  <div className="font-semibold text-gray-800">{v.model}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {v.engine}, {v.fuelType}, {v.transmission}, {v.mileage}
                  </div>
                </div>

                {/* Price Column */}
                <div className="col-span-3 mt-4 md:mt-0 text-base font-semibold text-gray-800 text-center">
                  {formatINR(computeOnRoadPrice(v))}
                </div>

                {/* Compare */}
                <div className="col-span-3 mt-4 md:mt-0 flex flex-col items-center">
                  <label 
                    className="flex items-center text-gray-600 text-sm space-x-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Compare</span>
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      aria-label={`Compare ${v.model}`}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </label>
                  <div className="mt-2 text-sm text-blue-600 space-x-2 font-semibold">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOfferVariant(v);
                        setIsOfferModalOpen(true);
                      }}
                      className="hover:underline focus:outline-none"
                    >
                      Get Offers
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500">
              No variants match the selected filters.
            </div>
          )}
        </div>

        {/* Show More/Less */}
        {filtered.length > 4 && (
          <div className="mt-4 text-center">
            <button
              className="inline-flex items-center text-blue-600 hover:underline text-sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View More Variants"}
              <svg
                className={`w-4 h-4 ml-1 transform ${showAll ? "rotate-270" : "rotate-90"}`}
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
        
        {modalVariant && ( 
          <PriceBreakupModal 
            displayVariant={modalVariant} 
            onClose={() => setModalVariant(null)} 
            onConfirmCity={handleModalConfirm}  
          /> 
        )}
        
        {selectedOfferVariant && (
          <OffersModal
            isOpen={isOfferModalOpen}
            model={selectedOfferVariant.model}
            brand={selectedOfferVariant.brand}
            onClose={() => setIsOfferModalOpen(false)}
          />
        )}
      </div>
      
      <GetBrouchers carname={displayVariant.name}/>
      <EMICalculatorModal 
        isOpen={isEMIModalOpen}
        onClose={() => setIsEMIModalOpen(false)}
        carData={displayVariant}
      />
      <Toaster position="top-right" />
    </div>
  );
};

export default OnRoadPrice;




// import { useParams, useLocation } from "react-router-dom";

// const OnRoadPrice = () => {
//   const { statename } = useParams(); // 👈 now clear: "karnataka", "tamil-nadu", etc.
//   const location = useLocation();

//   const { carId, city } = location.state || {};

//   return (
//     <div>
//       <h1>On Road Price</h1>
//       <p>State from URL: {statename}</p>
//       <p>State from navigate state: {city}</p>
//       <p>Car ID: {carId}</p>
//     </div>
//   );
// };

// export default OnRoadPrice;



