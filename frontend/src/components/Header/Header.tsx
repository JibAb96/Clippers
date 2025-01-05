import React from "react";
import Logo from "./Logo";
import NavigationButton from "./Navigation/NavigationButton";
import CTAButton from "../Buttons/CTAButton";
import { useNavigate } from "react-router-dom";

// Header that wil be featured through out the page inclusing Logo, Navigation Button and
// link to become a clipper
const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full absolute top-0 left-0 z-50 py-4 flex justify-between bg-white bg-opacity-10">
      <Logo />
      <CTAButton
        CustomClass="hidden absolute right-32 top-5"
        CTAM="Become a Clipper"
        onClick={() => navigate("/clipper")}
      />
      <NavigationButton />
    </div>
  );
};

export default Header;
