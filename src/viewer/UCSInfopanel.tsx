import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useViewer } from './useViewer';
import { Cartographic, Math as CesiumMath } from 'cesium';

const InfoPanel = styled.div`
  width: 18.75rem;
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

const InstanceItem = styled.li<{ isSelected: boolean }>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#555' : 'transparent')};
  color: ${(props) => (props.isSelected ? '#fff' : '#ccc')};
  &:hover {
    background-color: #333;
  }
`;

type UamInfoPanelProps = {
  uamInstances: number[];
};

type UamPosition = {
  id: number;
  latitude: number;
  longitude: number;
  altitude: number;
};

const UCSInfoPanel: React.FC<UamInfoPanelProps> = ({ uamInstances }) => {
  const { viewerRef } = useViewer();
  const [uamPositions, setUamPositions] = useState<UamPosition[]>([]);
  const [selectedUamId, setSelectedUamId] = useState<number | null>(null);

  useEffect(() => {
    if (!viewerRef.current) return;

    const viewer = viewerRef.current;

    const updatePositions = () => {
      const newPositions: UamPosition[] = [];

      uamInstances.forEach((uamId) => {
        const entity = viewer.entities.getById(`uam-${uamId}`);

        if (entity && entity.position) {
          const currentTime = viewer.clock.currentTime;
          const position = entity.position.getValue(currentTime);

          if (position) {
            const cartographic = Cartographic.fromCartesian(position);
            const latitude = CesiumMath.toDegrees(cartographic.latitude);
            const longitude = CesiumMath.toDegrees(cartographic.longitude);
            const altitude = cartographic.height;

            newPositions.push({
              id: uamId,
              latitude,
              longitude,
              altitude,
            });
          }
        }
      });

      setUamPositions(newPositions);
    };

    updatePositions();

    viewer.clock.onTick.addEventListener(updatePositions);

    const selectedEntityChangeHandler = (id: number) => {
      setSelectedUamId(id);
    };

    viewer.selectedEntityChanged.addEventListener(selectedEntityChangeHandler);

    return () => {
      viewer.clock.onTick.removeEventListener(updatePositions);
      viewer.selectedEntityChanged.removeEventListener(
        selectedEntityChangeHandler,
      );
    };
  }, [uamInstances, viewerRef]);

  const handleClick = (uamId: number) => {
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
      } else {
        console.warn(`Entity with id ${uamId} not found.`);
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
      >
        현재 비행중인 UAM
      </div>
      <InstanceList>
        {uamInstances.map((uamId) => {
          const uamPosition = uamPositions.find((pos) => pos.id === uamId);

          return (
            <InstanceItem
              key={`info-${uamId}`}
              onClick={() => handleClick(uamId)}
              isSelected={uamId === selectedUamId}
            >
              <div>UAM ID: {uamId}</div>
              {uamPosition ? (
                <>
                  <div>
                    위도: {uamPosition.latitude.toFixed(3)}, 경도:{' '}
                    {uamPosition.longitude.toFixed(3)}
                  </div>
                  <div>고도: {uamPosition.altitude.toFixed(1)} m</div>
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
