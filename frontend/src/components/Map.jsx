import React, { useEffect, useState } from "react";
import { Map as GMap, useMap } from "@vis.gl/react-google-maps";
import Marker from "./Marker";

const Map = ({ places, activePlace, onPlaceClick }) => {
  const mapInstance = useMap();
  const [openMarkerId, setOpenMarkerId] = useState(null);

  useEffect(() => {
    setOpenMarkerId(activePlace?.id);
    if (activePlace && mapInstance && !!activePlace.latitude) {
      mapInstance.setCenter({
        lat: activePlace.latitude,
        lng: activePlace.longitude,
      });
    }
  }, [activePlace, mapInstance]);
  useEffect(() => {
    if (places.length > 0 && mapInstance) {
      const bounds = new window.google.maps.LatLngBounds();
      places.forEach(({ latitude, longitude }) => {
        bounds.extend({ lat: latitude, lng: longitude });
      });
      mapInstance.fitBounds(bounds, {
        top: 20,
        right: 20,
        bottom: 20,
        left: 400,
      });
    }
  }, [places, mapInstance]);

  const handleMarkerClick = (place) => {
    setOpenMarkerId(place.id);
    onPlaceClick(place);
  };

  const handleCloseInfoWindow = () => {
    setOpenMarkerId(null);
    onPlaceClick(null);
  };

  return (
    <GMap
      mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
      defaultCenter={{ lat: 49.2569501547411, lng: -123.11058970045666 }}
      defaultZoom={12}
      disableDefaultUI
    >
      {places.map((place) => (
        <Marker
          key={place.id}
          place={place}
          isOpen={openMarkerId === place.id}
          onClick={() => handleMarkerClick(place)}
          onClose={handleCloseInfoWindow}
        />
      ))}
    </GMap>
  );
};

export default Map;
