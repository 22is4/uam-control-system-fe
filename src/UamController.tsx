import { Cartesian3, JulianDate } from 'cesium';
import Uam from './components/Uam';

const samplePath1: number[][] = [
  [128.6115, 35.8881, 10],
  [128.612, 35.8904, 100],
  [128.6138, 35.8913, 10],
];

const samplePath2: number[][] = [
  [128.6108, 35.8902, 50],
  [128.6121, 35.8887, 50],
  [128.6158, 35.8885, 100],
];

const samplePathes: number[][][] = [samplePath1, samplePath2];

export default function UamController() {
  const start = JulianDate.now();
  const unitTime = 10;

  return (
    <>
      {samplePathes.map((path, i) => {
        const times: JulianDate[] = [];
        const coordinates: Cartesian3[] = [];

        for (let i = 0; i < path.length; i++) {
          times.push(
            JulianDate.addSeconds(
              start.clone(),
              unitTime * i,
              new JulianDate(),
            ),
          );

          coordinates.push(
            Cartesian3.fromDegrees(path[i][0], path[i][1], path[i][2]),
          );
        }

        return <Uam key={i} uamTime={times} uamCooordinates={coordinates} />;
      })}
    </>
  );
}
