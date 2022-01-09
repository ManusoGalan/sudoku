import React from 'react';
import Row from './Row';

interface SudokuProps {
  dimension: number;
}

function Sudoku(props: SudokuProps) {
  const solvedGrid: Array<number> = fillGrid(Array(Math.pow(3, 2) * Math.pow(3, 2)).fill(0)) as Array<number>;
  const strippedGrid: Array<number> = cleanGrid(solvedGrid);

  const sortedSolvedGrid: Array<number> = Array(Math.pow(3, 2) * Math.pow(3, 2)).fill(0);
  const sortedStrippedGrid: Array<number> = Array(Math.pow(3, 2) * Math.pow(3, 2)).fill(0);

  for (let cellRow = 0; cellRow < 3; cellRow++) {
    for (let cellCol = 0; cellCol < 3; cellCol++) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          sortedSolvedGrid[Math.pow(3, 3) * cellRow + Math.pow(3, 2) * cellCol + row * 3 + col] =
            solvedGrid[Math.pow(3, 3) * cellRow + 3 * cellCol + row * Math.pow(3, 2) + col];
          sortedStrippedGrid[Math.pow(3, 3) * cellRow + Math.pow(3, 2) * cellCol + row * 3 + col] =
            strippedGrid[Math.pow(3, 3) * cellRow + 3 * cellCol + row * Math.pow(3, 2) + col];
        }
      }
    }
  }

  const rowOfCells: JSX.Element[] = []

  for(let row = 0; row < 3; row++) {
    rowOfCells.push(
      <Row key={`row-${row}`} id={`row-${row}`} row={row} numbers={sortedStrippedGrid.slice(Math.pow(3, 3) * row, Math.pow(3, 3) * (row + 1))}></Row>
    )
  }

  return (
    <div>
      {rowOfCells}
    </div>
  )
}

function fillGrid(grid: Array<number>): boolean | Array<number> {
  const pullOfNumbers: Array<number> = [...Array(9)].map((val, index) => {
    return index + 1;
  });

  let index: string = '';
  for (index in grid) {
    const indexAsNumber = parseInt(index);

    const row: number = Math.floor(indexAsNumber / 9);
    const col: number = indexAsNumber % 9;

    if (grid[indexAsNumber] == 0) {
      while (pullOfNumbers.length != 0) {
        const newNumber: number = pullOfNumbers.splice(Math.floor(Math.random() * pullOfNumbers.length), 1)[0];

        if (
          !getRowValues(row, grid).includes(newNumber) &&
          !getColValues(col, grid).includes(newNumber) &&
          !getCellValues(row, col, grid).includes(newNumber)
        ) {
          grid[indexAsNumber] = newNumber;
          if (!grid.includes(0)) return true;
          if (fillGrid(grid) as boolean) return grid;
        }
      }
      break;
    }
  }

  grid[parseInt(index)] = 0;
  return false;
}

function cleanGrid(grid: Array<number>): Array<number> {
  const gridCopy = Array.from(grid);

  for (let attemp = 0; attemp < 10; attemp++) {
    while (true) {
      let randomIndexToDrop: number = Math.floor(Math.random() * gridCopy.length);
      while (gridCopy[randomIndexToDrop] == 0) {
        randomIndexToDrop = Math.floor(Math.random() * gridCopy.length);
      }

      const oldValue: number = gridCopy[randomIndexToDrop];
      gridCopy[randomIndexToDrop] = 0;

      if (solveSudoku(Array.from(gridCopy)) != 1) {
        gridCopy[randomIndexToDrop] = oldValue;
        break;
      }
    }
  }

  return gridCopy;
}

function solveSudoku(grid: Array<number>): number {
  let numberOfSolutions = 0;

  const pullOfNumbers: Array<number> = [...Array(9)].map((val, index) => {
    return index + 1;
  });
  let index: string = '';

  for (index in grid) {
    const indexAsNumber = parseInt(index);

    const row: number = Math.floor(indexAsNumber / 9);
    const col: number = indexAsNumber % 9;

    if (grid[indexAsNumber] == 0) {
      for (const newNumber of pullOfNumbers) {
        if (
          !getRowValues(row, grid).includes(newNumber) &&
          !getColValues(col, grid).includes(newNumber) &&
          !getCellValues(row, col, grid).includes(newNumber)
        ) {
          grid[indexAsNumber] = newNumber;
          if (!grid.includes(0)) return 1;
          numberOfSolutions += solveSudoku(grid);
        }
      }
      break;
    }
  }

  grid[parseInt(index)] = 0;
  return numberOfSolutions;
}

function getColValues(col: number, currentValues: Array<number>): Array<number> {
  const colValues: Array<number> = [];

  currentValues.forEach((value, index) => {
    if (index % 9 == col) colValues.push(value);
  });

  return colValues;
}

function getRowValues(row: number, currentValues: Array<number>): Array<number> {
  return currentValues.slice(row * 9, row * 9 + 9);
}

function getCellValues(row: number, col: number, currentValues: Array<number>): Array<number> {
  return [
    ...currentValues.slice(
      0 * Math.pow(3, 2) + Math.floor(row / 3) * Math.pow(3, 3) + Math.floor(col / 3) * 3,
      0 * Math.pow(3, 2) + Math.floor(row / 3) * Math.pow(3, 3) + Math.floor(col / 3) * 3 + 3,
    ),
    ...currentValues.slice(
      1 * Math.pow(3, 2) + Math.floor(row / 3) * Math.pow(3, 3) + Math.floor(col / 3) * 3,
      1 * Math.pow(3, 2) + Math.floor(row / 3) * Math.pow(3, 3) + Math.floor(col / 3) * 3 + 3,
    ),
    ...currentValues.slice(
      2 * Math.pow(3, 2) + Math.floor(row / 3) * Math.pow(3, 3) + Math.floor(col / 3) * 3,
      2 * Math.pow(3, 2) + Math.floor(row / 3) * Math.pow(3, 3) + Math.floor(col / 3) * 3 + 3,
    ),
  ];
}

export default Sudoku;
