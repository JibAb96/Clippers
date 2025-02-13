import React from "react";
import Logo from "./Logo";
import NavigationButton from "./NavigationButton";
import CTAButton from "../../components/CTAButton";

/**
 * Header Component
 *
 * A responsive header component that adapts its appearance based on scroll position
 * and current route. Features a logo, navigation menu, search functionality, and CTA button.
 *
 * Key features:
 * - Collapsible search bar on scroll
 * - Dynamic height adjustment
 * - Route-specific rendering
 * - Smooth transitions
 */
const Header = () => {
  // State management for UI interactions
  // Check if current route is the search page (home route)
  return (
    <header>
      {/* Spacer div that adjusts height based on scroll position */}
      <div className="lg:h-20 transition-all duration-300" />

      {/* Main header container with dynamic height and positioning */}
      <div
        className="bg-primary fixed w-full z-30 top-0 left-0 right-0 lg:transition-all lg:duration-300 lg:ease-in-out
           h-20
            "
      >
        {/* Upper section containing logo, CTA button, and navigation */}
        <div
          className="w-full top-0 left-0 py-4 flex justify-between lg:transition-all lg:duration-300
           lg:h-20"
        >
          <Logo />
          <CTAButton
            CustomClass="hidden absolute right-32 top-5"
            Text={"Become a Clipper"}
            onClick={"/dashboard/clipper"}
            AriaLabel="navigation-button"
          />
          <NavigationButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
