import React from 'react';
import Row from './Row';

interface SudokuProps {}

function Sudoku(props: SudokuProps) {
  const rowOfCells: JSX.Element[] = [...Array(3)];

  return (
    <div className="grid grid-rows-3 w-full aspect-square mb-4">
      {rowOfCells.map((val, index) => {
        return <Row key={`row-${index}`} id={`row-${index}`} row={index}></Row>;
      })}
    </div>
  );
}

export default Sudoku;
