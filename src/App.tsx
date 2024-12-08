import { useState } from 'react';
import { useUamInstanceStore } from './uam/uamInstance';
import UCSViewer from './viewer/UCSViewer';
import styled from 'styled-components';
import { ViewerProvider } from './viewer/ViewerContext';
import UCSInfoPanel from './viewer/UCSInfopanel';
import PathInfoPanel from './viewer/PathInfoPanel';
import { pathCoordinates } from './path/pathCoordinates';

const ViewerSection = styled.div`
  display: flex;
  flex: 1; /* 화면의 나머지 공간 차지 */
  overflow: hidden; /* 필요 시 넘치는 내용 숨김 */
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoPanelSection = styled.div`
  display: flex;
  flex: 1;
`;

const ButtonSection = styled.div`
  display: flex;
  height: 3rem;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

interface StyledButtonProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, '$active'> {
  $active: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  flex: 1; /* 버튼이 섹션 전체를 고르게 차지 */
  height: 3rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem 1.25rem 0rem 0rem;
  border-top: 2px solid rgba(255, 255, 255, 0.5);
  background-color: ${(props) =>
    props.$active ? '#1e1e1e' : 'black'}; /* 활성 상태에 따른 색상 변경 */
  color: white; /* 텍스트 색상 변경 */
`;

export default function App() {
  const { uamInstances } = useUamInstanceStore();
  const [activePanel, setActivePanel] = useState('UCS'); // UCS 또는 Path

  return (
    <ViewerProvider>
      {/* Viewer와 InfoPanel */}
      <ViewerSection>
        <UCSViewer />
        <MenuSection>
          <ButtonSection>
            <StyledButton
              $active={activePanel === 'UCS'}
              onClick={() => setActivePanel('UCS')}
            >
              UAM 정보
            </StyledButton>
            <StyledButton
              $active={activePanel === 'Path'}
              onClick={() => setActivePanel('Path')}
            >
              경로
            </StyledButton>
          </ButtonSection>
          <InfoPanelSection>
            {activePanel === 'UCS' && (
              <UCSInfoPanel uamInstances={uamInstances} />
            )}
            {activePanel === 'Path' && (
              <PathInfoPanel pathCount={pathCoordinates.length} />
            )}
          </InfoPanelSection>
        </MenuSection>
      </ViewerSection>
    </ViewerProvider>
  );
}
