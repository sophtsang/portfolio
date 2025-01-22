import React, { useState, useEffect } from 'react';

const SudokuVertex = ({ position, initialValue, possibilities, onValueChange }) => {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    setValue(initialValue); // Update local state when initialValue changes
  }, [initialValue]);

  const handleValueChange = (newValue) => {
    setValue(newValue);
    onValueChange(position, newValue); // Pass the value change to the parent component
  };

  return (
    <div className="sudoku-vertex">
      <div>
        Position: {position}
      </div>
      <div>
        Value: {value !== 0 ? value : "Empty"}
      </div>
      <div>
        Possibilities: {possibilities}
      </div>
      <button onClick={() => handleValueChange(1)}>Set Value to 1</button>
      {/* Add more buttons to set other values or update possibilities */}
    </div>
  );
};

export default SudokuVertex;
