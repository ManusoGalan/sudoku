import React from 'react';
import ButtonTypes from '../../@types/ButtonEnum';
import JSONButton from '../../@types/ButtonType';
import ButtonRow from './ButtonsRow';

interface ButtonsProps {}

function Buttons(props: ButtonsProps) {
  const firstRowOfButtons: Array<JSONButton> = [
    {
      text: 'Borrar número',
      type: ButtonTypes.large,
      value: 0,
    },
    {
      text: '1',
      type: ButtonTypes.normal,
      value: 1,
    },
    {
      text: '2',
      type: ButtonTypes.normal,
      value: 2,
    },
    {
      text: '3',
      type: ButtonTypes.normal,
      value: 3,
    },
  ];

  const secondRowOfButtons: Array<JSONButton> = [
    {
      text: '4',
      type: ButtonTypes.normal,
      value: 4,
    },
    {
      text: '5',
      type: ButtonTypes.normal,
      value: 5,
    },
    {
      text: '6',
      type: ButtonTypes.normal,
      value: 6,
    },
    {
      text: '7',
      type: ButtonTypes.normal,
      value: 7,
    },
    {
      text: '8',
      type: ButtonTypes.normal,
      value: 8,
    },
    {
      text: '9',
      type: ButtonTypes.normal,
      value: 9,
    },
  ];

  return (
    <>
      <ButtonRow buttons={firstRowOfButtons}></ButtonRow>
      <ButtonRow buttons={secondRowOfButtons}></ButtonRow>
    </>
  );
}

export default Buttons;
