import React from "react";

import { FaStar } from "react-icons/fa";

export default function Rate({ defaultrating }) {
  return (
    <div className="rating-component">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input type="radio" name="rating" value={ratingValue} />
            <FaStar
              className="start-rating-icon"
              size={30}
              color={defaultrating >= ratingValue ? "#ffc107" : "#e4e5e9"}
            />
          </label>
        );
      })}
    </div>
  );
}
