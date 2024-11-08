import { useEffect } from 'react';
import React from 'react';
import Uam from './UamEntity';
import { useUamInstanceStore } from './UamInstance';

const UamController: React.FC = () => {
  const { uamInstances, setUamInstance } = useUamInstanceStore();

  useEffect(() => {
    //TODO: api code로 변경
    const intervalId = setInterval(() => {
      setUamInstance([0, 2, 3]);
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
