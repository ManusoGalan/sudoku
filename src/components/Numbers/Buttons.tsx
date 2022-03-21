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
    },
    {
      text: '1',
      type: ButtonTypes.normal,
    },
    {
      text: '2',
      type: ButtonTypes.normal,
    },
    {
      text: '3',
      type: ButtonTypes.normal,
    },
  ];

  const secondRowOfButtons: Array<JSONButton> = [
    {
      text: '4',
      type: ButtonTypes.normal,
    },
    {
      text: '5',
      type: ButtonTypes.normal,
    },
    {
      text: '6',
      type: ButtonTypes.normal,
    },
    {
      text: '7',
      type: ButtonTypes.normal,
    },
    {
      text: '8',
      type: ButtonTypes.normal,
    },
    {
      text: '9',
      type: ButtonTypes.normal,
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
