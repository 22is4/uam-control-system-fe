import {
  Cartesian3,
  IonResource,
  JulianDate,
  Resource,
  SampledPositionProperty,
} from 'cesium';
import { useEffect, useState } from 'react';
import { Entity, ModelGraphics } from 'resium';
import { UNIT_TIME } from './constants';
import axios from 'axios';

type UamProp = {
  id: number;
};

const UamEntity: React.FC<UamProp> = ({ id }: UamProp) => {
  const [wayPoints, setWaypoint] = useState<SampledPositionProperty>(
    new SampledPositionProperty(),
  );

  const addWaypoint = async () => {
    try {
      // 서버에 데이터 요청
      const response = await axios.get(
        `http://cocoquiet.com:10001/uam/drone/instances/${id}`,
      );
      const { latitude, longitude, altitude } = response.data;

      setWaypoint((currentwayPoints) => {
        const curTime = JulianDate.addSeconds(
          JulianDate.now(),
          UNIT_TIME,
          new JulianDate(),
        );

        // 새로운 위치 추가
        currentwayPoints.addSample(
          curTime,
          Cartesian3.fromDegrees(longitude, latitude, altitude),
        );

        return currentwayPoints;
      });
    } catch (error) {
      console.error(`Failed to fetch waypoint for UAM ID ${id}:`, error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      addWaypoint();
    }, UNIT_TIME * 1000);

    return () => clearInterval(intervalId);
  });

  const [modelUri, setModelUri] = useState<Resource | undefined>(undefined);

  useEffect(() => {
    const loadModelUri = async () => {
      const uri = await IonResource.fromAssetId(2852225);
      setModelUri(uri);
    };
    loadModelUri();
  }, []);

  return (
    <Entity id={`uam-${id}`} position={wayPoints}>
      {modelUri && <ModelGraphics uri={modelUri} scale={10.0} />}
    </Entity>
  );
};

export default UamEntity;
