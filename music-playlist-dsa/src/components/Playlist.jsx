// src/components/Playlist.jsx

import React from 'react';
import './Playlist.css';

const Playlist = ({ playlist, currentNode, onSongSelect, onAddSong, onPlayNext, forceUpdate }) => {
  const songs = playlist.toArray();

  return (
    <div className="playlist-panel">
      <h2>Playlist</h2>
      
      <button className="add-song-btn" onClick={onAddSong}>
        + Add Song
      </button>

      <div className="song-list">
        {songs.map((node) => (
          <div
            key={node.id}
            className={`song-item ${currentNode?.id === node.id ? 'active' : ''}`}
          >
            <div 
              className="song-main"
              onClick={() => onSongSelect(node.id)}
            >
              {currentNode?.id === node.id && (
                <span className="play-icon">▶</span>
              )}
              <div className="song-info">
                <div className="song-name">{node.songName}</div>
                <div className="song-artist">{node.artist}</div>
              </div>
            </div>
            {currentNode?.id !== node.id && (
              <button 
                className="play-next-btn"
                onClick={() => onPlayNext(node.id)}
                title="Add to Play Next queue"
              >
                ⏭ Play Next
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="playlist-footer">
        <div className="playlist-info">
          <span className="info-label">Total Songs:</span>
          <span className="info-value">{songs.length}</span>
        </div>
        <div className="playlist-info">
          <span className="info-label">Structure:</span>
          <span className="info-value">Circular DLL</span>
        </div>
      </div>
    </div>
  );
};

export default Playlist;