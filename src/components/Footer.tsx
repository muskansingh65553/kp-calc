'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-purple-800/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-[2rem] mx-auto max-w-7xl my-4">
      <div className="container py-8 px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-[#3B1E54] font-medium text-center md:text-left">
            Built with modern web technologies for seamless calculations
          </p>
          <nav className="flex items-center space-x-8">
            <Link href="/about" className="text-sm text-[#3B1E54] hover:text-purple-400 transition-colors font-medium">
              About
            </Link>
            <Link href="/contact" className="text-sm text-[#3B1E54] hover:text-purple-400 transition-colors font-medium">
              Contact
            </Link>
            <Link href="/privacy" className="text-sm text-[#3B1E54] hover:text-purple-400 transition-colors font-medium">
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
