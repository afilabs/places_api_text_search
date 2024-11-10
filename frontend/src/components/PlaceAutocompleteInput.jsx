import React, { useState } from "react";
import { ReactComponent as SendIcon } from "../assets/images/send.svg";
import "./PlaceAutocompleteInput.scss";

const PlaceAutocompleteInput = ({ onSearch, onPlaceSelect }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const hasSufficientQueryLength = () => query.length > 2;

  const handleSearch = async () => {
    if (hasSufficientQueryLength()) {
      onSearch(query);
      setQuery("");

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URI}/places?query=${query}`
        );
        const suggestions = await response.json();
        onPlaceSelect(suggestions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleSearch();
    }
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="What are you looking for?"
      />
      <SendIcon
        onClick={handleSearch}
        style={{ fill: hasSufficientQueryLength() ? "#2594ee" : "#888888" }}
      />
    </div>
  );
};

export default PlaceAutocompleteInput;
