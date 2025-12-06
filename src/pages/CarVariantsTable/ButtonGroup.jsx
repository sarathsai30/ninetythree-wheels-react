import React from 'react';
import FilterButton from './FilterButton';

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

export default ButtonGroup;