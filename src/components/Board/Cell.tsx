import React from 'react';
import '../../styles/main.css';
import NumberRow from './NumberRow';

interface CellProps {
  id: string;
  roundedTipPosition: string;
  borderOverride: string;
  position: number;
}

function Cell(props: CellProps) {
  const { id, borderOverride, position } = props;

  const rowOfNumbers: JSX.Element[] = [...Array(3)];

  return (
    <div
      className={`border-2 border-gray-900 relative flex flex-col basis-1/3 w-1/3
        ${/*roundedTipPosition != '' ? `rounded-tips big ${roundedTipPosition}` : ''*/''}
        ${borderOverride}`}
    >
      {rowOfNumbers.map((val, index) => {
        return (
          <NumberRow
            key={`number-row-${index}-in-${id}`}
            id={`number-row-${index}-in-${id}`}
            yBorderSubstract={getYBorderOverride(index)}
            position={position + 3 * index}
          ></NumberRow>
        );
      })}
    </div>
  );
}

const getYBorderOverride = (row: number): string => {
  let yBorderOverride = '';

    //if (row == 0) borderSubstract = 'border-t-transparent';
    //else if (row == 2) borderSubstract = 'border-b-transparent';

  return yBorderOverride;
}

export default Cell;
