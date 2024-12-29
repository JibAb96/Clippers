import React, { useContext, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneDeparture,
  faUtensils,
  faDumbbell,
  faLaptop,
  faGamepad,
  faMasksTheater,
  faBaseballBatBall,
  faShirt,
  faSpa,
} from "@fortawesome/free-solid-svg-icons";
import { SearchContext } from "../../context/SearchContext";

const Filter = () => {
  const { selectedFilters, setSelectedFilters } = useContext(SearchContext);
  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
//These functions allow for the user to scroll through categories when the screen is smaller 
//Based on the position of the scroll it also disables the arrow buttons
  const scrollLeft = () => {
    if (containerRef.current) {
      const newPosition = Math.max(
        scrollPosition - containerRef.current.offsetWidth / 2,
        0
      );
      setScrollPosition(newPosition);
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const maxScrollPosition =
        containerRef.current.scrollWidth - containerRef.current.offsetWidth;
      const newPosition = Math.min(
        scrollPosition + containerRef.current.offsetWidth / 2,
        maxScrollPosition
      );
      setScrollPosition(newPosition);
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  const categories = [
    { id: 1, icon: faPlaneDeparture, name: "Travel" },
    { id: 2, icon: faMasksTheater, name: "Entertainment" },
    { id: 3, icon: faUtensils, name: "Food" },
    { id: 4, icon: faDumbbell, name: "Fitness" },
    { id: 5, icon: faLaptop, name: "Technology" },
    { id: 6, icon: faSpa, name: "Beauty" },
    { id: 7, icon: faGamepad, name: "Gaming" },
    { id: 8, icon: faBaseballBatBall, name: "Sport" },
    { id: 9, icon: faShirt, name: "Fashion" },
  ];

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  return (
    <div className="flex items-center w-full relative">
      <button
        className="absolute left-0 z-10 bg-white bg-opacity-90 hover:text-skyblue text-black font-bold py-2 px-2 disabled:opacity-0"
        onClick={scrollLeft}
        disabled={scrollPosition === 0}
      >
        &lt;
      </button>
      <div
        className="flex xl:justify-center overflow-x-auto scrollbar-hide w-full px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        ref={containerRef}
      >
        <div className="flex gap-4 md:gap-6 lg:gap-8 my-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0"
            >
              <button
                className={`
                  w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                  flex flex-col justify-center items-center
                  rounded-lg bg-white shadow-sm
                  hover:bg-gray-50 hover:text-skyblue
                  transition-all duration-200
                  ${selectedFilters?.includes(category.name) ? "text-skyblue ring-2 ring-skyblue" : "text-gray-500"}
                `}
                onClick={() => handleFilterButtonClick(category.name)}
              >
                <FontAwesomeIcon 
                  icon={category.icon} 
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1"
                />
                <p className="text-[10px] sm:text-xs font-medium">
                  {category.name}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute right-0 z-10 bg-white bg-opacity-90 hover:text-skyblue text-black font-bold py-2 px-2 disabled:opacity-0"
        onClick={scrollRight}
        disabled={
          containerRef.current
            ? scrollPosition >=
              containerRef.current.scrollWidth - containerRef.current.offsetWidth
            : false
        }
      >
        &gt;
      </button>
    </div>
  );
};

export default Filter;