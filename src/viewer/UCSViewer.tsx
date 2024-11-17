import { JulianDate, Ion, IonResource, Cartesian3 } from 'cesium';
import { CameraFlyTo, Cesium3DTileset, Clock, Viewer } from 'resium';
import UamController from '../uam/UamController';
import styled from 'styled-components';
import PathController from '../path/PathController';
import { useViewer } from './useViewer';

const Overlay = styled.div`
  height: 20vh;
  width: 100%;
  background-color: #1e1e1e;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const CustomViewer = styled(Viewer)`
  height: 80vh;
  width: 100%;
`;

export default function UCSViewer() {
  Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ACCESSTOKEN;
  const start = JulianDate.now();
  const homePosition = Cartesian3.fromDegrees(128.6014, 35.8714, 15000);

  const { viewerRef } = useViewer();

  return (
    <Container>
      <CustomViewer
        animation={false}
        shouldAnimate={true}
        baseLayerPicker={false}
        fullscreenButton={false}
        geocoder={false}
        infoBox={false}
        sceneModePicker={false}
        timeline={false}
        navigationHelpButton={false}
        navigationInstructionsInitiallyVisible={false}
        skyBox={false}
        homeButton={true}
        style={{ flex: 1 }}
        ref={(viewer) => {
          if (viewer && viewer.cesiumElement) {
            viewer.cesiumElement?.homeButton.viewModel.command.afterExecute.addEventListener(
              () => {
                viewer.cesiumElement?.camera.flyTo({
                  destination: homePosition,
                  duration: 2,
                });
              },
            );

            viewerRef.current = viewer.cesiumElement;
          }
        }}
      >
        <Clock startTime={start.clone()} shouldAnimate={true} />
        <CameraFlyTo destination={homePosition} duration={0} once />
        <Cesium3DTileset url={IonResource.fromAssetId(2275207)} />
        <Cesium3DTileset url={IonResource.fromAssetId(96188)} />
        <UamController />
        <PathController />
      </CustomViewer>
      <Overlay />
    </Container>
  );
}
