import React from 'react';
import '../../styles/main.css';
import Cell from './Cell';

interface RowProps {
  id: string;
  row: number;
}

function Row(props: RowProps) {
  const { id, row } = props;

  const cells: JSX.Element[] = [...Array(3)];

  return <div className="grid grid-cols-3">
    {cells.map((val, index) => {
      return <Cell
        key={`cell-${index}-in-${id}`}
        id={`cell-${index}-in-${id}`}
        roundedTipPosition={getTipsPosition(row, index)}
        borderOverride={getBorderOverride(row, index)}
        position={Math.pow(3, 3) * row + Math.pow(3, 2) * index}
      ></Cell>
    })}
  </div>;
}

const getTipsPosition = (row: number, col: number): string => {
  if (row == 0 && col != 2) return 'top';
  if (row != 2 && col == 2) return 'right';
  if (row == 2 && col != 0) return 'bottom';
  if (row != 0 && col == 0) return 'left';
  return '';
};

const getBorderOverride = (row: number, col: number): string => {
  let borderOverride: string = '';

  if (row == 0) borderOverride += 'border-t-0 ';
  else if (row == 2) borderOverride += 'border-b-0 ';

  if (col == 0) borderOverride += 'border-l-0 ';
  else if (col == 2) borderOverride += 'border-r-0 ';

  return borderOverride;
}

export default Row;
