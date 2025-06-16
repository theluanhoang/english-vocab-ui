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