import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function untuk menggabungkan classNames dengan Tailwind
// Menggunakan clsx dan tailwind-merge untuk optimalisasi

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
