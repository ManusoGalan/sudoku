import React from 'react';
import '../styles/main.css';
import NumberRow from './NumberRow';

interface CellProps {
  roundedTipPosition: string;
  borderSubstraction: string;
  numbers: number[];
  id: string;
}

function Cell(props: CellProps) {
  let { roundedTipPosition, borderSubstraction, numbers, id } = props;

  const cell: JSX.Element[] = [];

  for (let row = 0; row < 3; row++) {
    let borderSubstract = '';
    if (row == 0) borderSubstract = 'border-t-0';
    else if (row == 2) borderSubstract = 'border-b-0';

    cell.push(
      <NumberRow
        key={`number-row-${row}-in-${id}`}
        id={`number-row-${row}-in-${id}`}
        xBorderSubstract={borderSubstract}
        numbers={numbers.slice(3 * row, 3 * (row + 1))}
      ></NumberRow>,
    );
  }

  return (
    <div
      className={`border-4 border-gray-900 relative 
        ${roundedTipPosition} 
        ${roundedTipPosition != '' ? 'rounded-tips big' : ''}
        ${borderSubstraction}`}
    >
      {cell}
    </div>
  );
}

export default Cell;
