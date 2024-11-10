import React from "react";
import {
  AdvancedMarker as GMarker,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import InfoWindow from "./InfoWindow";

const Marker = ({ place, isOpen, onClick, onClose }) => {
  const [markerRef, markerInstance] = useAdvancedMarkerRef();

  return (
    <>
      <GMarker
        position={{
          lat: place.latitude,
          lng: place.longitude,
        }}
        ref={markerRef}
        onClick={onClick}
      />
      {isOpen && (
        <InfoWindow
          anchor={markerInstance}
          onCloseClick={onClose}
          place={place}
        />
      )}
    </>
  );
};

export default Marker;
