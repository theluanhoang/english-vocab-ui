import { signOut } from "next-auth/react";

let showSessionExpiredModal: (() => void) | null = null;

export const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

export function setShowSessionExpiredModal(callback: () => void) {
  showSessionExpiredModal = callback;
}

export default async function http(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(`${apiUrl}${input}`, init);
  if (res.status === 401) {
    // Clear session and redirect immediately
    await signOut({ redirect: false });
    window.location.replace("/login");
    throw new Error("Unauthorized");
  }
  return res;
} 