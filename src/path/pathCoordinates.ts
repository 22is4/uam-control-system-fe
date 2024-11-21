import { Color } from 'cesium';

export type Coordinate = [number, number, number];

export type Path = {
  positions: Coordinate[];
  color?: Color;
  radius?: number;
};

// 서버 응답의 Point 타입 정의
export type Point = {
  latitude: number;
  longitude: number;
  altitude: number;
};

// pathCoordinates 변수를 초기화
export let pathCoordinates: Path[] = [];

// 서버에서 데이터를 받아오는 함수
async function fetchAndSetPaths(): Promise<void> {
  const response = await fetch('http://cocoquiet.com:10001/uam/drone/paths');
  const data: Record<string, Point[]> = await response.json();

  pathCoordinates = Object.keys(data).map((key) => {
    const pathData: Point[] = data[key];
    const positions: Coordinate[] = pathData.map((point: Point) => [
      point.longitude,
      point.latitude,
      point.altitude,
    ]);

    return {
      positions,
      color: Color.BLUE, // 경로의 색상 (필요에 따라 변경 가능)
      radius: 5, // 기본 반경 (필요에 따라 변경 가능)
    };
  });

  console.log('Path coordinates set:', pathCoordinates);
}

// 초기화 함수 호출
fetchAndSetPaths().catch((error) => {
  console.error('Error fetching and setting paths:', error);
});
