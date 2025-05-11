"use client";
import React from "react";

type Props = {
  CustomClass: string;
  Text: string;
  onClick?: () => void;
  AriaLabel: string;
};
const EmptyButton = ({ CustomClass, Text, onClick, AriaLabel }: Props) => {
  return (
    // Reusable call to action button
    <button
      type="button"
      onClick={onClick}
      className={`${CustomClass} sm:block text-primary rounded-full font-medium text-sm px-3 h-12 text-center`}
      aria-label={AriaLabel}
    >
      {Text}
    </button>
  );
};

export default EmptyButton;
