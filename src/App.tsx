import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
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

import { CANDY_MACHINE_CONFIG } from './config/candyMachine'; // Ajustez le chemin


function App() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true); // ✅ ON par défaut
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Solana network configuration - Using Mainnet for Candy Machine
const endpoint = useMemo(() => CANDY_MACHINE_CONFIG.RPC_ENDPOINT, []);

  // Wallet adapters
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  // ✅ Gestion de l'audio Squid Game
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configuration de l'audio
    audio.loop = true;
    audio.volume = 0.3; // Volume à 30%
    
    // Fonction pour démarrer l'audio après interaction utilisateur
    const startAudio = async () => {
      if (isAudioEnabled && hasUserInteracted) {
        try {
          await audio.play();
          console.log("🎵 Squid Game music started");
        } catch (error) {
          console.log("Audio play failed:", error);
        }
      } else {
        audio.pause();
      }
    };

    startAudio();
  }, [isAudioEnabled, hasUserInteracted]);

  // ✅ Démarrage automatique de la musique après première interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      
      // ✅ Démarrer automatiquement la musique après la première interaction
      if (isAudioEnabled && audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log("Auto-play failed:", error);
        });
      }
      
      // Retirer les listeners après la première interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    // Ajouter les listeners pour la première interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isAudioEnabled]); // ✅ Ajout de isAudioEnabled en dépendance

  // ✅ Fonction pour toggle l'audio
  const toggleAudio = () => {
    setIsAudioEnabled(!isAudioEnabled);
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
            {/* ✅ Audio Squid Game */}
            <audio
              ref={audioRef}
              preload="auto"
              style={{ display: 'none' }}
            >
              <source src="/squid-game-tone.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            {/* Background Animations */}
            <BackgroundAnimation />
            <ParticleSystem />
            
            {/* Audio Player Component (si vous en avez besoin) */}
            <AudioPlayer isEnabled={isAudioEnabled} />
            
            {/* Top Bar - Desktop Only */}
            <div className="hidden md:flex fixed top-4 left-4 right-4 z-50 justify-between items-center">
              {/* Audio Toggle */}
              <button
                onClick={toggleAudio}
                className="bg-gradient-to-br from-red-900 to-red-800 border border-red-500 hover:from-red-800 hover:to-red-700 hover:border-red-400 p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Toggle Squid Game music"
                title={isAudioEnabled ? "Mute Squid Game music" : "Play Squid Game music"}
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
                onClick={toggleAudio}
                className="fixed top-4 left-4 z-50 bg-gradient-to-br from-red-900 to-red-800 border border-red-500 hover:from-red-800 hover:to-red-700 hover:border-red-400 p-3 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Toggle Squid Game music"
                title={isAudioEnabled ? "Mute Squid Game music" : "Play Squid Game music"}
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
              
              {/* Mint NFT Button - Above Footer - Reduced gaps */}
              <div className="flex justify-center py-4 px-4">
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
