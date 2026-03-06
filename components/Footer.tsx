import React from 'react';
import Link from 'next/link';

const Footer = () => {
  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="relative py-8 px-4 border-t border-cyber-blue/20 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyber-blue/5 via-transparent to-transparent pointer-events-none" />
      
      {/* Animated background cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-cyber-blue/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          {/* Copyright text with card effect */}
          <div className="group relative">
  <div className="absolute -inset-1 bg-gradient-to-r from-cyber-blue/20 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300" />
  <p className="relative text-sm sm:text-base text-gray-500 text-center md:text-left px-3 py-2 rounded-lg hover:text-gray-300 transition-all duration-300">
    © 2026 Front-End Developer Portfolio. 
    <span className="block sm:inline sm:ml-1 text-cyber-blue/60">
      Experienced in React & Next.js • <a href="#contact" className="underline hover:text-cyber-blue transition-colors">Open for opportunities</a>
    </span>
  </p>
</div>

          {/* Navigation with card effects */}
          <nav className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative px-3 py-2 sm:px-4"
              >
                {/* Card background effect */}
                <div className="absolute inset-0 bg-cyber-blue/0 group-hover:bg-cyber-blue/10 rounded-lg transition-all duration-300 transform group-hover:scale-110" />
                
                {/* Border glow effect */}
                <div className="absolute inset-0 border border-cyber-blue/0 group-hover:border-cyber-blue/30 rounded-lg transition-all duration-300" />
                
                {/* Shadow effect */}
                <div className="absolute inset-0 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-cyber-blue/20" />
                
                {/* Text */}
                <span className="relative text-xs sm:text-sm text-gray-500 group-hover:text-cyber-blue transition-colors duration-300">
                  {item.label}
                </span>

                {/* Hover indicator line */}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-cyber-blue group-hover:w-1/2 group-hover:left-0 transition-all duration-300" />
                <span className="absolute bottom-0 right-1/2 w-0 h-0.5 bg-cyber-blue group-hover:w-1/2 group-hover:right-0 transition-all duration-300" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile divider with animation */}
        <div className="mt-6 md:hidden relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent" />
        </div>

        {/* Additional info for mobile */}
        <div className="mt-4 text-center md:hidden">
          <span className="text-xs text-gray-600 hover:text-cyber-blue/60 transition-colors duration-300 cursor-default">
            ✦ Full Stack Developer ✦
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }
        
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;