import { useEffect } from 'react';
import Uam from './UamEntity';
import { useUamInstanceStore } from './uamInstance';
import { UNIT_TIME } from './constants';

const UamController: React.FC = () => {
  const { uamInstances, setUamInstance } = useUamInstanceStore();

  useEffect(() => {
    //TODO: api code로 변경
    const intervalId = setInterval(() => {
      setUamInstance([0, 1, 2, 4]);
    }, 1000 * UNIT_TIME);

    return () => clearInterval(intervalId);
  });

  return (
    <>
      {uamInstances.map((instanceNumber) => {
        return <Uam key={`uam-${instanceNumber}`} id={instanceNumber} />;
      })}
    </>
  );
};

export default UamController;
