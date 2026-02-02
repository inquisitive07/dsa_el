// src/components/PlaybackSpeed.jsx
import React, { useState } from 'react';
import './PlaybackSpeed.css';

const PlaybackSpeed = ({ audioRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  
  const speeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  const handleSpeedChange = (speed) => {
    if (audioRef && audioRef.current) {
      audioRef.current.playbackRate = speed;
      setCurrentSpeed(speed);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button 
        className="speed-toggle-btn"
        onClick={() => setIsOpen(true)}
      >
        <span className="speed-icon">⚡</span>
        <span className="speed-label">Speed</span>
        <span className="speed-text">{currentSpeed}x</span>
      </button>

      {isOpen && (
        <div className="speed-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="speed-modal" onClick={(e) => e.stopPropagation()}>
            <div className="speed-modal-header">
              <h3>Playback Speed</h3>
              <button className="close-modal-btn" onClick={() => setIsOpen(false)}>
                ✕
              </button>
            </div>
            <div className="speed-grid">
              {speeds.map((speed) => (
                <button
                  key={speed}
                  className={`speed-option ${currentSpeed === speed ? 'active' : ''}`}
                  onClick={() => handleSpeedChange(speed)}
                >
                  <span className="speed-value">{speed}x</span>
                  {currentSpeed === speed && <span className="check-mark">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaybackSpeed;