import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Star = () => {
  return (
    <FontAwesomeIcon
      icon={faStar}
      aria-hidden="false"
      aria-label="star rating"
      className="text-yellow-400"
    />
  );
};

export default Star;
