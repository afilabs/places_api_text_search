import React, { useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import Map from "./components/Map";
import LocationSearchPanel from "./components/LocationSearchPanel";
import PlaceList from "./components/PlaceList";
import "./App.scss";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [activePlace, setActivePlace] = useState({});
  const [searchValue, setSearchValue] = useState();

  const handlePlaceSelection = async (places) => {
    setPlaces(places);
  };

  const handlePlaceClick = (place) => {
    setActivePlace(place || {});
  };

  return (
    <div className="app">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <div className="location-panel">
          <LocationSearchPanel
            searchValue={searchValue}
            onSearch={setSearchValue}
            onPlaceSelect={handlePlaceSelection}
          />
          <PlaceList
            placeList={places}
            activePlace={activePlace}
            onPlaceClick={handlePlaceClick}
          />
        </div>
        <Map
          places={places}
          activePlace={activePlace}
          onPlaceClick={handlePlaceClick}
        />
      </APIProvider>
    </div>
  );
};

export default App;
