import React from 'react';
import { Loader2, Calendar, DollarSign, Package } from 'lucide-react';
import { useCandyMachineInfo } from '../hooks/useCandyMachineInfo';

interface CandyMachineStatsProps {
  className?: string;
}

const CandyMachineStats: React.FC<CandyMachineStatsProps> = ({ className = "" }) => {
  const { candyMachineInfo, isLoading, error } = useCandyMachineInfo();

  if (isLoading) {
    return (
      <div className={`candy-machine-stats ${className}`}>
        <div className="flex items-center justify-center p-4">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="ml-2">Loading collection info...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`candy-machine-stats ${className}`}>
        <div className="text-red-500 p-4">
          Error loading collection info: {error}
        </div>
      </div>
    );
  }

  if (!candyMachineInfo) {
    return null;
  }

  const {
    itemsRedeemed,
    itemsAvailable,
    mintPrice,
    isLive,
    isSoldOut,
    startDate,
    endDate
  } = candyMachineInfo;

  const remainingItems = itemsAvailable - itemsRedeemed;
  const progressPercentage = (itemsRedeemed / itemsAvailable) * 100;

  return (
    <div className={`candy-machine-stats ${className}`}>
      <div className="stats-grid">
        
        {/* Mint Progress */}
        <div className="stat-item">
          <div className="stat-header">
            <Package className="w-5 h-5" />
            <span>Minted</span>
          </div>
          <div className="stat-content">
            <div className="progress-text">
              {itemsRedeemed} / {itemsAvailable}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="remaining-text">
              {remainingItems} remaining
            </div>
          </div>
        </div>

        {/* Mint Price */}
        {mintPrice !== null && (
          <div className="stat-item">
            <div className="stat-header">
              <DollarSign className="w-5 h-5" />
              <span>Price</span>
            </div>
            <div className="stat-content">
              <div className="price-text">
                {mintPrice} SOL
              </div>
            </div>
          </div>
        )}

        {/* Status */}
        <div className="stat-item">
          <div className="stat-header">
            <Calendar className="w-5 h-5" />
            <span>Status</span>
          </div>
          <div className="stat-content">
            <div className={`status-badge ${
              isSoldOut ? 'sold-out' : 
              isLive ? 'live' : 'not-live'
            }`}>
              {isSoldOut ? 'Sold Out' : 
               isLive ? 'Live' : 'Not Live Yet'}
            </div>
          </div>
        </div>

        {/* Start Date */}
        {startDate && (
          <div className="stat-item">
            <div className="stat-header">
              <Calendar className="w-5 h-5" />
              <span>Start Date</span>
            </div>
            <div className="stat-content">
              <div className="date-text">
                {startDate.toLocaleString()}
              </div>
            </div>
          </div>
        )}

        {/* End Date */}
        {endDate && (
          <div className="stat-item">
            <div className="stat-header">
              <Calendar className="w-5 h-5" />
              <span>End Date</span>
            </div>
            <div className="stat-content">
              <div className="date-text">
                {endDate.toLocaleString()}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CandyMachineStats;