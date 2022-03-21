import React from 'react';
import '../../styles/main.css';
import Number from './Number';

interface NumberRowProps {
  id: string;
  yBorderSubstract: string;
  position: number;
}

function NumberRow(props: NumberRowProps) {
  const { id, yBorderSubstract, position } = props;

  const rowOfNumbers: JSX.Element[] = [...Array(3)];

  return (
    <div className="flex basis-1/3 h-1/3">
      {rowOfNumbers.map((val, index) => {
        return (
          <Number
            key={`number-${index}-in-${id}`}
            borderOverride={`${getXBorderOverride(index)} ${yBorderSubstract}`}
            position={position + index}
          />
        );
      })}
    </div>
  );
}

const getXBorderOverride = (col: number): string => {
  let xBorderOverride = '';

  //if (col == 0) xBorderSubstract = 'border-l-transparent';
  //else if (col == 2) xBorderSubstract = 'border-r-transparent';

  return xBorderOverride;
};

export default NumberRow;
