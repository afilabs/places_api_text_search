import React, { forwardRef } from "react";
import Rating from "./Rating";
import DefaultPlaceImg from "../assets/images/default_place.png";
import { formatSnakeCase } from "../utils";
import "./PlaceItem.scss";

const PlaceItem = forwardRef(
  (
    {
      active,
      name,
      rating = 0,
      reviewsCount = 0,
      vicinity,
      imageUrl,
      type,
      onClick,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`PlaceItem ${active ? "active" : ""}`}
        onClick={onClick}
      >
        <div className="top-content">
          <div className="item-image">
            <img alt={name} src={imageUrl || DefaultPlaceImg} />
          </div>
          <div className="details">
            <p className="item-name">{name}</p>
            {!!rating && (
              <div className="item-rating">
                <span>{rating}</span> <Rating rating={rating} />{" "}
                <span>({reviewsCount})</span>
              </div>
            )}
            <p className="item-type">{formatSnakeCase(type)}</p>
          </div>
        </div>
        <p className="item-address">{vicinity}</p>
      </div>
    );
  }
);

export default React.memo(PlaceItem);
