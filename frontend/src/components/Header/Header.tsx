import React from "react";
import Logo from "./Logo";
import NavigationButton from "./Navigation/NavigationButton";
import CTAButton from "../Buttons/CTAButton";

// Header that wil be featured through out the page inclusing Logo, Navigation Button and
// link to become a clipper 
const Header = () => {
  return (
    <div className="w-full absolute top-0 left-0 z-50 py-4 flex justify-between bg-white bg-opacity-10">
      <Logo />
      <CTAButton CustomClass="hidden absolute right-32 top-5" CTAM="Become a Clipper"/>
      <NavigationButton/>
    </div>
  );
};

export default Header;
