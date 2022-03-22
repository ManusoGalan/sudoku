import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import DifficultyLevels from '../@types/DifficultyLevelsEnum';
import { useSudoku } from '../service/SudokuService';
import '../styles/main.css';

interface SelectorProps {
  label: string;
  values: DifficultyLevels[];
}

function Selector(props: SelectorProps) {
  const sudokuService = useSudoku();

  const { label, values } = props;

  const getValueName = (value: number): string => {
    switch (value) {
      case DifficultyLevels.veryEasy:
        return 'Muy fácil';
      case DifficultyLevels.easy:
        return 'Fácil';
      case DifficultyLevels.medium:
        return 'Normal';
      case DifficultyLevels.hard:
        return 'Difícil';
      case DifficultyLevels.veryHard:
        return 'Muy difícil';
    }

    return '';
  };

  const [shownMenu, showMenu] = useState(false);

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-screen h-screen z-10 ${shownMenu ? '' : 'hidden'}`}
        onClick={() => {
          showMenu(!shownMenu);
        }}
      />
      <div className="relative flex" onClick={() => showMenu(!shownMenu)}>
        <span className={`font-bold`}>{label}:</span>
        <div className="flex items-center ml-2 font-normal">
          {getValueName(sudokuService.getDifficulty())}
          <RiArrowDownSLine className="ml-1"></RiArrowDownSLine>
        </div>
        <div
          className={`absolute mt-2 border border-slate-700 bg-white z-10 rounded-lg top-full left-0 min-w-full shadow-lg ${
            shownMenu ? '' : 'hidden'
          }`}
        >
          {values.map((val, index, arrayOfValues) => {
            switch (index) {
              case 0:
                return (
                  <a
                    href="#"
                    className="block px-2 py-2 hover:bg-slate-700 hover:text-white overflow-hidden rounded-t"
                    onClick={() => {
                      sudokuService.setDifficulty(val);
                    }}
                  >
                    {getValueName(val)}
                  </a>
                );
              case arrayOfValues.length - 1:
                return (
                  <a
                    href="#"
                    className="block px-2 py-2 hover:bg-slate-700 hover:text-white overflow-hidden rounded-b"
                    onClick={() => {
                      sudokuService.setDifficulty(val);
                    }}
                  >
                    {getValueName(val)}
                  </a>
                );
              default:
                return (
                  <a
                    href="#"
                    className="block px-2 py-2 hover:bg-slate-700 hover:text-white overflow-hidden"
                    onClick={() => {
                      sudokuService.setDifficulty(val);
                    }}
                  >
                    {getValueName(val)}
                  </a>
                );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default Selector;
