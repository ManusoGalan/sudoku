import React from 'react';
import JSONButton from '../../@types/ButtonType';
import Button from './Button';

interface ButtonsProps {
  buttons: Array<JSONButton>;
}

function ButtonRow(props: ButtonsProps) {
  const { buttons } = props;

  return (
    <div className="w-full flex mb-2">
      {buttons.map((val) => (
        <Button buttonType={val.type}>{val.text}</Button>
      ))}
    </div>
  );
  buttons;
}

export default ButtonRow;
