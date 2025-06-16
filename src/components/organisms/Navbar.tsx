'use client';

import Link from 'next/link';
import { ThemeToggle } from '../atoms/ThemeToggle'; 
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSession, signOut } from 'next-auth/react';
import Avatar from '../atoms/Avatar';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('Session in Navbar:', session);
    }
  }, [status, session]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="sticky top-0 z-50 shadow-lg w-full bg-bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-[var(--logo-start)] via-[var(--logo-middle)] to-[var(--logo-end)] bg-clip-text text-transparent">
            OxMaster
          </span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link 
            href="/learn" 
            className="text-text-secondary hover:text-primary font-medium transition-colors relative group"
          >
            Learn
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
          <Link 
            href="/practice" 
            className="text-text-secondary hover:text-primary font-medium transition-colors relative group"
          >
            Practice
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
          <Link 
            href="/dictionary" 
            className="text-text-secondary hover:text-primary font-medium transition-colors relative group"
          >
            Dictionary
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
          <Link 
            href="/word-forms" 
            className="text-text-secondary hover:text-primary font-medium transition-colors relative group"
          >
            Word Forms
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
          <Link 
            href="/collections" 
            className="text-text-secondary hover:text-primary font-medium transition-colors relative group"
          >
            Collections
            <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
          </Link>
          <div className="flex items-center space-x-4 pl-4 border-l border-border-light">
            <ThemeToggle />
            {status === 'loading' ? (
              <div className="h-8 w-20 bg-background-subtle animate-pulse rounded-lg"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors"
                >
                  <Avatar email={session.user?.email || ''} size={32} />
                  <span className="hidden md:block">{session.user?.name || session.user?.email}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-bg-card shadow-lg py-1 border border-border">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-text-secondary hover:bg-background-subtle transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-text-secondary hover:bg-background-subtle transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleSignOut();
                      }}
                      className="w-full text-left px-4 py-2 text-text-secondary hover:bg-background-subtle transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                href="/login" 
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-hover-primary transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-background-subtle transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden py-4 space-y-4">
          <Link 
            href="/learn" 
            className="block text-text-secondary hover:text-primary font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Learn
          </Link>
          <Link 
            href="/practice" 
            className="block text-text-secondary hover:text-primary font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Practice
          </Link>
          <Link 
            href="/dictionary" 
            className="block text-text-secondary hover:text-primary font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Dictionary
          </Link>
          <Link 
            href="/word-forms" 
            className="block text-text-secondary hover:text-primary font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Word Forms
          </Link>
          <Link 
            href="/collections" 
            className="block text-text-secondary hover:text-primary font-medium transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Collections
          </Link>
          <div className="pt-4 border-t border-border-light">
            {status === 'loading' ? (
              <div className="h-8 w-full bg-background-subtle animate-pulse rounded-lg"></div>
            ) : session ? (
              <>
                <div className="flex items-center space-x-2 px-4 py-2">
                  <Avatar email={session.user?.email || ''} size={32} />
                  <span className="text-text-secondary">
                    {session.user?.name || session.user?.email}
                  </span>
                </div>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-text-secondary hover:bg-background-subtle transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-4 py-2 text-text-secondary hover:bg-background-subtle transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  className="w-full text-left px-4 py-2 text-text-secondary hover:bg-background-subtle transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="block px-4 py-2 text-text-secondary hover:bg-background-subtle transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}