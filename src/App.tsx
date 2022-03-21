import React, { useState } from 'react';
import Selector from './ui/Select';
import Sudoku from './components/Board/Sudoku';
import DifficultyLevels from './@types/DifficultyLevelsEnum';
import Timer from './components/Timer';
import Buttons from './components/Numbers/Buttons';
import { SudokuProvider, useSudoku } from './service/SudokuService';

function App() {
  return (
    <div className="h-screen w-screen px-8 flex justify-center items-center flex-col overflow-x-hidden font-serif">
      <SudokuProvider>
        <div className="flex justify-between w-full px-3 mb-4">
          <Selector
            label="Difficulty"
            values={[
              DifficultyLevels.veryEasy,
              DifficultyLevels.easy,
              DifficultyLevels.medium,
              DifficultyLevels.hard,
              DifficultyLevels.veryHard,
            ]}
          ></Selector>
          <Timer></Timer>
        </div>
        <Sudoku/>
        <Buttons></Buttons>
      </SudokuProvider>
    </div>
  );
}

export default App;
