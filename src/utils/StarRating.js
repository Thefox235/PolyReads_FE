import React from "react";
const StarRating = ({ rating, maxStars = 5 }) => {
  return (
    <div>
      {[...Array(maxStars)].map((_, index) => (
        <i
          key={index}
          className={index < rating ? "bi bi-star-fill" : "far fa-star text-gray-400"}
        ></i>
      ))}
    </div>
  );
};

export default StarRating;
