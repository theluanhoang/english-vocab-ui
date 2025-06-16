'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useSessionExpired() {
  const { status } = useSession();
  const router = useRouter();

  const handleSessionExpired = () => {
    if (status === 'unauthenticated') {
      toast.error('Your session has expired', {
        description: 'Please sign in again to continue',
        action: {
          label: 'Sign In',
          onClick: () => router.push('/login'),
        },
        duration: 5000,
      });
    }
  };

  return {
    handleSessionExpired,
  };
} 