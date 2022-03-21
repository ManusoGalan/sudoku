import React, { createContext, useContext, useEffect, useState } from 'react';
import DifficultyLevels from '../@types/DifficultyLevelsEnum';
import ISudokuService from './ISudokuService';

interface SudokuProviderProps {
  fillGridMock?: Function;
  cleanGridMock?: Function;
  children: React.ReactChild | React.ReactChild[];
}

const SudokuContext = createContext<ISudokuService>({
  getDifficulty: () => {},
  getSolvedSudoku: () => {},
  getInitialSudoku: () => {},
  getUserSudoku: () => {},
  setDifficulty: () => {},
  setUserSudoku: () => {},
  toogleLoading: () => {},
});

function SudokuProvider(props: SudokuProviderProps) {
  const { fillGridMock, cleanGridMock, children } = props;

  const [userGrid, setUserGrid] = useState(getEmptyArray());
  const [solvedGrid, setSolvedGrid] = useState(getEmptyArray());
  const [initialGrid, setInitialGrid] = useState(getEmptyArray());

  const [difficultyLevel, setDifficultyLevel] = useState(DifficultyLevels.medium);
  const [loading, setLoading] = useState(true);

  const solvedGridProvider: Function = fillGridMock || fillGrid;
  const initialGridProvider: Function = cleanGridMock || cleanGrid;

  useEffect(() => {
    const providedSolvedGrid: Array<number> = solvedGridProvider();
    const providedInitialGrid: Array<number> = initialGridProvider(providedSolvedGrid, difficultyLevel);

    for (let cellRow = 0; cellRow < 3; cellRow++) {
      for (let cellCol = 0; cellCol < 3; cellCol++) {
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            solvedGrid[Math.pow(3, 3) * cellRow + Math.pow(3, 2) * cellCol + row * 3 + col] =
              providedSolvedGrid[Math.pow(3, 3) * cellRow + 3 * cellCol + row * Math.pow(3, 2) + col];
            initialGrid[Math.pow(3, 3) * cellRow + Math.pow(3, 2) * cellCol + row * 3 + col] =
              providedInitialGrid[Math.pow(3, 3) * cellRow + 3 * cellCol + row * Math.pow(3, 2) + col];
          }
        }
      }
    }

    setUserGrid(Array.from(initialGrid));

    setLoading(false);
  }, [difficultyLevel]);

  const value: ISudokuService = {
    getDifficulty: () => {
      return difficultyLevel;
    },
    getSolvedSudoku: () => {
      return solvedGrid;
    },
    getInitialSudoku: () => {
      return initialGrid;
    },
    getUserSudoku: () => {
      return userGrid;
    },
    setDifficulty: (difficultyLevel: DifficultyLevels) => {
      setDifficultyLevel(difficultyLevel);
    },
    setUserSudoku: (newSudoku: Array<number>) => {
      setUserGrid(newSudoku);
    },
    toogleLoading: () => {
      setLoading(true);
    },
  };

  if (!loading) return <SudokuContext.Provider value={value}>{children}</SudokuContext.Provider>;
  return <div></div>;
};

const useSudoku = () => {
  return useContext(SudokuContext);
};

const getEmptyArray = (): Array<number> => {
  return Array(Math.pow(3, 2) * Math.pow(3, 2)).fill(0);
};

const fillGrid = (grid: Array<number> = getEmptyArray()): boolean | Array<number> => {
  const pullOfNumbers: Array<number> = [...Array(9)].map((val, index) => {
    return index + 1;
  });

  let index = 0;

  for (index = 0; index < grid.length; index++) {
    const row: number = Math.floor(index / 9);
    const col: number = index % 9;

    if (grid[index] == 0) {
      while (pullOfNumbers.length != 0) {
        const newNumber: number = pullOfNumbers.splice(Math.floor(Math.random() * pullOfNumbers.length), 1)[0];

        if (
          !getRowValues(row, grid).includes(newNumber) &&
          !getColValues(col, grid).includes(newNumber) &&
          !getCellValues(row, col, grid).includes(newNumber)
        ) {
          grid[index] = newNumber;
          if (!grid.includes(0)) return true;
          if (fillGrid(grid) as boolean) return grid;
        }
      }
      break;
    }
  }

  grid[index] = 0;
  return false;
};

const cleanGrid = (solvedGrid: Array<number>, difficulty: DifficultyLevels): Array<number> => {
  const gridCopy = Array.from(solvedGrid);

  for (let attemp = 0; attemp < difficulty; attemp++) {
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
};

const solveSudoku = (grid: Array<number>): number => {
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
};

const getColValues = (col: number, currentValues: Array<number>): Array<number> => {
  const colValues: Array<number> = [];

  currentValues.forEach((value, index) => {
    if (index % 9 == col) colValues.push(value);
  });

  return colValues;
};

const getRowValues = (row: number, currentValues: Array<number>): Array<number> => {
  return currentValues.slice(row * 9, row * 9 + 9);
};

const getCellValues = (row: number, col: number, currentValues: Array<number>): Array<number> => {
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
};

export { useSudoku, SudokuProvider };
