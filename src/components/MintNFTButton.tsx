import React, { useState, useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Loader2 } from 'lucide-react';
import { useMintNFT } from '../hooks/useMintNFT';
import PurchaseSuccessModal from './PurchaseSuccessModal';
import ToastNotification from './ToastNotification';

interface MintNFTButtonProps {
  className?: string;
  children?: React.ReactNode;
}

const MintNFTButton: React.FC<MintNFTButtonProps> = ({
  className = "mint-button",
  children = "Mint Game Pass NFT"
}) => {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { mintNFT, isLoading, error, lastMintResult } = useMintNFT();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionId, setTransactionId] = useState<string>('');
  const [mintedNftAddress, setMintedNftAddress] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'info' | 'error' | 'success' | 'warning'>('info');
  
  // Ref pour éviter les doublons
  const lastProcessedMint = useRef<string>('');

  // ✅ Utiliser lastMintResult au lieu de window events
  useEffect(() => {
    if (lastMintResult && lastMintResult.signature !== lastProcessedMint.current) {
      console.log("🎉 Processing new mint result:", lastMintResult);
      
      // Marquer comme traité pour éviter les doublons
      lastProcessedMint.current = lastMintResult.signature;
      
      setTransactionId(lastMintResult.signature);
      setMintedNftAddress(lastMintResult.mintAddress);
      setShowSuccessModal(true);
      
      // Afficher un toast de succès
      showToastNotification("NFT minted successfully! 🎉", 'success');
    }
  }, [lastMintResult]);

  // Afficher les erreurs via toast
  useEffect(() => {
    if (error) {
      showToastNotification(error, 'error');
    }
  }, [error]);

  const showToastNotification = (message: string, type: 'info' | 'error' | 'success' | 'warning' = 'info') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  const handleMintClick = async () => {
    // Si le wallet n'est pas connecté, ouvrir le modal de sélection de wallet
    if (!connected) {
      setVisible(true);
      return;
    }

    // Si le wallet est connecté, procéder au mint
    try {
      await mintNFT();
    } catch (err) {
      // L'erreur est déjà gérée dans le hook
      console.error('Mint failed:', err);
    }
  };

  return (
    <div className="mint-button-wrapper">
      <button 
        onClick={handleMintClick} 
        disabled={isLoading} 
        className={`${className} ${isLoading ? 'loading' : ''}`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Minting...</span>
          </div>
        ) : (
          <span className="premium-text button-content">
            {children}
          </span>
        )}
      </button>

      {/* Modal de succès */}
      <PurchaseSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        transactionId={transactionId}
        mintedNftAddress={mintedNftAddress}
        isNFT={true}
      />

      {/* Toast de notification */}
      <ToastNotification
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type={toastType}
        duration={toastType === 'success' ? 4000 : 3000}
      />
    </div>
  );
};

export default MintNFTButton;