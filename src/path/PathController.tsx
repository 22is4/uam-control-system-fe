import { useState } from 'react';
import PathEntity from './PathEntity';
import { pathCoordinates, Path } from './pathCoordinates';
import { Color } from 'cesium';

const getRandomColor = () => {
  return Color.fromRandom({ alpha: 0.5 });
};

const PathController: React.FC = () => {
  const [pathsWithStyles] = useState<Path[]>(() =>
    pathCoordinates.map((path) => ({
      ...path,
      color: getRandomColor(),
      radius: 50, // 반지름을 50미터로 설정
    })),
  );

  return (
    <>
      {pathsWithStyles.map((path, index) => (
        <PathEntity
          key={index}
          positions={path.positions}
          color={path.color}
          radius={path.radius}
        />
      ))}
    </>
  );
};

export default PathController;
