import React from 'react';
import '../styles/main.css';
import Number from './Number';

interface NumberRowProps {
  xBorderSubstract: string;
  numbers: number[];
  id: string;
}

function NumberRow(props: NumberRowProps) {
  let { xBorderSubstract, numbers, id } = props;

  const rowOfNumbers: JSX.Element[] = [];

  for (let col = 0; col < 3; col++) {
    let yBorderSubstract = '';
    if (col == 0) yBorderSubstract = 'border-l-0';
    else if (col == 2) yBorderSubstract = 'border-r-0';

    rowOfNumbers.push(
      <Number
        key={`number-${col}-in-${id}`}
        borderOverride={`${xBorderSubstract} ${yBorderSubstract}`}
        rightValue={0}
        valueToShow={numbers[col]}
      />,
    );
  }

  return <div className="flex">{rowOfNumbers}</div>;
}

export default NumberRow;
