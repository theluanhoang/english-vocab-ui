'use client';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { isTokenExpired } from '@/lib/utils';

export default function TokenExpiryHandler() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken && isTokenExpired(session.accessToken)) {
      signOut({ callbackUrl: '/login' });
    }
  }, [session]);

  return null;
} 