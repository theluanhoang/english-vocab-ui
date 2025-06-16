'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function SessionExpiredToast() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', {
        duration: 5000,
        action: {
          label: 'Đăng nhập',
          onClick: () => router.push('/login'),
        },
      });
    }
  }, [status, router]);

  return null;
} 