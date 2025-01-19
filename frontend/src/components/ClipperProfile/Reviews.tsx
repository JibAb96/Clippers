import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Clipper } from "../../model";
type Props = {
  Clipper: Clipper
}

const Reviews = ({ Clipper }: Props) => {
  //Section of Clipper profiles displaying reviews from other creators.
  return (
    <div className=" ml-5 my-3 xl:ml-20 xl:my-10">
      <h2 className="text-secondary font-semibold text-xl sm:text-2xl  xl:text-3xl">Creator Reviews</h2>
      <div>
        {Clipper.reviews.map((review, index) => (
          <div key={index} className="mt-5 xl:mt-10">
            <div className="flex gap-5">
              <h3 className="font-semibold">{review.creator}</h3>
              <div>
                {Array.from({ length: Number(review.stars) }).map(
                  (_, index) => (
                    <FontAwesomeIcon icon={faStar} key={index} aria-hidden="false" aria-label="star rating" className="text-yellow-400" />
                  )
                )}
              </div>
            </div>
            <p className="my-3 lg:w-3/4 xl:my-5 font-light">{review.review}</p>
           <hr/> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
