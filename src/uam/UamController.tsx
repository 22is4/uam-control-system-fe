import { useEffect } from 'react';
import Uam from './UamEntity';
import { useUamInstanceStore } from './uamInstance';
import { UNIT_TIME } from './constants';
import axios from 'axios';

const UamController: React.FC = () => {
  const { uamInstances, setUamInstance } = useUamInstanceStore();

  const getUamInstances = async () => {
    try {
      // 서버에 데이터 요청
      const response = await axios.get(
        `http://cocoquiet.com:10001/uam/drone/instances`,
      );

      const res = response.data;
      const instances = [];
      for (let index = 0; index < res.length; index++) {
        instances.push(res[index]['instanceId']);
      }

      setUamInstance(instances);
    } catch (error) {
      console.error(`Failed to fetch uam Instances`, error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      getUamInstances();
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
