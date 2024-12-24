import React from "react";
import Logo from "./Logo.js";
import NavigationButton from "./Navigation/NavigationButton.js";

// Header that wil be featured through out the page inclusing Logo, Navigation Button and
// link to become a clipper 

const Header = () => {
  return (
    <div className="w-100 flex justify-between p-5">
      <Logo />
      <h1 className="mt-4 ml-[40rem] font-semibold hover:text-skyblue cursor-pointer">
        Become a Clipper
      </h1>
      <NavigationButton className="flex-end" />
    </div>
  );
};

export default Header;
