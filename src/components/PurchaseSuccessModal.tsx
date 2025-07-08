import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, X, ExternalLink } from 'lucide-react';

interface PurchaseSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionId?: string;
  mintedNftAddress?: string;
}

const PurchaseSuccessModal: React.FC<PurchaseSuccessModalProps> = ({
  isOpen,
  onClose,
  transactionId,
  mintedNftAddress
}) => {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative bg-black border-2 border-green-500 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={24} />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <Check size={40} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <h2 className="font-orbitron font-bold text-2xl md:text-3xl text-center text-green-400 mb-4">
          ✅ Mint Successful!
        </h2>

        {/* Message */}
        <p className="font-rajdhani text-lg text-center text-gray-300 mb-6 leading-relaxed">
          Your mint has been successfully completed.
        </p>

        {/* Transaction ID */}
        {transactionId && (
          <div className="mb-4 p-4 bg-gray-900 rounded-lg">
            <p className="font-rajdhani text-sm text-gray-400 mb-2">Transaction ID:</p>
            <a
              href={`https://solscan.io/tx/${transactionId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-green-400 break-all hover:text-green-300 transition flex items-center gap-1"
            >
              {transactionId}
              <ExternalLink size={12} />
            </a>
          </div>
        )}

        {/* NFT Link */}
        {mintedNftAddress && (
          <a
            href={`https://solscan.io/account/${mintedNftAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 rounded-lg font-rajdhani font-bold text-lg text-white transition mb-4 flex items-center justify-center gap-2"
          >
            View NFT on Solscan
            <ExternalLink size={18} />
          </a>
        )}

        {/* OK Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-3 rounded-lg font-rajdhani font-bold text-lg text-white transition"
        >
          OK
        </button>
      </div>
    </div>,
    document.body
  );
};

export default PurchaseSuccessModal;
