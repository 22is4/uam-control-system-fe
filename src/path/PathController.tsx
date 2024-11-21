import React, { useMemo } from 'react';
import PathEntity from './PathEntity';
import { pathCoordinates } from './pathCoordinates';
import { Color } from 'cesium';

const getRandomColor = () => {
  return Color.fromRandom({ alpha: 0.5 });
};

const PathController: React.FC = () => {
  // useMemo를 사용하여 pathCoordinates에 스타일 적용
  const pathsWithStyles = useMemo(() => {
    return pathCoordinates.map((path) => ({
      ...path,
      color: getRandomColor(),
      radius: 50, // 반지름을 50미터로 설정
    }));
  }, []); // pathCoordinates가 변경되지 않는다고 가정

  return (
    <>
      {pathsWithStyles.map((path, index) => (
        <PathEntity
          key={index}
          id={index}
          positions={path.positions}
          color={path.color}
          radius={path.radius}
        />
      ))}
    </>
  );
};

export default PathController;
