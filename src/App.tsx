import { Ion, JulianDate } from 'cesium';
import { Clock, Viewer } from 'resium';
import styled from 'styled-components';

const UCSViewer = styled(Viewer)`
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

function App() {
  Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ACCESSTOKEN;

  return (
    <UCSViewer
      baseLayerPicker={false}
      fullscreenButton={false}
      geocoder={false}
      homeButton={false}
      infoBox={false}
      sceneModePicker={false}
      selectionIndicator={false}
      timeline={false}
      navigationHelpButton={false}
      navigationInstructionsInitiallyVisible={false}
      //creditContainer={document.createElement('div')} //
      skyBox={false}
    >
      <Clock startTime={JulianDate.now()} shouldAnimate={true} />
    </UCSViewer>
  );
}

export default App;
