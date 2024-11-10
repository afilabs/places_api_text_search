import React from "react";
import { InfoWindow as GInfoWindow } from "@vis.gl/react-google-maps";
import Rating from "./Rating";
import "./InfoWindow.scss";

const InfoWindow = ({ place, anchor, onCloseClick }) => {
  const { name, address, imageUrl } = place;
  const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${place.id}`;

  return (
    <GInfoWindow
      anchor={anchor}
      onCloseClick={onCloseClick}
      headerContent={
        <div className="info-window">
          <div className="info-window-content">
            {imageUrl && (
              <img src={imageUrl} alt={name} className="info-window-image" />
            )}
            <div className="info-window-details">
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <h2 className="info-window-title">{name}</h2>
              </a>
              {!!place.rating && (
                <div className="info-window-rating">
                  <span>{place.rating}</span> <Rating rating={place.rating} />{" "}
                  <span>({place.reviewsCount})</span>
                </div>
              )}
            </div>
          </div>
          <div className="info-window-address">{address}</div>
        </div>
      }
    ></GInfoWindow>
  );
};

export default InfoWindow;
