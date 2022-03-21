import React, { ReactChild } from 'react';
import ButtonTypes from '../../@types/ButtonEnum';

interface ButtonProps {
  children: ReactChild;
  buttonType: ButtonTypes;
}

function Button(props: ButtonProps) {
  const { children, buttonType } = props;

  switch (buttonType) {
    case ButtonTypes.large:
      return (
        <div className="basis-3/5">
          <div className="rounded bg-slate-700 mx-1 h-full flex justify-center items-center">
            <span className="text-white font-bold">{children}</span>
          </div>
        </div>
      );
    case ButtonTypes.normal:
      return (
        <div className="basis-1/5">
          <div className="rounded border border-slate-700 mx-1 flex justify-center items-center aspect-square">
            <span className="text-slate-700 font-bold">{children}</span>
          </div>
        </div>
      );
    default:
      return <></>;
  }
}

export default Button;
