
import { useUamInstanceStore } from './uam/uamInstance';
import UCSViewer from './viewer/UCSViewer';
import styled from 'styled-components';
import { ViewerProvider } from './viewer/ViewerContext';
import UCSInfoPanel from './viewer/UCSInfopanel';


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
        <UCSInfoPanel uamInstances={uamInstances} />
      </AppContainer>
    </ViewerProvider>
  );
}
