// src/components/Lyrics.jsx

import React from 'react';
import './Lyrics.css';

const Lyrics = ({ currentNode }) => {
  if (!currentNode) {
    return (
      <div className="lyrics-panel">
        <h2>Lyrics</h2>
        <p className="no-lyrics">No song selected</p>
      </div>
    );
  }

  return (
    <div className="lyrics-panel">
      <h2>Lyrics</h2>
      <div className="lyrics-content">
        {currentNode.lyrics.split('\n').map((line, index) => (
          <p key={index}>{line || '\u00A0'}</p>
        ))}
      </div>
    </div>
  );
};

export default Lyrics;