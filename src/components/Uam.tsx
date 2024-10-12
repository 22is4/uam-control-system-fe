import { Cartesian3, Color, JulianDate, SampledPositionProperty } from 'cesium';
import { Entity } from 'resium';

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
        point={{
          pixelSize: 10,
          color: Color.fromRandom({ minimumAlpha: 1 }),
        }}
        position={positionProperty}
      ></Entity>
    </>
  );
}
