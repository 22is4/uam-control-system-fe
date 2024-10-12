import React, { useEffect, useState } from 'react';
import Uam from './Uam';

const UamController: React.FC = () => {
  const [uamInstances, setInstance] = useState<number[]>([]);

  useEffect(() => {
    //TODO: api code로 변경
    const intervalId = setInterval(() => {
      setInstance([0, 1]);
    }, 1000);

    return () => clearInterval(intervalId);
  });

  return (
    <>
      {uamInstances.map((instanceNumber) => {
        return <Uam key={instanceNumber} id={instanceNumber} />;
      })}
    </>
  );
};

export default UamController;
