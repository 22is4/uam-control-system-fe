import React, { useEffect, useState } from 'react';
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

const InstanceItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
`;

type UamInfoPanelProps = {
  uamInstances: number[]; // UAM ID의 배열
};

type UamPosition = {
  id: number;
  latitude: number;
  longitude: number;
  altitude: number;
};

const UamInfoPanel: React.FC<UamInfoPanelProps> = ({ uamInstances }) => {
  const { viewerRef } = useViewer();
  const [uamPositions, setUamPositions] = useState<UamPosition[]>([]);

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

    // 초기 위치 업데이트
    updatePositions();

    // viewer.clock.onTick 이벤트를 사용하여 위치 업데이트
    const removeListener =
      viewer.clock.onTick.addEventListener(updatePositions);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      removeListener();
    };
  }, [uamInstances, viewerRef]);

  const handleClick = (uamId: number) => {
    if (viewerRef.current) {
      // 엔티티 컬렉션에서 해당 ID의 엔티티를 찾습니다.
      const entity = viewerRef.current.entities.getById(`uam-${uamId}`);
      if (entity) {
        viewerRef.current.selectedEntity = entity;
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
            <InstanceItem key={uamId} onClick={() => handleClick(uamId)}>
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

export default UamInfoPanel;
