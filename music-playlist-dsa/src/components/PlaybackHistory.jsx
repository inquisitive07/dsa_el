// src/components/PlaybackHistory.jsx

import React from 'react';
import './PlaybackHistory.css';

const PlaybackHistory = ({ history, onSelectSong }) => {
  const historyItems = history.getAll().slice(-10).reverse(); // Show last 10, most recent first

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="playback-history-panel">
      <h3>
        Playback History (Stack - LIFO)
        <span className="history-badge">{history.size()}</span>
      </h3>
      
      {historyItems.length === 0 ? (
        <p className="empty-message">No playback history</p>
      ) : (
        <div className="history-list">
          {historyItems.map((item, index) => (
            <div 
              key={`${item.node.id}-${item.timestamp}`}
              className="history-item"
              onClick={() => onSelectSong(item.node)}
            >
              <div className="history-time">{formatTime(item.timestamp)}</div>
              <div className="history-info">
                <div className="history-song">{item.node.songName}</div>
                <div className="history-artist">{item.node.artist}</div>
              </div>
              {item.source && (
                <span className={`source-badge source-${item.source}`}>
                  {item.source}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="history-explanation">
        <strong>Stack Operations:</strong>
        <ul>
          <li>Push: O(1)</li>
          <li>Pop: O(1)</li>
          <li>Uses LIFO (Last-In-First-Out)</li>
        </ul>
      </div>
    </div>
  );
};

export default PlaybackHistory;