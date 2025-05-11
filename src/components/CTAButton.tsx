"use client"
import React from "react";
import { useRouter } from "next/navigation"

type Props = {
  CustomClass?: string;
  Text: string;
  onClick?: string | (() => void);  
  AriaLabel: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean
};
const CTAButton = ({ CustomClass, onClick, Text, AriaLabel, type = "button", disabled }: Props) => {
const router = useRouter();
  return (
    // Reusable call to action button
    <button
      type={type}
      onClick={typeof onClick === "string" ? () => router.push(onClick) : onClick}
      className={`${CustomClass} sm:block text-white rounded-full bg-gradient-to-r from-blue-700 to-secondary font-medium text-sm px-3 h-12 text-center`}
      aria-label={AriaLabel}
      disabled={disabled}
    >
      {Text}
    </button>
  );
};

export default CTAButton;
