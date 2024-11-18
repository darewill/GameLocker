import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and resolves conflicts using tailwind-merge.
 * 
 * @param  {...any} inputs Class names or conditional class objects
 * @returns {string} A merged string of class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
