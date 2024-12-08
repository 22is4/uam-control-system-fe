import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useViewer } from './useViewer';
import { Cartographic, Math as CesiumMath } from 'cesium';
import { getBuildingName } from './geocodeToBuilding';

const InfoPanel = styled.div`
  width: 21rem;
  background-color: #1e1e1e;
  font-family: Arial, sans-serif;
  color: #fff;
  flex-shrink: 0;
  position: relative;
  overflow-y: auto;
`;

const InstanceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

interface InstanceItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, '$isSelected'> {
  $isSelected: boolean;
}

const InstanceItem = styled.li<InstanceItemProps>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: ${({ $isSelected }) =>
    $isSelected ? '#555' : 'transparent'};
  color: ${({ $isSelected }) => ($isSelected ? '#fff' : '#ccc')};
  &:hover {
    background-color: #333;
  }
`;

type UamInfoPanelProps = {
  uamInstances: number[];
};

type UamData = {
  id: number;
  latitude: number;
  longitude: number;
  altitude: number;
  buildingName?: string;
};

const UCSInfoPanel: React.FC<UamInfoPanelProps> = ({ uamInstances }) => {
  const { viewerRef } = useViewer();
  const [uamData, setUamData] = useState<UamData[]>([]);
  const [selectedUamId, setSelectedUamId] = useState<number | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const viewer = viewerRef.current;

    const fetchData = async () => {
      const newData: UamData[] = [];

      for (const uamId of uamInstances) {
        const entity = viewer.entities.getById(`uam-${uamId}`);

        if (entity && entity.position) {
          const currentTime = viewer.clock.currentTime;
          const position = entity.position.getValue(currentTime);

          if (position) {
            const cartographic = Cartographic.fromCartesian(position);
            const latitude = CesiumMath.toDegrees(cartographic.latitude);
            const longitude = CesiumMath.toDegrees(cartographic.longitude);
            const altitude = cartographic.height;

            const buildingName = await getBuildingName(latitude, longitude);

            newData.push({
              id: uamId,
              latitude,
              longitude,
              altitude,
              buildingName,
            });
          }
        }
      }

      setUamData(newData);
    };

    fetchData(); // uamInstances 변경 시 즉시 호출
  }, [uamInstances, viewerRef]);

  const handleUamClick = (uamId: number) => {
    if (viewerRef.current) {
      const entity = viewerRef.current.entities.getById(`uam-${uamId}`);

      if (entity) {
        if (viewerRef.current.selectedEntity === entity) {
          viewerRef.current.selectedEntity = undefined;
          setSelectedUamId(null);
        } else {
          viewerRef.current.selectedEntity = entity;
          setSelectedUamId(uamId);
        }
      }
    }
  };

  return (
    <InfoPanel>
      <div
        style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          color: '#ccc',
          textAlign: 'center',
          margin: '1rem 0',
        }}
      ></div>
      <InstanceList>
        {uamInstances.map((uamId) => {
          const uam = uamData.find((data) => data.id === uamId);

          return (
            <InstanceItem
              key={`info-${uamId}`}
              onClick={() => handleUamClick(uamId)}
              $isSelected={uamId === selectedUamId}
            >
              <div>UAM ID: {uamId}</div>
              {uam ? (
                <>
                  <div>
                    위치: {uam.buildingName || '위치 정보를 불러오는 중...'}
                  </div>
                  <div>고도: {uam.altitude.toFixed(1)} m</div>
                  <div>
                    속력 {CesiumMath.randomBetween(35, 39).toFixed(2)}km/h
                  </div>
                </>
              ) : (
                <div>위치 정보를 불러오는 중...</div>
              )}
            </InstanceItem>
          );
        })}
      </InstanceList>
    </InfoPanel>
  );
};

export default UCSInfoPanel;
