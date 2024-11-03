import { Cartesian3, Ion, IonResource, JulianDate } from 'cesium';
import { Camera, CameraFlyTo, Cesium3DTileset, Clock, Viewer } from 'resium';
import styled from 'styled-components';
import UamController from './uam/UamController';

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
    <>
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
        skyBox={false}
      >
        <Clock startTime={start.clone()} shouldAnimate={true} />
        <Camera>
          <CameraFlyTo
            destination={Cartesian3.fromDegrees(128.6111, 35.8885, 1000)}
            duration={0}
          />
        </Camera>
        <Cesium3DTileset url={IonResource.fromAssetId(2275207)} />
        <Cesium3DTileset url={IonResource.fromAssetId(96188)} />
        <UamController />
      </UCSViewer>
    </>
  );
}
