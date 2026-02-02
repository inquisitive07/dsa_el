// src/components/SearchBar.jsx

import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, hashMap, onAddSongFromPool }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState({ playlist: [], pool: [] });

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Show suggestions using hash map search from both playlist and pool
    if (value.trim()) {
      const results = hashMap.searchAll(value);
      setSuggestions({
        playlist: results.playlist.slice(0, 5),
        pool: results.pool.slice(0, 5)
      });
    } else {
      setSuggestions({ playlist: [], pool: [] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm('');
      setSuggestions({ playlist: [], pool: [] });
    }
  };

  const handlePlaylistSongClick = (node) => {
    onSearch(node.songName);
    setSearchTerm('');
    setSuggestions({ playlist: [], pool: [] });
  };

  const handlePoolSongClick = (song) => {
    // Add song from pool to playlist and play it
    if (onAddSongFromPool) {
      onAddSongFromPool(song);
    }
    setSearchTerm('');
    setSuggestions({ playlist: [], pool: [] });
  };

  const totalSuggestions = suggestions.playlist.length + suggestions.pool.length;

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search songs from playlist or pool... (uses Hash Map for O(1) lookup)"
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍 Search
        </button>
      </form>

      {totalSuggestions > 0 && (
        <div className="suggestions-dropdown">
          {/* Playlist Results */}
          {suggestions.playlist.length > 0 && (
            <div className="suggestions-section">
              <div className="suggestions-header">
                <span className="suggestions-label">In Playlist</span>
                <span className="suggestions-badge playlist-badge">
                  {suggestions.playlist.length}
                </span>
              </div>
              {suggestions.playlist.map((node) => (
                <div
                  key={`playlist-${node.id}`}
                  className="suggestion-item playlist-item"
                  onClick={() => handlePlaylistSongClick(node)}
                >
                  <div className="suggestion-content">
                    <div className="suggestion-name">{node.songName}</div>
                    <div className="suggestion-artist">{node.artist}</div>
                  </div>
                  <div className="suggestion-action">▶️ Play</div>
                </div>
              ))}
            </div>
          )}

          {/* Pool Results */}
          {suggestions.pool.length > 0 && (
            <div className="suggestions-section">
              <div className="suggestions-header">
                <span className="suggestions-label">Available in Pool</span>
                <span className="suggestions-badge pool-badge">
                  {suggestions.pool.length}
                </span>
              </div>
              {suggestions.pool.map((song) => (
                <div
                  key={`pool-${song.id}`}
                  className="suggestion-item pool-item"
                  onClick={() => handlePoolSongClick(song)}
                >
                  <div className="suggestion-content">
                    <div className="suggestion-name">{song.songName}</div>
                    <div className="suggestion-artist">{song.artist}</div>
                  </div>
                  <div className="suggestion-action">➕ Add & Play</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;