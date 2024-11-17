import React, { createContext, useRef } from 'react';
import { Viewer as CesiumViewer } from 'cesium';

interface ViewerContextProps {
  viewerRef: React.MutableRefObject<CesiumViewer | null>;
}

export const ViewerContext = createContext<ViewerContextProps | null>(null);

export const ViewerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const viewerRef = useRef<CesiumViewer | null>(null);

  return (
    <ViewerContext.Provider value={{ viewerRef }}>
      {children}
    </ViewerContext.Provider>
  );
};
