import { useUamInstanceStore } from './uam/uamInstance';
import UCSViewer from './viewer/UCSViewer';
import styled from 'styled-components';
import { ViewerProvider } from './viewer/ViewerContext';
import UCSInfoPanel from './viewer/UCSInfopanel';
import PathInfoPanel from './viewer/PathInfoPanel';
import { pathCoordinates } from './path/pathCoordinates';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 배치 */
  height: 100vh;
`;

const ViewerSection = styled.div`
  display: flex;
  flex: 1; /* 화면의 나머지 공간 차지 */
  overflow: hidden; /* 필요 시 넘치는 내용 숨김 */
`;

const PathInfoContainer = styled.div`
  height: 20vh; /* 하단에 고정된 높이 */
  width: 100%; /* 가로 전체 */
  background-color: #1e1e1e;
`;

export default function App() {
  const { uamInstances } = useUamInstanceStore();

  return (
    <ViewerProvider>
      <AppContainer>
        {/* Viewer와 InfoPanel */}
        <ViewerSection>
          <UCSViewer />
          <UCSInfoPanel uamInstances={uamInstances} />
        </ViewerSection>

        {/* PathInfoPanel */}
        <PathInfoContainer>
          <PathInfoPanel pathCount={pathCoordinates.length} />
        </PathInfoContainer>
      </AppContainer>
    </ViewerProvider>
  );
}
