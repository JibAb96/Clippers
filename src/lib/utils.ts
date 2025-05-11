import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}
export const capitalizeFirstLetter = (str: string) => {
    if (!str) return ""; // handle empty strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  };