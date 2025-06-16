import React from "react";
import { AlertTriangle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSessionExpired } from '@/contexts/SessionExpiredContext';

export default function SessionExpiredModal() {
  const pathname = usePathname();
  const { open } = useSessionExpired();
  if (pathname === "/login" || !open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center border-2 border-red-500 min-w-[340px] max-w-[90vw] animate-fade-in pointer-events-auto">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 mb-4 border-2 border-red-400">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-red-600 dark:text-red-400 text-center">Phiên đăng nhập đã hết hạn</h2>
        <p className="mb-6 text-center text-zinc-700 dark:text-zinc-200">Đang chuyển hướng về trang đăng nhập...</p>
      </div>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.25s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
} 