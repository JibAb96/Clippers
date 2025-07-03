"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  CustomClass?: string;
  children: React.ReactNode;
  onClick?: string | (() => void);
  "aria-label"?: string;
  type?: "button" | "submit" | "reset" | undefined;
  AriaLabel?: string;
  disabled?: boolean;
};
const CTAButton = ({
  CustomClass,
  onClick,
  children,
  type = "button",
  disabled,
  AriaLabel,
  ...props
}: Props) => {
  const router = useRouter();
  return (
    // Reusable call to action button
    <button
      type={type}
      onClick={
        typeof onClick === "string" ? () => router.push(onClick) : onClick
      }
      className={`${CustomClass} sm:block text-white rounded-full bg-gradient-to-r from-blue-700 to-secondary font-medium text-sm px-3 h-12 text-center`}
      disabled={disabled}
    aria-label={AriaLabel}
      {...props}
    >
      {children}
    </button>
  );
};

export default CTAButton;
