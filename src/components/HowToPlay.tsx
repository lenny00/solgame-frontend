import React from 'react';
import { Wallet, DollarSign, Clock, Gamepad2, Trophy } from 'lucide-react';

const HowToPlay: React.FC = () => {
  const steps = [
    {
      icon: <Wallet className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Connect Wallet",
      description: "Phantom or any compatible wallet.",
      color: "text-purple-500"
    },
    {
      icon: <DollarSign className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Mint NFT Pass",
      description: "0.2 SOL entry ticket.",
      color: "text-red-500"
    },
    {
      icon: <Clock className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Wait for Start",
      description: "Game starts when countdown ends.",
      color: "text-yellow-500"
    },
    {
      icon: <Gamepad2 className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Play On-Chain Games",
      description: "Survive each elimination round.",
      color: "text-pink-500"
    },
    {
      icon: <Trophy className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Win the Jackpot",
      description: "The last player wins all.",
      color: "text-green-500"
    }
  ];

  return (
    <section id="how-to-play" className="py-12 md:py-16 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-orbitron font-black text-3xl md:text-5xl mb-4 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            How to Play
          </h2>
          <p className="font-rajdhani text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Five steps to enter the most dangerous survival game in crypto.
          </p>
        </div>

        {/* Steps Layout */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop: Single row */}
          <div className="hidden md:flex md:justify-center gap-6">
            {steps.map((step, index) => (
              <div key={index} className="flex-1">
                <div className="frosted-glass border border-gray-800 rounded-xl p-4 text-center hover:border-red-500/50 transition-all duration-300 hover:scale-105 h-full">
                  {/* Icon and Number */}
                  <div className="mb-3">
                    <div className={`${step.color} mb-2 flex justify-center`}>
                      {step.icon}
                    </div>
                    <div className="font-orbitron font-bold text-xl text-white">
                      {index + 1}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-rajdhani font-bold text-lg text-white mb-2 leading-tight">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="font-rajdhani text-gray-300 text-sm leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Two rows - 3 steps on top, 2 steps centered below */}
          <div className="md:hidden space-y-4">
            {/* First row: Steps 1, 2, 3 */}
            <div className="grid grid-cols-3 gap-3">
              {steps.slice(0, 3).map((step, index) => (
                <div key={index}>
                  <div className="frosted-glass border border-gray-800 rounded-xl p-3 text-center hover:border-red-500/50 transition-all duration-300 h-full">
                    {/* Icon and Number */}
                    <div className="mb-2">
                      <div className={`${step.color} mb-1 flex justify-center`}>
                        {step.icon}
                      </div>
                      <div className="font-orbitron font-bold text-lg text-white">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-rajdhani font-bold text-sm text-white mb-1 leading-tight">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="font-rajdhani text-gray-300 text-xs leading-tight">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Second row: Steps 4, 5 centered */}
            <div className="flex justify-center gap-3">
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                {steps.slice(3, 5).map((step, index) => (
                  <div key={index + 3}>
                    <div className="frosted-glass border border-gray-800 rounded-xl p-3 text-center hover:border-red-500/50 transition-all duration-300 h-full">
                      {/* Icon and Number */}
                      <div className="mb-2">
                        <div className={`${step.color} mb-1 flex justify-center`}>
                          {step.icon}
                        </div>
                        <div className="font-orbitron font-bold text-lg text-white">
                          {index + 4}
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-rajdhani font-bold text-sm text-white mb-1 leading-tight">
                        {step.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="font-rajdhani text-gray-300 text-xs leading-tight">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToPlay;