// src/components/Player.jsx

import React, { useState, useEffect } from 'react';
import './Player.css';

const Player = ({ 
  currentNode, 
  isPlaying, 
  audioRef, 
  onPlayPause, 
  onNext, 
  onPrev, 
  onShuffle, 
  onDelete,
  onUndo,
  canUndo
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [audioRef]);

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      audio.currentTime = percentage * duration;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!currentNode) {
    return <div className="player-panel">No song selected</div>;
  }

  return (
    <div className="player-panel">
      <div className="album-art">
        <img src={currentNode.albumArt} alt={currentNode.songName} />
      </div>

      <h2 className="song-title">{currentNode.songName}</h2>
      <p className="artist-name">{currentNode.artist}</p>

      <div className="controls">
        <button className="control-btn shuffle" onClick={onShuffle} title="Shuffle">
          <svg viewBox="0 0 24 24">
            <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
          </svg>
        </button>
        <button className="control-btn prev" onClick={onPrev} title="Previous">
          <svg viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
          </svg>
        </button>
        <button className="control-btn play-pause" onClick={onPlayPause} title={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? (
            <svg viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>
        <button className="control-btn next" onClick={onNext} title="Next">
          <svg viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
          </svg>
        </button>
        <button className="control-btn delete" onClick={onDelete} title="Delete Song">
          <svg viewBox="0 0 24 24">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
        <button 
          className="control-btn undo" 
          onClick={onUndo} 
          title="Undo Last Action"
          disabled={!canUndo}
        >
          <svg viewBox="0 0 24 24">
            <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/>
          </svg>
        </button>
      </div>

      <div className="progress-section">
        <span className="time-label">{formatTime(currentTime)}</span>
        <div className="progress-bar" onClick={handleSeek}>
          <div 
            className="progress-fill" 
            style={{ width: `${(currentTime / duration) * 100}%` }}
          ></div>
        </div>
        <span className="time-label">{formatTime(duration)}</span>
      </div>

      <button className="dll-view-btn">
        Doubly Linked List View
      </button>
    </div>
  );
};

export default Player;