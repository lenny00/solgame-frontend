import React from 'react';

const BackgroundAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Animated Stairs Background - Reduced from 20 to 14 (30% reduction) */}
      <div className="absolute inset-0 opacity-10">
        <div className="stairs-container">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="stair"
              style={{
                left: `${(i * 7) % 100}%`,
                top: `${(i * 4) % 100}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Masked Guards Animation - Reduced from 3 to 2 (33% reduction) */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="guard-silhouette"
            style={{
              left: `${25 + i * 40}%`,
              top: `${15 + i * 25}%`,
              animationDelay: `${i * 4}s`
            }}
          />
        ))}
      </div>

      {/* Squid Game-style Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-pink-900/20" />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-black/50" />
    </div>
  );
};

export default BackgroundAnimation;