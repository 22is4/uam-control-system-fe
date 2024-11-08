import { useUamInstanceStore } from './uam/UamInstance';
import UCSViewer from './UCSViewer';
import styled from 'styled-components';

const InfoPanel = styled.div`
  position: relative;
  width: 18.75rem;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
`;

const InstanceCount = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

export default function App() {
  const { uamInstances } = useUamInstanceStore();

  return (
    <div style={{ display: 'flex', height: '100rem' }}>
      <UCSViewer />
      <InfoPanel>
        <div
          style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#555',
            textAlign: 'center',
            marginBottom: '1rem',
          }}
        >
          현재 비행중인 UAM 수
        </div>
        <InstanceCount>{uamInstances.length}</InstanceCount>
      </InfoPanel>
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#555',
            marginBottom: '1rem',
          }}
        ></div>
        <InstanceCount>
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </InstanceCount>
      </div>
    </div>
  );
}
