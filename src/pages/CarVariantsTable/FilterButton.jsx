import React from 'react';

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
      borderColor: selected ? '#16a34a' : '#ccc',
      color: selected ? '#166534' : '#444',
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

export default FilterButton;