import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Wallet } from 'lucide-react';

const WalletButton: React.FC = () => {
  return (
    <>
      {/* Desktop Button - Top Right */}
      <div className="hidden md:block">
        <WalletMultiButton className="!bg-gradient-to-r !from-red-600 !to-pink-600 hover:!from-red-700 hover:!to-pink-700 !px-6 !py-3 !rounded-full !font-rajdhani !font-bold !text-white !transition-all !duration-300 hover:!scale-105 !border-none" />
      </div>

      {/* Mobile Button - Top Right Fixed with wallet icon */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <WalletMultiButton className="!bg-gradient-to-r !from-red-600 !to-pink-600 hover:!from-red-700 hover:!to-pink-700 !p-3 !rounded-full !font-rajdhani !font-bold !text-white !transition-all !duration-300 hover:!scale-105 !shadow-lg !border-none !min-w-0 !w-12 !h-12 !flex !items-center !justify-center">
          <Wallet size={20} />
        </WalletMultiButton>
      </div>
    </>
  );
};

export default WalletButton;