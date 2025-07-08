import React from 'react';
import { Triangle, Square, Circle, Shield, Clock, Trophy, Check } from 'lucide-react';
import MintNFTButton from './MintNFTButton';

const About: React.FC = () => {
  return (
    <section id="about" className="py-6 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Main Title Section - Full-width blur background */}
        <div className="relative mb-8 md:mb-12">
          {/* Full-width blur background */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-screen h-full">
            <div 
              className="w-full h-full bg-gradient-to-r from-pink-500/10 via-purple-500/15 to-pink-500/10"
              style={{
                backdropFilter: 'blur(50px)',
                WebkitBackdropFilter: 'blur(50px)',
              }}
            ></div>
          </div>
          
          {/* Content container */}
          <div className="relative z-10 text-center py-8 md:py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-orbitron font-black text-3xl md:text-5xl mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                6 Weeks. 456 Players. 1 Winner.
              </h2>
              <h3 className="font-rajdhani text-lg md:text-xl font-bold text-yellow-400 mb-6">
                Conquer weekly challenges and take home the $10,000 prize pool.
              </h3>
              <p className="font-rajdhani text-base md:text-lg text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
                Each week, a new elimination game begins. Play anytime, survive eliminations, and claim it all.
              </p>
              <div className="flex justify-center space-x-6">
                <Triangle className="text-red-500 w-6 h-6 animate-bounce" style={{ animationDelay: '0s' }} />
                <Square className="text-yellow-500 w-6 h-6 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <Circle className="text-green-500 w-6 h-6 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        </div>

        {/* NFT Game Pass Section - Tightened mobile spacing */}
        <div id="ticket-section" className="mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-orbitron font-black text-3xl md:text-5xl mb-6 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Your Ticket to the Game
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Large NFT Game Pass Visual - Reduced mobile gap */}
            <div className="relative flex justify-center mb-3 md:mb-6 lg:mb-0">
              <div className="relative">
                <img 
                  src="/gamepasswebsite copy.png" 
                  alt="SOL GAME NFT Game Pass" 
                  className="w-72 h-72 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] object-contain"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(192, 38, 211, 0.6)) drop-shadow(0 0 60px rgba(236, 72, 153, 0.4))',
                    animation: 'breathe 4s ease-in-out infinite'
                  }}
                />
                
                {/* Price Badge Overlay - 10% smaller on mobile */}
                <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-orbitron font-bold text-base md:text-xl shadow-lg border-2 border-yellow-400">
                  💰 0.2 SOL
                </div>
              </div>
            </div>

            {/* Content and CTA - Tightened spacing */}
            <div className="text-center lg:text-left space-y-4 md:space-y-6">
              {/* Description - Reduced gap */}
              <div>
                <p className="font-rajdhani text-lg md:text-xl text-gray-300 leading-relaxed">
                  Mint your Game Pass to enter the survival game. Trade it on secondary markets if you're too scared to play.
                </p>
              </div>

              {/* Bullet Points in Container - Aligned with mint button width */}
              <div className="nft-benefits-container-aligned">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <Check className="text-[#00FFAA] w-4 h-4 flex-shrink-0" />
                    <span className="font-rajdhani text-sm md:text-base text-gray-100 font-bold">Access all 6 weekly games</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Check className="text-[#00FFAA] w-4 h-4 flex-shrink-0" />
                    <span className="font-rajdhani text-sm md:text-base text-gray-100 font-bold">Compete for the $10,000 jackpot</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="text-[#00FFAA] w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span className="font-rajdhani text-sm md:text-base text-gray-100 font-bold leading-tight">Max 5 per wallet, tradable on Magic Eden</span>
                  </div>
                </div>
              </div>

              {/* Regular Mint Button - Added more gap */}
              <div className="flex justify-center lg:justify-start pt-4">
                <MintNFTButton>
                  Mint Game Pass NFT
                </MintNFTButton>
              </div>

              {/* Warning - No borders, just text */}
              <div className="p-4">
                <p className="font-rajdhani text-red-300 text-sm font-bold">
                  ⚠️ Limited spots available. Once the game starts, no new players can join.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section - Updated checklist with constrained width */}
        <div className="enhanced-glass rounded-2xl p-6 md:p-12 relative overflow-hidden max-w-5xl mx-auto">
          {/* Soft glow background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-red-900/20 to-pink-900/20 rounded-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-red-500/5 rounded-2xl"></div>
          
          <div className="relative z-10">
            {/* Title */}
            <div className="text-center mb-6 md:mb-8">
              <h4 className="font-orbitron font-bold text-2xl md:text-3xl text-white mb-3">
                How It Works
              </h4>
              <p className="font-rajdhani text-base md:text-lg text-gray-300">
                Everything you need to know before jumping in.
              </p>
            </div>

            {/* Updated Bullet Points - Minimal spacing */}
            <div className="space-y-3 md:space-y-4 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">👥</span>
                <span className="font-rajdhani text-base md:text-lg text-gray-100 font-medium leading-relaxed">
                  456 players competing
                </span>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">🎮</span>
                <span className="font-rajdhani text-base md:text-lg text-gray-100 font-medium leading-relaxed">
                  6 on-chain survival games
                </span>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">⚡</span>
                <span className="font-rajdhani text-base md:text-lg text-gray-100 font-medium leading-relaxed">
                  One week per round.
                </span>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">🌐</span>
                <span className="font-rajdhani text-base md:text-lg text-gray-100 font-medium leading-relaxed">
                  Play here before time runs out.
                </span>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="text-xl md:text-2xl flex-shrink-0">🏆</span>
                <span className="font-rajdhani text-base md:text-lg text-gray-100 font-medium leading-relaxed">
                  Winner claims $10,000 jackpot
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;