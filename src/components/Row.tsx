import React from 'react';
import '../styles/main.css';
import Cell from './Cell';

interface RowProps {
  row: number;
  numbers: number[];
  id: string;
}

function Row(props: RowProps) {
  const { row, numbers, id } = props;

  const cells: JSX.Element[] = [];

  for (let col = 0; col < 3; col++) {
    let roundedTipPosition: string = '';
    let borderSubstraction: string = '';

    if (row == 0 && col != 2) roundedTipPosition = 'top';
    else if (row != 2 && col == 2) roundedTipPosition = 'right';
    else if (row == 2 && col != 0) roundedTipPosition = 'bottom';
    else if (row != 0 && col == 0) roundedTipPosition = 'left';

    if (row == 0) borderSubstraction += 'border-t-0 ';
    else if (row == 2) borderSubstraction += 'border-b-0 ';

    if (col == 0) borderSubstraction += 'border-l-0 ';
    else if (col == 2) borderSubstraction += 'border-r-0 ';

    cells.push(
      <Cell
        key={`cell-${col}-in-${id}`}
        id={`cell-${col}-in-${id}`}
        roundedTipPosition={roundedTipPosition}
        borderSubstraction={borderSubstraction}
        numbers={numbers.slice(Math.pow(3, 2) * col, Math.pow(3, 2) * (col + 1))}
      ></Cell>,
    );
  }

  return <div className="flex">{cells}</div>;
}

export default Row;
