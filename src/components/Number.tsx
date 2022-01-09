import React from 'react';
import '../styles/main.css';

interface NumberProps {
  borderOverride: string;
  rightValue: number;
  valueToShow: number;
}

function Number(props: NumberProps) {
  const { borderOverride, rightValue = 0, valueToShow = 0 } = props;

  return <div className={`flex items-center justify-center text-5xl font-bold border-2 border-gray-900 w-24 h-24 relative ${borderOverride}`} data-rightvalue={rightValue}> {valueToShow == 0 ? '' : valueToShow} </div>;
}

export default Number;
