import { useViewer } from './useViewer';
import styled from 'styled-components';
import { useState } from 'react';

const InfoPanel = styled.div`
  width: 21rem; /* 가로 전체 */
  background-color: #1e1e1e;
  font-family: Arial, sans-serif;
  color: #fff;
  flex-shrink: 0;
  position: relative;
  overflow-y: auto;
`;

const PathList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PathItem = styled.li<{ $isSelected: boolean }>`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: white;
  background-color: ${({ $isSelected }) =>
    $isSelected ? '#555' : 'transparent'};
  color: ${({ $isSelected }) => ($isSelected ? '#fff' : '#ccc')};
  &:hover {
    background-color: #333;
  }
`;

type PathInfoPanelProps = {
  pathCount: number; // 경로의 개수
};

const PathInfoPanel: React.FC<PathInfoPanelProps> = ({ pathCount }) => {
  const { viewerRef } = useViewer();
  const [visiblePaths, setVisiblePaths] = useState<number[]>([]); // Path 표시 상태

  const handlePathClick = (pathIndex: number) => {
    if (!viewerRef.current) return;

    const viewer = viewerRef.current;
    const isVisible = visiblePaths.includes(pathIndex);

    // 토글 상태 변경
    if (isVisible) {
      // Hide all paths for this pathIndex
      let i = 0;
      while (true) {
        const path = viewer.entities.getById(`path-${pathIndex}-${i}`);
        if (!path) break;

        path.show = false;
        i++;
      }
      setVisiblePaths((prev) => prev.filter((id) => id !== pathIndex));
    } else {
      // Show all paths for this pathIndex
      let i = 0;
      while (true) {
        const path = viewer.entities.getById(`path-${pathIndex}-${i}`);
        if (!path) break;

        path.show = true;
        i++;
      }
      setVisiblePaths((prev) => [...prev, pathIndex]);
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
      <PathList>
        <PathItem
          onClick={() => {
            for (let index = 0; index < pathCount; index++) {
              handlePathClick(index);
            }
          }}
          $isSelected={false}
        >
          Route 전체 조회
        </PathItem>
        {Array.from({ length: pathCount }, (_, i) => (
          <PathItem
            key={`path-${i}`}
            onClick={() => handlePathClick(i)}
            $isSelected={visiblePaths.includes(i)}
          >
            Route {i + 1}
          </PathItem>
        ))}
      </PathList>
    </InfoPanel>
  );
};

export default PathInfoPanel;
