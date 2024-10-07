import {
  Cartesian3,
  Color,
  JulianDate,
  SampledPositionProperty,
  TimeInterval,
  TimeIntervalCollection,
} from 'cesium';
import { Entity, PathGraphics } from 'resium';

type UamProps = {
  uamTime: JulianDate[];
  uamCooordinates: Cartesian3[];
};

export default function Uam({ uamTime, uamCooordinates }: UamProps) {
  const positionProperty = new SampledPositionProperty();

  positionProperty.addSamples(uamTime, uamCooordinates);
  return (
    <>
      <Entity
        availability={
          new TimeIntervalCollection([
            new TimeInterval({
              start: uamTime[0],
              stop: uamTime[uamTime.length - 1],
            }),
          ])
        }
        point={{
          pixelSize: 10,
          color: Color.fromRandom({ minimumAlpha: 1 }),
        }}
        position={positionProperty}
      >
        <PathGraphics width={1} />
      </Entity>
    </>
  );
}
