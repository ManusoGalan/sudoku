import React, { ReactChild } from 'react';
import ButtonTypes from '../../@types/ButtonEnum';
import ISudokuService from '../../service/ISudokuService';
import { useSudoku } from '../../service/SudokuService';

interface ButtonProps {
  children: ReactChild;
  buttonType: ButtonTypes;
  value: number;
}

function Button(props: ButtonProps) {
  const { children, buttonType, value } = props;
  const sudokuService = useSudoku();

  switch (buttonType) {
    case ButtonTypes.large:
      return (
        <div className="basis-3/5" onClick={() => {handleClick(value, sudokuService)}}>
          <div className="rounded bg-slate-700 mx-1 h-full flex justify-center items-center">
            <span className="text-white font-bold">{children}</span>
          </div>
        </div>
      );
    case ButtonTypes.normal:
      return (
        <div className="basis-1/5" onClick={() => {handleClick(value, sudokuService)}}>
          <div className="rounded border border-slate-700 mx-1 flex justify-center items-center aspect-square">
            <span className="text-slate-700 font-bold">{children}</span>
          </div>
        </div>
      );
    default:
      return <></>;
  }
}

const handleClick = (newValue: number, sudokuService: ISudokuService) => {
  const positionToChange = sudokuService.getSelectedPosition();
  const newUserSudoku = Array.from(sudokuService.getUserSudoku());

  newUserSudoku[positionToChange] = newValue;

  sudokuService.setUserSudoku(newUserSudoku)
}

export default Button;
