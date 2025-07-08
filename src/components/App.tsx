import React, { useState, useEffect, useMemo } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter, TorusWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import Hero from './components/Hero';
import About from './components/About';
import HowToPlay from './components/HowToPlay';
import Footer from './components/Footer';
import BackgroundAnimation from './components/BackgroundAnimation';
import ParticleSystem from './components/ParticleSystem';
import AudioPlayer from './components/AudioPlayer';
import WalletButton from './components/WalletButton';
import MintNFTButton from './components/MintNFTButton';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  // Solana network configuration
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // Wallet adapters
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new TorusWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
            {/* Background Animations */}
            <BackgroundAnimation />
            <ParticleSystem />
            
            {/* Audio Player */}
            <AudioPlayer isEnabled={isAudioEnabled} />
            
            {/* Top Bar - Desktop Only */}
            <div className="hidden md:flex fixed top-4 left-4 right-4 z-50 justify-between items-center">
              {/* Audio Toggle */}
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="bg-gradient-to-br from-red-900 to-red-800 border border-red-500 hover:from-red-800 hover:to-red-700 hover:border-red-400 p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Toggle audio"
              >
                {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>

              {/* Connect Wallet Button */}
              <WalletButton />
            </div>

            {/* Mobile Controls - Fixed positioning */}
            <div className="md:hidden">
              {/* Audio Toggle - Top Left */}
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className="fixed top-4 left-4 z-50 bg-gradient-to-br from-red-900 to-red-800 border border-red-500 hover:from-red-800 hover:to-red-700 hover:border-red-400 p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Toggle audio"
              >
                {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>

              {/* Connect Wallet Button - Top Right */}
              <WalletButton />
            </div>

            {/* Main Content */}
            <main className="relative z-10">
              <Hero />
              <About />
              <HowToPlay />
              
              {/* Mint NFT Button - Above Footer */}
              <div className="flex justify-center py-16 px-4">
                <MintNFTButton />
              </div>
              
              <Footer />
            </main>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;