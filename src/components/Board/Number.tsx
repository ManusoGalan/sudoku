import React, { MouseEvent } from 'react';
import ISudokuService from '../../service/ISudokuService';
import { useSudoku } from '../../service/SudokuService';
import '../../styles/main.css';

interface NumberProps {
  borderOverride: string;
  position?: number;
  value?: number
}

function Number(props: NumberProps) {
  const { borderOverride, position } = props;

  const sudokuService = useSudoku();
  const initialSudoku = sudokuService.getInitialSudoku();
  const userSudoku = sudokuService.getUserSudoku();

  if(position != null){
    if (initialSudoku[position] == 0) {
      return <MuttableNumber borderOverride={borderOverride} value={userSudoku[position]} position={position}></MuttableNumber>;
    }
  
    return <NonmuttableNumber borderOverride={borderOverride} value={userSudoku[position]}></NonmuttableNumber>;
  }

  throw new Error('Position not recieved for number.')
}

function MuttableNumber(props: NumberProps) {
  const { borderOverride, value, position } = props;

  const sudokuService = useSudoku();

  return (
    <div
      className={`flex items-center justify-center basis-1/3 w-1/3 border border-gray-900 bg-white box-content relative ${borderOverride}`}
      onClick={handleClick}
    >
      <label className="absolute hidden top-0 left-0 bg-transparent">
        <input value={value} onChange={(e) => handleChange(position!, parseInt(e.target.value), sudokuService)}></input>
      </label>
      <span className={`text-2xl leading-4 font-bold text-slate-900 ${value == 0 ? 'invisible' : ''}`}>{value}</span>
    </div>
  );
}

function NonmuttableNumber(props: NumberProps) {
  const { borderOverride, value } = props;

  return (
    <div
      className={`flex items-center justify-center basis-1/3 w-1/3 border border-gray-900 bg-white box-content relative ${borderOverride}`}
    >
      <span className="text-2xl leading-4 font-bold text-slate-500">{value}</span>
    </div>
  );
}

const handleChange = (position: number, newValue: number, sudokuService: ISudokuService) => {
  const newSudoku = Array.from(sudokuService.getUserSudoku());
  newSudoku[position] = newValue;

  sudokuService.setUserSudoku(newSudoku);
};

const handleClick = (event: MouseEvent) => {
  event.currentTarget.className += ' bg-slate-200 activeNumber';
};

export default Number;
