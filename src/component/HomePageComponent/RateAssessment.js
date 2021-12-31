import React, { useState } from "react";

import { FaStar } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  RatingDetailsProduct,
} from "../../redux/actions/productActions";
import { ADD_RATING } from "../../redux/contants/action-types";
export default function RateAssessement({
  productIdd,
  defaultrating,
  product,
}) {
  const [hover, setHover] = useState(defaultrating);
  console.log(product);
  const dispatch = useDispatch();
  const { rating } = useSelector((state) => state.InfiniteScrollPrduct);
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label className="rating-component">
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                dispatch({ type: ADD_RATING, payload: ratingValue });
                dispatch(addRating(productIdd));
                dispatch(RatingDetailsProduct(productIdd));
              }}
            />
            <FaStar
              className="start-rating-icon"
              size={30}
              color={
                ratingValue <= (hover || rating || product.rating)
                  ? "#ffc107"
                  : "#e4e5e9"
              }
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}
