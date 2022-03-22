import React, { ReactChild } from 'react';

interface SuccessProps {
  children: ReactChild | ReactChild[];
}

function Success(props: SuccessProps) {
  const { children } = props;

  return <div className="absolute h-screen w-screen z-40 bg-slate-900 opacity-40">{children}</div>;
}

export { Success };
