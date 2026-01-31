// src/components/AddSongModal.jsx

import React from 'react';
import { getAvailableSongs } from '../utils/songData';
import './AddSongModal.css';

const AddSongModal = ({ playlist, onAddSong, onClose }) => {
  const currentSongIds = playlist.toArray().map(node => node.id);
  const availableSongs = getAvailableSongs(currentSongIds);

  const handleAddSong = (song) => {
    onAddSong(song);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content add-song-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>Add Song from Pool</h2>
        
        <div className="available-songs">
          {availableSongs.length === 0 ? (
            <p className="no-songs">All songs are already in your playlist!</p>
          ) : (
            availableSongs.map((song) => (
              <div 
                key={song.id} 
                className="available-song-item"
                onClick={() => handleAddSong(song)}
              >
                <div className="song-info">
                  <div className="song-name">{song.songName}</div>
                  <div className="song-artist">{song.artist}</div>
                </div>
                <span className="add-icon">+</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSongModal;