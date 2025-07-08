import React, { useState, useEffect } from 'react';

// Nouveau composant bouton similaire au MintNFTButton mais pour le scroll
const PlayGameButton: React.FC = () => {
  const scrollToTicketSection = () => {
    const ticketSection = document.getElementById('ticket-section');
    if (ticketSection) {
      // Calculer la position exacte 5px au-dessus du titre
      const rect = ticketSection.getBoundingClientRect();
      const absoluteElementTop = rect.top + window.pageYOffset;
      const targetPosition = absoluteElementTop - 60;
      
      // Scroll directement à la position exacte
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mint-button-wrapper">
      <button 
        onClick={scrollToTicketSection}
        className="mint-button"
      >
        <span className="premium-text button-content">
          Play SOL Game
        </span>
      </button>
    </div>
  );
};

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [playerCount, setPlayerCount] = useState(12);

  useEffect(() => {
    const now = new Date();
    const targetDate = new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000);
    const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const distance = targetDate.getTime() - currentTime;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 pb-10">
      <div className="text-center max-w-6xl mx-auto">

        {/* Logo */}
        <div className="-mb-4 md:-mb-2 lg:-mb-12 flex justify-center mt-4 lg:mt-0"> 
          <div className="relative">
            <img
              src="/c167d027-021f-4efa-8ae2-46e477e23f4e copie.png"
              alt="SOL GAME Logo"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-48 lg:h-48 xl:w-[420px] xl:h-[400px] object-contain logo-float" 
              style={{
                filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.4)) drop-shadow(0 0 30px rgba(239, 68, 68, 0.2))',
              }}
            /> 
          </div>
        </div>

        {/* Title */}
        <div className="mb-6 md:mb-8 lg:mb-4 lg:mt-0"> 
          <div className="frosted-glass border border-red-900/40 rounded-2xl py-3 px-6 lg:py-3 lg:px-10 max-w-4xl mx-auto bg-red-500/10" style={{ paddingTop: '0.5rem', paddingBottom: '1rem', maxWidth: '45rem' }}>
            <p className="font-rajdhani font-bold" 
               style={{
                 background: 'linear-gradient(to right, rgba(236, 72, 153, 0.9), rgba(168, 85, 247, 0.95), rgba(236, 72, 153, 0.9))', 
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text',
                 textShadow: '0 0 20px rgba(236, 72, 153, 0.3)',
                 fontSize: 'clamp(2.25rem, 5vw, 4rem)',
                 whiteSpace: 'nowrap'
               }}>
              Survive. Win. Profit.
            </p>
            <p className="font-rajdhani text-sm md:text-base lg:text-lg font-medium text-green-400 mb-0"> 
              Compete on-chain for a $10,000 jackpot. Will you make it?
            </p>
          </div>
        </div> 

        {/* Countdown */}
        <div className="mb-6 lg:mb-4">
          <h3 className="font-rajdhani text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Game Starts In
          </h3>
          <div className="flex justify-center space-x-4 md:space-x-8">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="frosted-glass border border-red-500 rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
                  <div className="font-orbitron font-bold text-2xl md:text-3xl bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                    {value.toString().padStart(2, '0')}
                  </div>
                </div>
                <div className="font-rajdhani text-sm md:text-base text-gray-400 mt-2 capitalize">
                  {unit}
                </div>
              </div>
            ))}
          </div>

          {/* Players Joined */}
          <div className="mt-6">
            <p className="font-rajdhani text-xl md:text-2xl text-gray-300 font-bold">
              👥 <span className="text-yellow-400">74</span> players joined
            </p>
          </div>
        </div>

        {/* Mint + Jackpot container */}
        <div className="flex flex-col items-center lg:gap-20"> {/* propre gap */}

          {/* Play SOL Game Button */}
          <div className="flex justify-center mb-6 lg:mb-4">
            <PlayGameButton />
          </div>

          {/* Jackpot Section */}
          <div className="relative mb-4 md:mb-10 lg:mb-16">

            {/* Mobile */}
            <div className="lg:hidden relative">
              <div className="relative z-10 flex justify-center -mb-24">
                <div className="piggy-bank-mobile">
                  <img
                    src="/fe9cdf68-db33-4f2b-9d28-028660c91b88.png"
                    alt="Jackpot Piggy Bank"
                    className="w-60 h-60 object-contain animate-breathe"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.4))',
                    }}
                  />
                </div>
              </div>

              <div className="enhanced-glass border-2 border-yellow-500 rounded-2xl pt-20 pb-6 md:pb-16 px-6 relative overflow-hidden mx-auto z-20">
                <div className="text-center space-y-4 relative z-10">
                  <h3 className="font-orbitron font-black text-3xl text-gray-300 mt-6">
                    Current Jackpot
                  </h3>
                  <div className="font-orbitron font-black">
                    <div className="mb-2 leading-none flex justify-center items-center gap-3" style={{ fontSize: '12vw', lineHeight: 1 }}>
                      <span>💰</span>
                      <span className="text-yellow-400">70</span>
                      <span className="ml-1">SOL</span>
                    </div>
                    <div className="text-green-400 text-lg">($10,000 USD)</div>
                  </div>
                  <p className="font-rajdhani text-base text-red-400">
                    🔺 80% of mint sales go to the jackpot.
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop */}
            <div
              className="hidden lg:flex lg:items-center lg:justify-center mx-auto max-w-[80%]"
              style={{
                gap: '7vw',
              }}
            >


              {/* Jackpot Container */}
              <div className="enhanced-glass border-2 border-yellow-500 rounded-2xl p-8 lg:p-10 flex-1 flex justify-center items-center max-w-[550px]">
                <div className="text-center">
                  <h3 className="font-orbitron font-black text-4xl text-gray-300 mb-4">
                    Current Jackpot
                  </h3>
                  <div className="mb-4">
                    <div
                      className="font-orbitron font-black flex justify-center items-center gap-4"
                      style={{ fontSize: 'clamp(64px, 8vw, 100px)', lineHeight: 1 }}
                    >
                      <span>💰</span>
                      <span className="text-yellow-400">70</span>
                      <span>SOL</span>
                    </div>
                    <div
                      className="text-green-400 text-lg mt-4 font-orbitron"
                      style={{ fontSize: '1.5rem', lineHeight: 2, fontWeight: 600 }} 
                    >($10,000 USD)</div>
                  </div>
                  <p className="font-rajdhani text-lg text-red-400">
                    🔺 80% of mint sales go to the jackpot.
                  </p>
                </div>
              </div>

              {/* Piggy Bank */}
              <div className="flex-shrink-0 ml-12">
                <img
                  src="/fe9cdf68-db33-4f2b-9d28-028660c91b88.png"
                  alt="Jackpot Piggy Bank"
                  className="object-contain animate-breathe"
                  style={{
                    width: '450px',
                    height: '450px',
                    maxWidth: '100%',
                    filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6))',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;