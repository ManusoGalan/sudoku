import React, { MutableRefObject } from 'react';
import { useState } from 'react';
import ISudokuService from '../../service/ISudokuService';
import { useSudoku } from '../../service/SudokuService';
import '../../styles/main.css';

interface NumberProps {
  borderOverride: string;
  position?: number;
  value?: number;
  selected?: boolean;
}

function Number(props: NumberProps) {
  const { borderOverride, position } = props;

  const sudokuService = useSudoku();
  const initialSudoku = sudokuService.getInitialSudoku();
  const userSudoku = sudokuService.getUserSudoku();
  const selectedPosition = sudokuService.getSelectedPosition();

  if (position != null) {
    let isSelected: boolean = false;
    if (selectedPosition != -1) {
      isSelected = [
        9 * Math.floor(selectedPosition / 9),
        9 * Math.floor(selectedPosition / 9) + 1,
        9 * Math.floor(selectedPosition / 9) + 2,
        9 * Math.floor(selectedPosition / 9) + 3,
        9 * Math.floor(selectedPosition / 9) + 4,
        9 * Math.floor(selectedPosition / 9) + 5,
        9 * Math.floor(selectedPosition / 9) + 6,
        9 * Math.floor(selectedPosition / 9) + 7,
        9 * Math.floor(selectedPosition / 9) + 8,
        27 * Math.floor(selectedPosition / 27) + 3 * Math.floor((selectedPosition % 9) / 3),
        27 * Math.floor(selectedPosition / 27) + 3 * Math.floor((selectedPosition % 9) / 3) + 1,
        27 * Math.floor(selectedPosition / 27) + 3 * Math.floor((selectedPosition % 9) / 3) + 2,
        27 * Math.floor(selectedPosition / 27) + 3 * Math.floor((selectedPosition % 9) / 3) + 9,
        27 * Math.floor(selectedPosition / 27) + 3 * Math.floor((selectedPosition % 9) / 3) + 9 * 1 + 1,
        27 * Math.floor(selectedPosition / 27) + 3 * Math.floor((selectedPosition % 9) / 3) + 9 * 1 + 2,
        27 * Math.floor(selectedPosition / 27) + 3 * Math.floor((selectedPosition % 9) / 3) + 9 * 2,
        27 * Math.floor(selectedPosition / 27) + 3 * Math.floor((selectedPosition % 9) / 3) + 9 * 2 + 1,
        27 * Math.floor(selectedPosition / 27) + 3 * Math.floor((selectedPosition % 9) / 3) + 9 * 2 + 2,
        Math.floor(selectedPosition % 3) + 9 * Math.floor((selectedPosition % 27) / 9),
        Math.floor(selectedPosition % 3) + 9 * Math.floor((selectedPosition % 27) / 9) + 3 * 1,
        Math.floor(selectedPosition % 3) + 9 * Math.floor((selectedPosition % 27) / 9) + 3 * 2,
        27 + Math.floor(selectedPosition % 3) + 9 * Math.floor((selectedPosition % 27) / 9),
        27 + Math.floor(selectedPosition % 3) + 9 * Math.floor((selectedPosition % 27) / 9) + 3 * 1,
        27 + Math.floor(selectedPosition % 3) + 9 * Math.floor((selectedPosition % 27) / 9) + 3 * 2,
        27 * 2 + Math.floor(selectedPosition % 3) + 9 * Math.floor((selectedPosition % 27) / 9),
        27 * 2 + Math.floor(selectedPosition % 3) + 9 * Math.floor((selectedPosition % 27) / 9) + 3 * 1,
        27 * 2 + Math.floor(selectedPosition % 3) + 9 * Math.floor((selectedPosition % 27) / 9) + 3 * 2,
      ].includes(position);
    }

    if (initialSudoku[position] == 0) {
      return (
        <MuttableNumber
          borderOverride={borderOverride}
          value={userSudoku[position]}
          position={position}
          selected={isSelected}
        ></MuttableNumber>
      );
    }

    return (
      <NonmuttableNumber
        borderOverride={borderOverride}
        value={userSudoku[position]}
        selected={isSelected}
      ></NonmuttableNumber>
    );
  }

  throw new Error('Position not recieved for number.');
}

function MuttableNumber(props: NumberProps) {
  const { borderOverride, value, position, selected } = props;

  const sudokuService = useSudoku();

  return (
    <div
      className={`flex items-center justify-center border border-gray-900 bg-white relative 
      ${sudokuService.getSelectedPosition() == position ? 'bg-slate-400 ' : ''}
      ${selected && sudokuService.getSelectedPosition() != position ? 'bg-slate-100 ' : ''}  
      ${borderOverride}`}
      onClick={() => {
        handleClick(position!, sudokuService);
      }}
    >
      <span className={`text-2xl leading-4 font-bold text-slate-900 ${value == 0 ? 'invisible' : ''}`}>{value}</span>
    </div>
  );
}

function NonmuttableNumber(props: NumberProps) {
  const { borderOverride, value, selected } = props;

  return (
    <div
      className={`flex items-center justify-center border border-gray-900 bg-white relative 
      ${borderOverride} 
      ${selected ? 'bg-slate-100 ' : ''}`}
    >
      <span className="text-2xl leading-4 font-bold text-slate-400">{value}</span>
    </div>
  );
}

const handleClick = (newPosition: number, sudokuService: ISudokuService) => {
  sudokuService.setSelectedPosition(newPosition);
};

export default Number;
