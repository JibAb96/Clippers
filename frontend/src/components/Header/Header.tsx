import React, { useState, useEffect } from "react";
import Logo from "../Utilities/Logo";
import NavigationButton from "../Navigation/NavigationButton";
import CTAButton from "../Buttons/CTAButton";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "../Utilities/SearchBar";
import { useSearchContext } from "../../context/SearchContext";

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
  const { user } = useSearchContext();

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
    if (!isSearchPage) return; // Early return if not on search page
  
    // Create media query for lg breakpoint (1024px)
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    
    const handleScroll = () => {
      // Only run if media query matches
      if (!mediaQuery.matches) return;
  
      const scrollPosition = window.scrollY;
      // Update states based on scroll position
      setIsScrolled(scrollPosition > 100);
      setIsTitleHidden(scrollPosition > 100);
      // Collapse search bar if expanded and user scrolls past threshold
      if (scrollPosition > 50 && isSearchExpanded) {
        setIsSearchExpanded(false);
      }
    };
  
    // Add scroll event listener if conditions are met
    window.addEventListener("scroll", handleScroll);
    
    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSearchExpanded, isSearchPage]);
  

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
    <header>
      {/* Spacer div that adjusts height based on scroll position */}
      <div
        className={`h-${isScrolled ? `lg:24` : `lg:40`} transition-all duration-300`}
      />

      {/* Main header container with dynamic height and positioning */}
      <div
        className={
          ` w-full z-50 top-0 left-0 right-0 lg:transition-all lg:duration-300 lg:ease-in-out
          ${isSearchPage ? isScrolled && !isSearchExpanded ? `lg:fixed md:h-20 bg-primary`: `lg:fixed md:h-56 ` : `h-20 absolute`} `}>
        {/* Upper section containing logo, CTA button, and navigation */}
        <div
          className={`w-full top-0 left-0 py-4 flex justify-between lg:transition-all lg:duration-300
            ${isScrolled && !isSearchExpanded ? "lg:h-24" : "lg:h-20"}`}
        >
          <Logo />
          <CTAButton
            CustomClass="hidden absolute right-32 top-5"
            Text={user?.role !== "clipper" ? "Become a Clipper" : "Become a Creator"}
            onClick={() => navigate("/registrater")}
            AriaLabel="navigation-button"
          />
          <NavigationButton />
        </div>

        {/* Conditional rendering of search section for search page */}
        {isSearchPage && (
          <div>
            {/* Title section with conditional visibility */}
            {!isTitleHidden && (
              <div>
                <h1 className="font-bold font-leagueSpartan text-3xl text-black text-center pt-8 md:pt-1 lg:transition-all lg:duration-300 lg:ease-in-out">
                  Discover
                  <span className="text-secondary font-DM font-bold tracking-wide">
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
    </header>
  );
};

export default Header;