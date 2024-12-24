import React, { useContext } from "react";
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
  //states from SearchContexts to list the filters that have/has been selected
  const { selectedFilters, setSelectedFilters } = useContext(SearchContext);
// List of categories with respective icon
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
// Fucntion to track which button has been selected and to update selectedFilter state
  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };
  return (
    /*Here we map through each object in categories and create a section with all the categories
    displayed and styled with tailwind. Also checks if button has already been selected to style
    accordingly*/
    <div className="flex text-gray-500 text-4xl gap-12 mt-5 justify-center">
      {categories.map((category) => (
        <button
          className={`${
            selectedFilters?.includes(category.name) ? "text-skyblue" : ""
          } w-20 flex-col text-center `}
          onClick={() => handleFilterButtonClick(category.name)}
        >
          <FontAwesomeIcon icon={category.icon} />
          <p className="text-xs font-semibold">{category.name}</p>
        </button>
      ))}
    </div>
  );
};

export default Filter;
