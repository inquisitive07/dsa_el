// src/components/SearchBar.jsx

import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch, hashMap }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Show suggestions using hash map search
    if (value.trim()) {
      const results = hashMap.search(value);
      setSuggestions(results.slice(0, 5)); // Show top 5 results
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (node) => {
    onSearch(node.songName);
    setSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search songs... (uses Hash Map for O(1) lookup)"
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍 Search
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map((node) => (
            <div
              key={node.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(node)}
            >
              <div className="suggestion-name">{node.songName}</div>
              <div className="suggestion-artist">{node.artist}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;