import React from "react";

type Props = {
  CustomClass: string
  CTAM: string
  onClick?: () => void
}
const CTAButton = ({CustomClass, CTAM, onClick}: Props) => {
  return (
    // Reusable call to action button 
    <button
      type="button"
      onClick={onClick}
      className={`${CustomClass} sm:block  text-white rounded-full bg-gradient-to-r from-blue-700 to-skyblue hover:bg-gradient-to-br from-cyan-500 to-cyan-500 font-medium text-sm px-3 h-12 text-center`}
    >
       {CTAM}
    </button>
  );
};

export default CTAButton
