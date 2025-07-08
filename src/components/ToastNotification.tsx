import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ToastNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  type?: 'info' | 'error' | 'success' | 'warning';
}

const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  isVisible,
  duration = 2000,
  onClose,
  type = 'info'
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isClosingRef = useRef(false);

  // Auto-close timer with proper cleanup and deduplication
  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Reset closing flag when visibility changes
    if (isVisible) {
      isClosingRef.current = false;
    }

    // Only set timer if toast is visible, duration is positive, and not already closing
    if (!isVisible || duration <= 0 || isClosingRef.current) return;

    console.log(`Toast "${message}" visible, setting timer for ${duration}ms`);
    
    timerRef.current = setTimeout(() => {
      // Prevent multiple close calls
      if (isClosingRef.current) return;
      
      console.log(`Timer fired for toast "${message}", closing`);
      isClosingRef.current = true;
      onClose();
    }, duration);

    // Cleanup function
    return () => {
      if (timerRef.current) {
        console.log(`Cleaning up timer for toast "${message}"`);
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isVisible, duration, message]); // Removed onClose from dependencies to prevent re-triggers

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-600 border-red-500';
      case 'success':
        return 'bg-green-600 border-green-500';
      case 'warning':
        return 'bg-yellow-600 border-yellow-500';
      default:
        return 'bg-gray-600 border-gray-500';
    }
  };

  const handleClose = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Prevent multiple close calls
    if (isClosingRef.current) return;
    
    console.log(`Manual close clicked for toast "${message}"`);
    isClosingRef.current = true;
    
    // Clear timer on manual close
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    
    onClose();
  };

  const toastElement = (
    <div 
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999999,
        pointerEvents: 'auto',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      <div 
        className={`${getTypeStyles()} border rounded-lg px-4 py-3 shadow-lg max-w-sm animate-in slide-in-from-top duration-300`}
        style={{
          pointerEvents: 'auto',
          cursor: 'default'
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="font-rajdhani text-white text-sm font-medium">
            {message}
          </p>
          <button
            onClick={handleClose}
            onMouseDown={handleClose}
            onTouchStart={handleClose}
            style={{ 
              cursor: 'pointer',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              pointerEvents: 'auto',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '4px',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '24px',
              minHeight: '24px',
              flexShrink: 0
            }}
            type="button"
            aria-label="Close notification"
            className="text-white/80 hover:text-white transition-colors hover:bg-white/20"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(toastElement, document.body);
};

export default ToastNotification;