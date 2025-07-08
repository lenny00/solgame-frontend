import React, { useState } from 'react';
import { ExternalLink, Triangle, Square, Circle } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { name: 'Telegram', url: 'http://t.me/solgamefun', icon: '📱' },
    { name: 'Twitter', url: 'https://x.com/solgamefun', icon: '🐦' }
  ];

  return (
    <footer className="py-8 md:py-12 px-4 border-t border-red-900/30 relative">
      <div className="max-w-6xl mx-auto">
        {/* Desktop: 3 columns, Mobile: Logo + 2 columns below */}
        <div className="mb-8 md:mb-12">
          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Logo & Description - Full width on mobile */}
            <div className="text-center mb-6">
              <h3 className="font-orbitron font-bold text-3xl text-white mb-3">
                SOL GAME
              </h3>
              <p className="font-rajdhani text-gray-300 leading-relaxed">
                The ultimate memecoin survival game. Built on Solana, powered by degens, 
                inspired by Squid Game.
              </p>
            </div>

            {/* Quick Links & Social Links - Side by side on mobile */}
            <div className="grid grid-cols-2 gap-6">
              {/* Quick Links */}
              <div className="text-center">
                <h4 className="font-rajdhani font-bold text-lg text-red-400 mb-4">
                  Quick Links
                </h4>
                <div className="space-y-2">
                  <a 
                    href="#about" 
                    className="block font-rajdhani text-gray-300 hover:text-white transition-colors text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    About
                  </a>
                  <a 
                    href="#how-to-play" 
                    className="block font-rajdhani text-gray-300 hover:text-white transition-colors text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('how-to-play')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    How to Play
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="text-center">
                <h4 className="font-rajdhani font-bold text-lg text-yellow-400 mb-4">
                  Join the Game
                </h4>
                <div className="space-y-2">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 font-rajdhani text-gray-300 hover:text-white transition-colors group text-sm"
                    >
                      <span>{link.icon}</span>
                      {link.name}
                      <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - 3 columns */}
          <div className="hidden md:grid md:grid-cols-3 md:gap-12">
            {/* Logo & Description */}
            <div className="text-center md:text-left">
              <h3 className="font-orbitron font-bold text-3xl text-white mb-4">
                SOL GAME
              </h3>
              <p className="font-rajdhani text-gray-300 leading-relaxed">
                The ultimate memecoin survival game. Built on Solana, powered by degens, 
                inspired by Squid Game.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="font-rajdhani font-bold text-xl text-red-400 mb-6">
                Quick Links
              </h4>
              <div className="space-y-3">
                <a 
                  href="#about" 
                  className="block font-rajdhani text-gray-300 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  About
                </a>
                <a 
                  href="#how-to-play" 
                  className="block font-rajdhani text-gray-300 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('how-to-play')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  How to Play
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="text-center md:text-right">
              <h4 className="font-rajdhani font-bold text-xl text-yellow-400 mb-6">
                Join the Game
              </h4>
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center md:justify-end gap-2 font-rajdhani text-gray-300 hover:text-white transition-colors group"
                  >
                    <span>{link.icon}</span>
                    {link.name}
                    <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Game Symbols */}
        <div className="flex justify-center space-x-8 mb-6">
          <Triangle className="text-red-500 w-6 h-6 animate-pulse" />
          <Square className="text-yellow-500 w-6 h-6 animate-pulse" style={{ animationDelay: '0.2s' }} />
          <Circle className="text-green-500 w-6 h-6 animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Bottom Text */}
        <div className="text-center space-y-3">
          <p className="font-rajdhani text-gray-500">
            © 2025 SOL GAME. All rights reserved. Play responsibly.
          </p>
          <p className="font-rajdhani text-sm text-gray-600">
            This is a survival game for entertainment purposes. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;