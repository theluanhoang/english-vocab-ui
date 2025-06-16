import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

interface SessionExpiredContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SessionExpiredContext = createContext<SessionExpiredContextType | undefined>(undefined);

export function SessionExpiredProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { status } = useSession();

  useEffect(() => {
    if (pathname === "/login") setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (status === "authenticated") setOpen(false);
  }, [status]);

  return (
    <SessionExpiredContext.Provider value={{ open, setOpen }}>
      {children}
    </SessionExpiredContext.Provider>
  );
}

export function useSessionExpired() {
  const context = useContext(SessionExpiredContext);
  if (context === undefined) {
    throw new Error('useSessionExpired must be used within a SessionExpiredProvider');
  }
  return context;
} 