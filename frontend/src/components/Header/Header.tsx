import React, { useState, useEffect } from "react";
import Logo from "../Utilities/Logo";
import NavigationButton from "../Navigation/NavigationButton";
import CTAButton from "../Buttons/CTAButton";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../Utilities/SearchBar";

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
  const navigate = useNavigate();
  const location = useLocation();

  // State management for UI interactions
  const [isScrolled, setIsScrolled] = useState(false);        // Tracks if page is scrolled past threshold
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);  // Controls search bar expansion
  const [isTitleHidden, setIsTitleHidden] = useState(false);  // Controls title visibility
  const [isSearchPage, setIsSearchPage] = useState(false);    // Determines if current page is search page

  // Check if current route is the search page (home route)
  useEffect(() => {
    if (location.pathname === "/") {
      setIsSearchPage(true);
    } else {
      setIsSearchPage(false);
    }
  }, [location.pathname]);

  // Handle scroll events and update UI accordingly
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Update states based on scroll position
      setIsScrolled(scrollPosition > 100);
      setIsTitleHidden(scrollPosition > 100);
      
      // Collapse search bar if expanded and user scrolls past threshold
      if (scrollPosition > 50 && isSearchExpanded) {
        setIsSearchExpanded(false);
      }
    };

    // Add scroll event listener with cleanup
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSearchExpanded]);

  /**
   * Toggles search bar expansion state when scrolled
   * Updates title visibility based on search expansion state
   */
  const handleSearchClick = () => {
    if (isScrolled) {
      setIsSearchExpanded(!isSearchExpanded);
      setIsTitleHidden(isSearchExpanded);
    }
  };

  return (
    <>
      {/* Spacer div that adjusts height based on scroll position */}
      <div
        className={`h-${isScrolled ? `lg:24` : `lg:40`} transition-all duration-300`}
      />

      {/* Main header container with dynamic height and positioning */}
      <div
        className={`lg:fixed w-full bg-[#FAFAFA] z-50 top-0 left-0 right-0 transition-all duration-300 ease-in-out  ${
          !isSearchPage ? `md:h-20` : isScrolled && !isSearchExpanded ? `md:h-24` : `md:h-56`
        } `}
      >
        {/* Upper section containing logo, CTA button, and navigation */}
        <div
          className={`w-full top-0 left-0 py-4 flex justify-between transition-all duration-300
            ${isScrolled && !isSearchExpanded ? "lg:h-24" : "lg:h-20"}`}
        >
          <Logo />
          <CTAButton
            CustomClass="hidden absolute right-32 top-5"
            CTAM="Become a Clipper"
            onClick={() => navigate("/clipper")}
          />
          <NavigationButton />
        </div>

        {/* Conditional rendering of search section for search page */}
        {isSearchPage && (
          <div>
            {/* Title section with conditional visibility */}
            {!isTitleHidden && (
              <div>
                <h1 className="font-bold font-DM text-3xl text-black text-center pt-1 transition-all duration-300 ease-in-out">
                  Discover
                  <span className="text-skyblue font-DM font-bold tracking-wide">
                    {" "}
                    clippers
                  </span>
                  , Amplify Your Reach
                </h1>
              </div>
            )}
            
            {/* Search bar container with dynamic positioning */}
            <div
              className={`flex justify-center transition-all duration-300
            ${isScrolled && !isSearchExpanded ? "lg:-mt-20 lg:pb-2" : "mt-8"}`}
            >
              <SearchBar
                isScrolled={isScrolled}
                isSearchExpanded={isSearchExpanded}
                handleSearchClick={handleSearchClick}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;