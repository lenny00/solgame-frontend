import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  isEnabled: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ isEnabled }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isEnabled) {
      audio.play().catch(() => {
        // Handle autoplay restrictions
        console.log('Audio autoplay blocked');
      });
    } else {
      audio.pause();
    }
  }, [isEnabled]);

  return (
    <audio
      ref={audioRef}
      loop
      preload="metadata"
      className="hidden"
      crossOrigin="anonymous"
    >
      <source src="https://storage.googleapis.com/soundboards/TV%20SHOWS/SQUID%20GAME/MP3/ORIGINAL%20SOUNDTRACK%20-%20AUDIO%20FROM%20JAYUZUMI.COM.mp3" type="audio/mpeg" />
      <source src="https://www.myinstants.com/media/sounds/squid-game-tone.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;