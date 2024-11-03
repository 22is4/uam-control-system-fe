import { Cartesian3, Color, JulianDate, SampledPositionProperty } from 'cesium';
import { useEffect, useRef, useState } from 'react';
import { Entity } from 'resium';

type UamProp = {
  id: number;
};

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const Uam: React.FC<UamProp> = ({ id }: UamProp) => {
  const [wayPoints, setWaypoint] = useState<SampledPositionProperty>(
    new SampledPositionProperty(),
  );

  const uamColor = useRef<Color>(Color.fromRandom({ minimumAlpha: 1 }));
  const unitTime = 1; //api 요청 단위시간

  const addWaypoint = () => {
    setWaypoint((currentwayPoints) => {
      //TODO: sampledata 제거하고 api코드로 변경

      const curTime = JulianDate.addSeconds(
        JulianDate.now(),
        unitTime * 2,
        new JulianDate(),
      );
      /* 
        cesium Enity의 렌더링 시간 때문인지 바로 다음 단위 시간 후에 갈 곳을 현재 시점에서 바로 정할 수 없다. 만약 그렇게 한다면 Entity 렌더링이 제대로 되지 않는다.
        바로 다음 단위 시간 후에 갈 곳은 바로 이전 단위 시간에 입력을 받아야 한다.
        예를 들어 api를 요청하는 단위 시간이 1초라면, uam이 현재 시점에서 1초 후에 갈 곳은 현재시점에서 1초 이전에 정해져있어야 한다.
        결론적으로 cesium과 시뮬레이터의 시차는 단위시간의 두 배만큼 발생한다.
      */

      currentwayPoints.addSample(
        curTime,
        Cartesian3.fromDegrees(
          getRandomNumber(128.605, 128.6154),
          getRandomNumber(35.8862, 35.8949),
          getRandomNumber(100, 200),
        ),
      );

      return currentwayPoints;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      addWaypoint();
    }, unitTime * 1000);

    return () => clearInterval(intervalId);
  });

  return (
    <Entity
      point={{ pixelSize: 20, color: uamColor.current.clone() }}
      position={wayPoints}
    />
  );
};

export default Uam;
