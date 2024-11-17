import { useUamInstanceStore } from './uam/uamInstance';
import UCSViewer from './viewer/UCSViewer';
import styled from 'styled-components';
import { ViewerProvider } from './viewer/ViewerContext';
import UamInfoPanel from './viewer/Infopanel';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export default function App() {
  const { uamInstances } = useUamInstanceStore();

  return (
    <ViewerProvider>
      <AppContainer>
        <UCSViewer />
        <UamInfoPanel uamInstances={uamInstances} />
      </AppContainer>
    </ViewerProvider>
  );
}
