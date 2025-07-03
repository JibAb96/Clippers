"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/**
 * Icon Wrapper Component
 * 
 * A wrapper component that safely renders FontAwesome icons with fallback handling
 * to prevent runtime errors if icons are not available.
 */
interface IconWrapperProps {
  icon: IconDefinition;
  className?: string;
  size?: "xs" | "sm" | "lg" | "1x" | "2x" | "3x";
}

const IconWrapper: React.FC<IconWrapperProps> = ({ 
  icon, 
  className = "", 
  size = "1x" 
}) => {
  try {
    return (
      <FontAwesomeIcon 
        icon={icon} 
        className={className}
        size={size}
      />
    );
  } catch {
    // Fallback to a simple div if icon fails to load
    console.warn(`Icon failed to load: ${icon.iconName}`);
    return (
      <div className={`w-4 h-4 bg-current rounded ${className}`} />
    );
  }
};

export default IconWrapper; 