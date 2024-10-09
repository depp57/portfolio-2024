import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pick<T extends {}, K extends keyof T>(obj: T, ...keys: K[]) {
  return Object.fromEntries(keys.filter((key) => key in obj).map((key) => [key, obj[key]])) as Pick<T, K>;
}
