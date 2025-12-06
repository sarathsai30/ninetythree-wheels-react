import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import rtoData from "../../data/RTO.json";
import cars from "../../data/cars.json";
import GetBrouchers from "./GetBrouchers";
import OffersModal from "./OffersModal";
import EMICalculatorModal from "./EMICalculatorModal";

// Import the correct PriceBreakupModal component (make sure to create this as a separate file)
import PriceBreakupModal from "./PriceBreakupModal";

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

const OnRoadPrice = ({ onOffersClick, onEditRegistration, onCitySelect }) => {
  const { statename } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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
  const [emiValue, setEmiValue] = useState(0);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Sync with initial variant
  useEffect(() => {
    if (initialVariant) {
      setDisplayVariant(initialVariant);
      setLocalCurrentVariantId(initialVariant.id);
      setSelectedVariant(initialVariant);
    }
  }, [initialVariant]);

  // Find state data
  const stateData = useMemo(() => {
    return rtoData.find(
      (s) => s.stateName?.toLowerCase() === statename?.toLowerCase()
    );
  }, [statename]);

  // Fetch cars variants which matches cars.json
  useEffect(() => {
    if (!carId) return;
    const foundCar = cars.find((c) => c.id === carId);
    if (!foundCar) return;

    const seriesName = foundCar.name.split(" ").slice(0, 2).join(" ");
    const variants = cars.filter(
      (c) => c.brand === foundCar.brand && c.name.startsWith(seriesName)
    );
    setModelVariants(variants);
    if (!initialVariant && variants.length > 0) {
      setSelectedVariant(variants[0]);
      setDisplayVariant(variants[0]);
      setLocalCurrentVariantId(variants[0].id);
    }
  }, [carId, initialVariant]);

  // Format currency
  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  // Fuel key mapping
  const fuelKeyMap = {
    petrol: "petrol",
    diesel: "diesel",
    electric: "ev",
    ev: "ev",
  };

  // Compute On-Road Price per variant
  const computeOnRoadPrice = useCallback((variant) => {
    if (!variant || !stateData) return 0;
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
  }, [stateData]);

  // Calculate current variant's RTO rate
  const getRtoRate = useCallback(() => {
    if (!stateData || !displayVariant) return 0;
    const exShowroom = displayVariant.price;
    const fuelType = displayVariant.fuelType;
    
    const rule = stateData.rtoRules.find(
      (r) => exShowroom >= r.minPrice && exShowroom <= r.maxPrice
    );
    if (!rule) return 0;
    const key = fuelKeyMap[fuelType?.toLowerCase()] || fuelType?.toLowerCase();
    return rule.fuelRates[key] ?? 0;
  }, [stateData, displayVariant]);

  // Calculate current prices
  const exShowroom = displayVariant?.price || 0;
  const rtoPercentage = getRtoRate();
  const registration = Math.round((exShowroom * rtoPercentage) / 100);
  const insurance = Math.round(
    (exShowroom * (stateData?.insurancePercentage || 3)) / 100
  );
  const otherCharges = stateData?.otherCharges ?? 0;
  const onRoadPrice = exShowroom + registration + insurance + otherCharges;

  // Handle variant selection
  const handleVariantClick = (variant) => {
    if (String(variant.id) !== String(localCurrentVariantId)) {
      setLocalCurrentVariantId(variant.id);
      setDisplayVariant(variant);
    }
  };

  // Handle modal confirm for city selection
  const handleModalConfirm = (cityName) => {
    if (onCitySelect) {
      onCitySelect(cityName);
    }
    // Navigate to new state
    const stateLower = cityName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/on-road-price/${stateLower}`, {
      state: { 
        carId, 
        city: cityName,
        state: cityName,
        variant: displayVariant 
      },
    });
  };

  // Handle EMI calculation
  const handleEmiCalculated = (emi) => {
    setEmiValue(emi);
  };

  // Calculate EMI for display
  const loanAmount = onRoadPrice - onRoadPrice * 0.3;
  const monthlyRate = 10 / 12 / 100;
  const numberOfMonths = 5 * 12;
  const calculatedEMI =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
    (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

  // Filter functionality
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

  const displayedVariants = showAll ? filtered : filtered.slice(0, 4);

  // Filter Button Component
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



  return (
    <div className="mx-4 sm:mx-6 md:mx-10 mt-5">
      {/* Breadcrumb Navigation */}
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
              displayVariant.image?.startsWith("http")
                ? displayVariant.image
                : `/${displayVariant.image || 'default-car.jpg'}`
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
                                <span>Down Payment - {formatINR(onRoadPrice * 0.3)}</span>
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
                        {emiValue > 0 ? formatINR(emiValue) : formatINR(Math.floor(calculatedEMI))}
                        <span className="text-sm text-gray-600 font-normal ml-1">/month</span>
                      </span>
                      <span className="text-sm text-gray-600 whitespace-nowrap">for 5 years</span>
                    </div>
                  </div>
                  
                  {/* Get EMI Offers Button */}
                  <button
                    onClick={(e) => {
                      window.location.href =
                        "https://inr.deals/track?id=car778279331&src=merchant-detail-backend&campaign=cpl&url=https%3A%2F%2Fwww.bharatloan.com%2Fapply-now&subid=93cars";
                    }}
                    className="px-2 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white font-medium text-sm transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md w-full sm:w-auto text-center"
                  >
                    Get EMI Offers
                  </button>
                </div>

                {/* Second Line: Calculate EMI link */}
                <div className="flex items-center justify-between pt-2 border-t border-blue-200">
                  <button
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
                  </button>
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

        {/* Variants List */}
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
        
        {/* Modal for Price Breakup */}
        {modalVariant && ( 
          <PriceBreakupModal 
            carId={carId}
            variant={modalVariant}
            onClose={() => setModalVariant(null)} 
            onConfirmCity={handleModalConfirm}  
          /> 
        )}
        
        {/* Offers Modal */}
        {selectedOfferVariant && (
          <OffersModal
            isOpen={isOfferModalOpen}
            model={selectedOfferVariant.model}
            brand={selectedOfferVariant.brand}
            onClose={() => setIsOfferModalOpen(false)}
          />
        )}
      </div>
      
      {/* Brochures and EMI Calculator */}
      <GetBrouchers carname={displayVariant.name}/>
      <EMICalculatorModal 
        isOpen={isEMIModalOpen}
        onClose={() => setIsEMIModalOpen(false)}
        carData={displayVariant}
        FinalPrice={computeOnRoadPrice(displayVariant)}
        onEmiCalculated={handleEmiCalculated}
      />
      <Toaster position="top-right" />
    </div>
  );
};

export default OnRoadPrice;