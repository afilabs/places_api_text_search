import React from "react";
import PlaceAutocompleteInput from "./PlaceAutocompleteInput";
import "./LocationSearchPanel.scss";
import { ReactComponent as TriangleBubble } from "../assets/images/triangle-bubble.svg";
import useTypingEffect from "../hooks/useTypingEffect";

const LocationSearchPanel = ({ onSearch, onPlaceSelect, searchValue }) => {
  const typedText = useTypingEffect(searchValue, 10);

  return (
    <div className="location-search-panel">
      <h3>Ask Google Maps Anything</h3>
      <PlaceAutocompleteInput
        onSearch={onSearch}
        onPlaceSelect={onPlaceSelect}
      />
      {!!typedText && (
        <>
          <div className="break-line"></div>
          <div className="search-value">
            <TriangleBubble />
            {typedText}
          </div>
        </>
      )}
    </div>
  );
};

export default LocationSearchPanel;
