import axios from 'axios';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY; // 여기에 본인의 API 키를 입력하세요.

export const getBuildingName = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const response = await axios.get('https://dapi.kakao.com/v2/local/geo/coord2address.json', {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
      params: {
        x: longitude, // 경도
        y: latitude, // 위도
      },
    });

    const address = response.data?.documents[0]?.address?.address_name;
    const buildingName = response.data?.documents[0]?.road_address?.building_name;

    return buildingName || address || '알 수 없는 위치';
  } catch (error) {
    console.error('Reverse Geocoding API 호출 실패:', error);
    return '위치 정보를 가져올 수 없습니다.';
  }
};
