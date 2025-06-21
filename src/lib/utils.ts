import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getSession } from "next-auth/react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getHeaders() {
  const session = await getSession();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${session?.accessToken}`,
  };
}

export function isTokenExpired(token?: string) {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
} 

export function getTagColor(partOfSpeech: string) {
  switch (partOfSpeech.toLowerCase()) {
      case 'verb':
          return 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900';
      case 'noun':
          return 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900';
      case 'adjective':
          return 'bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900';
      case 'adverb':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900';
      case 'participle':
          return 'bg-pink-100 text-pink-800 dark:bg-pink-200 dark:text-pink-900';
      default:
          return 'bg-gray-200 text-gray-800 dark:bg-gray-300 dark:text-gray-900';
  }
}