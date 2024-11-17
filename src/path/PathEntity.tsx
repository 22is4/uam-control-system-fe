import { Entity, CylinderGraphics, PolylineVolumeGraphics } from 'resium';
import { Color, Cartesian3 } from 'cesium';
import { Coordinate } from './pathCoordinates';

type PathEntityProps = {
  positions: Coordinate[];
  color?: Color;
  radius?: number;
};

const PathEntity: React.FC<PathEntityProps> = ({
  positions,
  color,
  radius = 50,
}) => {
  const entities = [];

  for (let i = 0; i < positions.length - 1; i++) {
    const start = positions[i];
    const end = positions[i + 1];

    const isVertical = start[0] === end[0] && start[1] === end[1]; // 경도와 위도가 같으면 수직 구간

    if (isVertical) {
      // 수직 구간: CylinderGraphics 사용
      const [lon, lat] = start;
      const bottomHeight = Math.min(start[2], end[2]);
      const topHeight = Math.max(start[2], end[2]);
      const height = topHeight - bottomHeight;
      const position = Cartesian3.fromDegrees(
        lon,
        lat,
        bottomHeight + height / 2,
      );

      entities.push(
        <Entity key={`verticalPath-${i}`} position={position}>
          <CylinderGraphics
            length={height}
            topRadius={radius}
            bottomRadius={radius}
            material={color}
          />
        </Entity>,
      );
    } else {
      // 수평 구간: PolylineVolumeGraphics 사용
      const segmentPositions = [
        Cartesian3.fromDegrees(start[0], start[1], start[2]),
        Cartesian3.fromDegrees(end[0], end[1], end[2]),
      ];

      // 원형 단면 정의
      const circlePoints = Array.from({ length: 36 }, (_, i) => {
        const angle = (i / 36) * 2 * Math.PI;
        return new Cartesian3(
          radius * Math.cos(angle),
          radius * Math.sin(angle),
          0,
        );
      });

      entities.push(
        <Entity key={`horizontalPath-${i}`}>
          <PolylineVolumeGraphics
            positions={segmentPositions}
            shape={circlePoints}
            material={color}
          />
        </Entity>,
      );
    }
  }

  return <>{entities}</>;
};

export default PathEntity;
