'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-800/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-[2rem] mx-auto max-w-7xl my-4">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center space-x-3">
          <span className="text-2xl">🧮</span>
          <span className="hidden font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Calculator Suite
          </span>
        </Link>
        
        {/* Desktop Menu - Right Aligned */}
        <nav className="hidden md:flex space-x-8 ml-auto">
          <Link href="/" className="text-sm text-[#3B1E54] hover:text-purple-400 transition-colors font-medium">
            Home
          </Link>
          <Link href="/calculators/math" className="text-sm text-[#3B1E54] hover:text-purple-400 transition-colors font-medium">
            Math
          </Link>
          <Link href="/calculators/scientific" className="text-sm text-[#3B1E54] hover:text-purple-400 transition-colors font-medium">
            Scientific
          </Link>
          <Link href="/calculators/financial" className="text-sm text-[#3B1E54] hover:text-purple-400 transition-colors font-medium">
            Financial
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#3B1E54] hover:text-purple-400 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 px-6 py-6 bg-background/95 backdrop-blur rounded-b-[2rem] border-t border-purple-800/20">
            <Link href="/" className="text-sm text-[#3B1E54] hover:text-purple-400 transition-colors text-right font-medium">
              Home
            </Link>
            <Link href="/calculators/math" className="text-sm text-[#3B1E54] hover:text-purple-400 transition-colors text-right font-medium">
              Math
            </Link>
            <Link href="/calculators/scientific" className="text-sm text-[#3B1E54] hover:text-purple-400 transition-colors text-right font-medium">
              Scientific
            </Link>
            <Link href="/calculators/financial" className="text-sm text-[#3B1E54] hover:text-purple-400 transition-colors text-right font-medium">
              Financial
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
