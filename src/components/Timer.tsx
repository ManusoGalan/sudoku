import React, { useEffect, useState } from 'react';

interface TimerProps {}

export default function Timer(props: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    interval = setInterval(() => {
      setElapsedTime((elapsedTime) => elapsedTime + 1);
    }, 1000);

    return () => clearInterval(interval!);
  }, [elapsedTime]);

  return (
    <span>
      {`
        ${
          elapsedTime < 3600
            ? ''
            : `${Math.floor(elapsedTime / 3600).toLocaleString(undefined, { minimumIntegerDigits: 2 })}:`
        }
        ${Math.floor((elapsedTime / 60) % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 })}:
        ${Math.floor(elapsedTime % 60).toLocaleString(undefined, { minimumIntegerDigits: 2 })}`
      }
    </span>
  );
}

