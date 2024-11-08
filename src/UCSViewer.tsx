import { JulianDate, Ion, IonResource, Cartesian3 } from 'cesium';
import { CameraFlyTo, Cesium3DTileset, Clock, Viewer } from 'resium';
import UamController from './uam/UamController';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 20%;
  background-color: #f0f0f0;
`;

export default function UCSViewer() {
  Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ACCESSTOKEN;
  const start = JulianDate.now();
  const homePosition = Cartesian3.fromDegrees(128.6014, 35.8714, 15000);

  return (
    <>
      <Viewer
        baseLayerPicker={false}
        fullscreenButton={false}
        geocoder={false}
        infoBox={false}
        sceneModePicker={false}
        selectionIndicator={false}
        timeline={false}
        navigationHelpButton={false}
        navigationInstructionsInitiallyVisible={false}
        skyBox={false}
        homeButton={true}
        ref={(viewer) => {
          if (viewer) {
            viewer.cesiumElement?.homeButton.viewModel.command.afterExecute.addEventListener(
              () => {
                viewer.cesiumElement?.camera.flyTo({
                  destination: homePosition,
                  duration: 2,
                });
              },
            );
          }
        }}
      >
        <Clock startTime={start.clone()} shouldAnimate={true} />
        <CameraFlyTo destination={homePosition} duration={0} once />
        <Cesium3DTileset url={IonResource.fromAssetId(2275207)} />
        <Cesium3DTileset url={IonResource.fromAssetId(96188)} />
        <UamController />
      </Viewer>
      <Overlay />
    </>
  );
}
