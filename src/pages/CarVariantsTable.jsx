import React, { useState, useMemo } from 'react';

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
                  <a href="#" className="hover:underline">
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
    </div>
  );
};

export default CarVariantsTable;
