import React, { useRef, useState } from "react";
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
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { ACTIONS, Category } from "../../model";
import { useSearchContext } from "../../context/SearchContext";
import {
  faInstagram,
  faTiktok,
  faXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

// Main Filter component
const Filter = () => {
  // Context hook to get selected filters and dispatch function for state updates
  const { selectedFilters, setSelectedFilters, dispatch } = useSearchContext();

  // Refs and state hooks for managing scroll position and button states
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAscending, setIsAscending] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState<number[]>([]);

  // Function to handle scrolling to the left (for smaller screens)
  const scrollLeft = () => {
    if (containerRef.current) {
      // Calculates the new scroll position, ensuring it doesn't go below 0
      const newPosition = Math.max(
        scrollPosition - containerRef.current.offsetWidth / 2,
        0
      );
      setScrollPosition(newPosition);
      // Smooth scrolling to the new position
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  // Function to handle scrolling to the right
  const scrollRight = () => {
    if (containerRef.current) {
      // Calculates the maximum scroll position
      const maxScrollPosition =
        containerRef.current.scrollWidth - containerRef.current.offsetWidth;
      const newPosition = Math.min(
        scrollPosition + containerRef.current.offsetWidth / 2,
        maxScrollPosition
      );
      setScrollPosition(newPosition);
      // Smooth scrolling to the new position
      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
    }
  };

  // Categories to be displayed, each with an associated icon and name
  const categories: Category[] = [
    { id: 1, icon: faXTwitter, name: "X" },
    { id: 2, icon: faInstagram, name: "Instagram" },
    { id: 3, icon: faTiktok, name: "TikTok" },
    { id: 4, icon: faYoutube, name: "YouTube" },
    { id: 5, icon: faPlaneDeparture, name: "Travel" },
    { id: 6, icon: faMasksTheater, name: "Entertainment" },
    { id: 7, icon: faUtensils, name: "Food" },
    { id: 8, icon: faDumbbell, name: "Fitness" },
    { id: 9, icon: faLaptop, name: "Technology" },
    { id: 10, icon: faSpa, name: "Beauty" },
    { id: 11, icon: faGamepad, name: "Gaming" },
    { id: 12, icon: faBaseballBatBall, name: "Sport" },
    { id: 13, icon: faShirt, name: "Fashion" },
  ];

  // Function to handle category button click (toggle filter state)
  const handleCategoryButtonClick = (selectedCategory: Category) => {
    const isFiltered = selectedFilters.length > 0;
    if (isFiltered) {
      // If filters are already applied, clear them and enable all buttons
      setSelectedFilters([]);
      setDisableButtons(false);
    } else {
      // If no filters are applied, disable all buttons except the clicked category
      setDisabledButtons([
        ...categories
          .map((category) => category.id)
          .filter((id) => id !== selectedCategory.id),
      ]);
      setDisableButtons(true);
      console.log(disabledButtons);
      // Set the clicked category as the selected filter
      setSelectedFilters([selectedCategory]);
    }
  };

  // Function to handle the sort button click (toggle sorting order)
  const handleSortButtonClick = () => {
    setIsAscending(!isAscending);
    dispatch({
      type: ACTIONS.SORT_CLIPPERS,
      payload: { isAscending: isAscending },
    });
  };

  return (
    <div className="flex items-center w-full relative">
      {/* Sort button */}
      <div className="ml-5  mb-2">
        <button
          className="h-8 w-8 bg-white text-center rounded-full border-2 border-gray-500 sm:w-12 sm:h-12"
          onClick={handleSortButtonClick}
        >
          {!isAscending ? (
            <FontAwesomeIcon
              icon={faArrowUp}
              className="text-lg text-gray-500 sm:text-xl md:text-2xl lg:text-2xl"
            />
          ) : (
            <FontAwesomeIcon
              icon={faArrowDown}
              className="text-lg text-gray-500 sm:text-xl md:text-2xl lg:text-2xl"
            />
          )}
        </button>
      </div>

      {/* Left scroll button */}
      <button
        className="z-10 bg-white bg-opacity-90 hover:text-skyblue text-black font-bold py-2 px-2 disabled:opacity-0"
        onClick={scrollLeft}
        disabled={scrollPosition === 0}
      >
        &lt;
      </button>

      {/* Categories container with horizontal scrolling */}
      <div
        className="flex xl:justify-start overflow-x-auto scrollbar-hide w-full px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        ref={containerRef}
      >
        {/* Render category buttons */}
        <div className="flex gap-6 md:gap-6 lg:gap-6 my-4">
          {categories.map((category: Category) => (
            <div key={category.id} className="flex-shrink-0">
              <button
                onClick={() => handleCategoryButtonClick(category)}
                className={`
                   sm:w-20 sm:h-20 md:w-24 md:h-24
                  flex flex-col justify-center items-center
                  rounded-lg transition-all duration-200 
                  ${
                    selectedFilters.some(
                      (filter) => filter.id === category.id
                    ) && "text-skyblue sm:border sm:border-skyblue"
                  } ${
                  disableButtons && disabledButtons.includes(category.id)
                    ? "text-[#FAFAFA] sm:cursor-not-allowed"
                    : "md:hover:text-skyblue"
                }
                `}
                disabled={
                  disableButtons && disabledButtons.includes(category.id)
                }
              >
                <FontAwesomeIcon
                  icon={category.icon}
                  className="text-lg sm:text-xl md:text-2xl lg:text-2xl mb-1"
                />
                <p className="text-[10px] sm:text-xs font-medium">
                  {category.name}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right scroll button */}
      <button
        className="absolute right-0 z-10 bg-white bg-opacity-90 hover:text-skyblue text-black font-bold py-2 px-2 disabled:opacity-0"
        onClick={scrollRight}
        disabled={
          containerRef.current
            ? scrollPosition >=
              containerRef.current.scrollWidth -
                containerRef.current.offsetWidth
            : false
        }
      >
        &gt;
      </button>
    </div>
  );
};

export default Filter;
