import { Ion, JulianDate } from 'cesium';
import { Clock, Viewer } from 'resium';
import styled from 'styled-components';
import UamController from './UamController';

const UCSViewer = styled(Viewer)`
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default function App() {
  Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ACCESSTOKEN;
  const start = JulianDate.now();

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
      <Clock startTime={start.clone()} shouldAnimate={true} />
      <UamController />
    </UCSViewer>
  );
}
