import React from "react";

type Props = {
  CustomClass: string;
  Text: string;
  onClick?: () => void;
  AriaLabel: string;
};
const CTAButton = ({ CustomClass, Text, onClick, AriaLabel }: Props) => {
  return (
    // Reusable call to action button
    <button
      type="button"
      onClick={onClick}
      className={`${CustomClass} sm:block text-white rounded-full bg-gradient-to-r from-blue-700 to-secondary font-medium text-sm px-3 h-12 text-center`}
      aria-label={AriaLabel}
    >
      {Text}
    </button>
  );
};

export default CTAButton;
