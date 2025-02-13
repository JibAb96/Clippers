"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";

const DynamicTitleSection = () => {
  const [isTitleHidden, setIsTitleHidden] = useState(false); // Controls title visibility
  const [isScrolled, setIsScrolled] = useState(false); // Tracks if page is scrolled past threshold
  const [isSearchExpanded, setIsSearchExpanded] = useState(false); // Controls search bar expansion
  // Handle scroll events and update UI accordingly
  useEffect(() => {
    // Create media query for lg breakpoint (1024px)
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleScroll = () => {
      // Only run if media query matches
      if (!mediaQuery.matches) return;

      const scrollPosition = window.scrollY;
      // Update states based on scroll position
      setIsScrolled(scrollPosition >= 70);
      setIsTitleHidden(scrollPosition >= 70);
      // Collapse search bar if expanded and user scrolls past threshold
      if (scrollPosition >= 50 && isSearchExpanded) {
        setIsSearchExpanded(false);
      }
    };

    // Add scroll event listener if conditions are met
    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
    <div
      className={`lg:fixed bg-primary w-full left-0 right-0 lg:transition-all lg:duration-300 lg:ease-in-out ${
        isScrolled && !isSearchExpanded
          ? `flex justify-center md:h-0 z-30`
          : `md:h-48 `
      }`}
    >
      {/* Title section with conditional visibility */}
      {!isTitleHidden && (
        <div className="pt-24 lg:pt-8">
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
        className={`${
          isScrolled && !isSearchExpanded ? `md:-mt-16` : `pt-8 md:pt-12 `
        } px-2 sm:px-10`}
      >
        <SearchBar
          isScrolled={isScrolled}
          isSearchExpanded={isSearchExpanded}
          handleSearchClick={handleSearchClick}
        />
      </div>
    </div>
  );
};

export default DynamicTitleSection;
