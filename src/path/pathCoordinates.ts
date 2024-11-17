import { Color } from 'cesium';

export type Coordinate = [number, number, number];

export type Path = {
  positions: Coordinate[];
  color?: Color;
  radius?: number;
};

export const pathCoordinates: Path[] = [
  {
    positions: [
      [128.605, 35.8862, 0],
      [128.605, 35.8862, 500],
      [128.610, 35.8900, 500],
      [128.610, 35.8900, 0],
    ],
  },
  {
    positions: [
      [128.615, 35.8920, 0],
      [128.615, 35.8920, 700],
      [128.620, 35.8949, 700],
      [128.620, 35.8949, 0],
    ],
  },
];
