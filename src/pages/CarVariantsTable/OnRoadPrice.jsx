import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import rtoData from "../../data/RTO.json";
import cars from "../../data/cars.json";

const OnRoadPrice = ({ onOffersClick, onEditRegistration }) => {
  const { statename } = useParams();
  const location = useLocation();
  const { carId, city, variant } = location.state || {};

  const [expanded, setExpanded] = useState(false);
  const [car, setCar] = useState(null);
  const [modelVariants, setModelVariants] = useState([]);
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState([]);
  const [showAll, setShowAll] = useState(false);

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

  if (!stateData || !variant) {
    return null;
  }

  const exShowroom = variant.price;
  const fuelType = variant.fuelType;

  const fuelKeyMap = {
    petrol: "petrol",
    diesel: "diesel",
    electric: "ev",
    ev: "ev",
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
    setCar(foundCar);
    if (foundCar) {
      const seriesName = foundCar.name.split(" ").slice(0, 2).join(" ");
      const variants = cars.filter(
        (c) => c.brand === foundCar.brand && c.name.startsWith(seriesName)
      );
      setModelVariants(variants);
    } else {
      setModelVariants([]);
    }
  }, [carId]);

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

  const sortedVariants = [...displayedVariants].sort((a, b) => {
    if (a.id === variant.id) return -1;
    if (b.id === variant.id) return 1;
    return 0;
  });

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
      {/* Top Section: Car details + Price card */}
      <div className="grid grid-cols-5 gap-6">
        {/* Left: Car details */}
        <div className="col-span-5 md:col-span-3 bg-white border border-gray-200 rounded-lg shadow p-4 sm:p-6">
          <img
            src={
              variant.image.startsWith("http")
                ? variant.image
                : `/${variant.image}`
            }
            alt={variant.model}
            className="w-full h-48 sm:h-60 object-cover rounded-xl mb-4 sm:mb-6"
          />
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            {variant.model}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            {variant.description ||
              "This car offers great mileage, features, and solid performance."}
          </p>
          {variant.features && variant.features.length > 0 && (
            <div className="mt-4">
              <h3 className="text-md sm:text-lg font-semibold mb-2">
                Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base text-gray-700">
                {variant.features.map((feature, idx) => (
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
              {variant.model} On Road Price in {stateData.stateName}
            </h2>

            <div className="space-y-3 sm:space-y-4 px-1 sm:px-2">
              {/* Ex-Showroom */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div className="text-gray-600">Ex-Showroom Price</div>
                <div className="font-semibold break-words">
                  {formatINR(variant.price)}
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
                {formatINR(onRoadPrice)}
              </div>
            </div>

            <button
              onClick={onOffersClick}
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

        {/* List */}
        <div className="border border-t-0 border-gray-200 rounded-b-lg divide-y divide-gray-200 overflow-x-auto">
          {sortedVariants.length ? (
            sortedVariants.map((v, i) => (
              <div
                key={`${v.compositeKey}-${i}`}
                className={`relative grid grid-cols-1 md:grid-cols-12 items-center p-4 ${
                  v.isDuplicate ? "bg-yellow-50" : "bg-white"
                }`}
              >
                {v.id === variant.id && (
                  <span className="absolute top-4 right-0 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-l">
                    Current Car
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
                  {formatPrice(v.price + registration + insurance + otherCharges)}
                </div>

                {/* Compare */}
                <div className="col-span-3 mt-4 md:mt-0 flex flex-col items-center">
                  <label className="flex items-center text-gray-600 text-sm space-x-1">
                    <span>Compare</span>
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      aria-label={`Compare ${v.model}`}
                    />
                  </label>
                  <div className="mt-2 text-sm text-blue-600 space-x-2 font-semibold">
                    <a href="#" className="hover:underline">
                      Get Offers
                    </a>
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
      </div>
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


