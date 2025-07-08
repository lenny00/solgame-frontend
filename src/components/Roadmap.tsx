import React from 'react';
import { Rocket, TrendingUp, Zap, Skull } from 'lucide-react';

const Roadmap: React.FC = () => {
  const phases = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Launch",
      description: "Fair launch on Pump.fun. Liquidity locked. Game begins.",
      status: "current",
      color: "text-green-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Memes",
      description: "Community meme creation. Viral marketing campaign. Social media domination.",
      status: "upcoming",
      color: "text-pink-500"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Viral Pump",
      description: "Major exchange listings. Influencer partnerships. Mass adoption phase.",
      status: "upcoming",
      color: "text-yellow-500"
    },
    {
      icon: <Skull className="w-8 h-8" />,
      title: "Play or Die",
      description: "Final elimination round. Only diamond hands survive. Winner takes all.",
      status: "upcoming",
      color: "text-red-500"
    }
  ];

  return (
    <section id="roadmap" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-orbitron font-black text-4xl md:text-6xl mb-6 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            Game Roadmap
          </h2>
          <p className="font-rajdhani text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Launch → Memes → Viral Pump → Play or Die
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-green-500 via-pink-500 via-yellow-500 to-red-500 hidden md:block"></div>

          <div className="space-y-16">
            {phases.map((phase, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className={`bg-black/50 border ${phase.status === 'current' ? 'border-green-500' : 'border-gray-800'} rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 hover:scale-105`}>
                    <div className="flex items-center mb-4">
                      <div className={`${phase.color} mr-4`}>
                        {phase.icon}
                      </div>
                      <h3 className="font-orbitron font-bold text-2xl text-white">
                        {phase.title}
                      </h3>
                      {phase.status === 'current' && (
                        <span className="ml-auto bg-green-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="font-rajdhani text-lg text-gray-300 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden md:flex w-2/12 justify-center">
                  <div className={`w-6 h-6 rounded-full ${phase.status === 'current' ? 'bg-green-500 animate-pulse' : 'bg-gray-600'} border-4 border-black`}></div>
                </div>

                <div className="w-full md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-2xl p-8 border border-red-500/30 max-w-2xl mx-auto">
            <h3 className="font-orbitron font-bold text-2xl text-red-400 mb-4">
              Final Warning
            </h3>
            <p className="font-rajdhani text-lg text-gray-300 mb-4">
              This is not just a memecoin. This is a survival game. Only the strongest degens will make it to the end.
            </p>
            <p className="font-rajdhani text-xl font-bold text-yellow-400">
              "In the end, there can be only one winner."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;