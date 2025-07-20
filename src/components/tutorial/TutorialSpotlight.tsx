"use client";
import React, { useEffect, useState } from "react";

interface TutorialSpotlightProps {
  targetElement: HTMLElement;
}

const TutorialSpotlight: React.FC<TutorialSpotlightProps> = ({
  targetElement,
}) => {
  const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!targetElement) return;

    const updateSpotlight = () => {
      const rect = targetElement.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;

      // Calculate spotlight position and size
      const centerX = rect.left + scrollLeft + rect.width / 2;
      const centerY = rect.top + scrollTop + rect.height / 2;

      // Make spotlight slightly larger than the element
      const radius = Math.max(rect.width, rect.height) / 2 + 20;

      // Create a radial gradient mask
      const maskStyle = `radial-gradient(circle at ${centerX}px ${centerY}px, transparent ${radius}px, rgba(0,0,0,0.7) ${
        radius + 5
      }px)`;

      setSpotlightStyle({
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 45,
        background: "rgba(0, 0, 0, 0.7)",
        mask: maskStyle,
        WebkitMask: maskStyle,
        transition: "all 0.3s ease-in-out",
        pointerEvents: "none",
      });
    };

    updateSpotlight();

    // Update on scroll and resize
    const handleUpdate = () => updateSpotlight();
    window.addEventListener("scroll", handleUpdate);
    window.addEventListener("resize", handleUpdate);

    return () => {
      window.removeEventListener("scroll", handleUpdate);
      window.removeEventListener("resize", handleUpdate);
    };
  }, [targetElement]);

  return <div style={spotlightStyle} />;
};

export default TutorialSpotlight;
