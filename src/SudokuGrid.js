import React, { useState } from 'react';

const SudokuGrid = () => {
  // Initialize a 9x9 grid filled with zeros (empty cells)
  const [grid, setGrid] = useState(Array.from({ length: 9 }, () => Array(9).fill(0)));
  const [index, setIndex] = useState(Array(81).fill(0));
  const [notDone, setNotDone] = useState([]);
  const [position, setPosition] = useState('');
  const [positionValue, setPositionValue] = useState(null);
  // List containing all positions of vertices in the same row as vertex in position.
  const [rowValue, setRowValue] = useState([]);
  const [colValue, setColValue] = useState([]);
  const [boxValue, setBoxValue] = useState([]);

  const validValue = (row, col, value) => {
    const pos = row * 9 + col;
    for (let i = 0; i < 9; i++) {
      // COL CONSTRAINT: assuming column-major
      if ((i + 9 * Math.floor(pos / 9) !== pos && grid[Math.floor((i + 9 * Math.floor(pos / 9)) / 9)][(i + 9 * Math.floor(pos / 9)) % 9] === value)) {
        return false;
      }
      // ROW CONSTRAINT
      if ((9 * i + (pos % 9)) !== pos && grid[Math.floor((9 * i + (pos % 9)) / 9)][(9 * i + (pos % 9)) % 9] === value) {
        return false; 
      }
      // BOX CONSTRAINT
      if (i < 3) {
        for (let j = 0; j < 3; j++) {
          if ((((Math.floor(pos / 27) * 3 + i) * 9 + Math.floor((pos % 9) / 3) * 3 + j)) !== pos 
              && grid[Math.floor(((Math.floor(pos / 27) * 3 + i) * 9 + Math.floor((pos % 9) / 3) * 3 + j) / 9)][(((Math.floor(pos / 27) * 3 + i) * 9 + Math.floor((pos % 9) / 3) * 3 + j)) % 9] === value) {
            return false;
          }
        }
      }
    }
    return true; 
  }

  // Update a value in the grid
  const handleChange = (row, col, value) => {
    const newGrid = [...grid];
    const newIndex = [...index];
    newGrid[row] = [...newGrid[row]];
    if (validValue(row, col, value)) {
      newGrid[row][col] = value;
      newIndex[row * 9 + col] = value;
      setGrid(newGrid); 
      setIndex(newIndex);
    } else {
      newGrid[row][col] = 0;
      setGrid(newGrid);
    }
    grid.forEach(row => console.log(row));
  };

  // Convert a position (1-81) to a row and column index
  const positionToIndices = (pos) => {
    const col = Math.floor(pos / 9);     // Row index
    const row = (pos) % 9;        // Column index
    return { row, col };
  };

  // Handle position input change
  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };

  // Handle button click to get value at the given position
  const getPositionValue = () => {
    const pos = parseInt(position);
    if (pos >= 0 && pos <= 80) {
      const { row, col } = positionToIndices(pos);
      setPositionValue(grid[row][col]);

      const newRow = [];
      const newCol = [];
      const newBox = [];
      for (let i = 0; i < 9; i++) {
        newRow.push(i + 9 * Math.floor(pos / 9));
        // newCol.push(grid[Math.floor(((Math.floor(pos / 27) * 3 + i) * 9 + Math.floor((pos % 9) / 3) * 3 + j) / 9)][(((Math.floor(pos / 27) * 3 + i) * 9 + Math.floor((pos % 9) / 3) * 3 + j)) % 9]);
        newCol.push(9 * i + (pos % 9));
        if (i < 3) {
          for (let j = 0; j < 3; j++) {
            newBox.push((grid[Math.floor(((Math.floor(pos / 27) * 3 + i) * 9 + Math.floor((pos % 9) / 3) * 3 + j) / 9)][(((Math.floor(pos / 27) * 3 + i) * 9 + Math.floor((pos % 9) / 3) * 3 + j)) % 9]))
            // newBox.push((Math.floor(pos / 27) * 3 + i) * 9 + Math.floor((pos % 9) / 3) * 3 + j)
          }
        }
      }
      setRowValue(newRow);
      setColValue(newCol);
      setBoxValue(newBox);
    } 
    else {
      setPositionValue('Invalid position. Please enter a number between 1 and 81.');
    }
  };

  // Once user clicks "SOLVE", fills all empty positions into notDone.
  const fillNotDone = () => {
    for (let i = 0; i < 81; i++) {
      if (index[i] == 0) {
        notDone.push(i);
      }
    }
  }

  function solve() {
    
  }

  // Render the grid
  return (
    <div>
      <div className="sudoku-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="number"
                value={cell === 0 ? '' : cell}
                onChange={(e) => handleChange(rowIndex, colIndex, parseInt(e.target.value) || 0)
                }
                max="9"
                min="1"
                className="sudoku-cell"
              />
            ))}
          </div>
        ))}
      </div>

      <div>
        <input
          type="number"
          value={position}
          onChange={handlePositionChange}
          placeholder="Enter position (1-81)"
        />
        <button onClick={getPositionValue}>Get Value</button>
        <p>{positionValue !== null ? `Value at position ${position}: ${positionValue}` : ''}</p>
        <p>{rowValue !== ''? `Values in same row as position: ${position}: ${rowValue}` : ''}</p>
        <p>{colValue !== ''? `Values in same col as position: ${position}: ${colValue}` : ''}</p>
        <p>{boxValue !== ''? `Values in same box as position: ${position}: ${boxValue}` : ''}</p>
      </div>
    </div>
  );
};

export default SudokuGrid;
