'use client';

import Link from 'next/link';
import { ThemeToggle } from '../atoms/ThemeToggle';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-light bg-bg-card/80 backdrop-blur-lg">
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
          <div className="flex items-center space-x-4 pl-4 border-l border-border-light">
            <ThemeToggle />
            <Link 
              href="/login" 
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-hover-primary transition-colors"
            >
              Sign In
            </Link>
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
          <div className="pt-4 border-t border-border-light">
            <Link 
              href="/login" 
              className="block px-4 py-2 rounded-lg bg-primary text-white hover:bg-hover-primary transition-colors text-center"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}