// src/components/PlayNextQueue.jsx

import React from 'react';
import './PlayNextQueue.css';

const PlayNextQueue = ({ queue, forceUpdate }) => {
  const queueItems = queue.getAll();

  return (
    <div className="play-next-panel">
      <h3>
        Play Next Queue (FIFO)
        <span className="queue-badge">{queue.size()}</span>
      </h3>
      
      {queueItems.length === 0 ? (
        <p className="empty-message">No songs queued</p>
      ) : (
        <div className="queue-list">
          {queueItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="queue-item">
              <span className="queue-position">#{index + 1}</span>
              <div className="queue-info">
                <div className="queue-song">{item.songName}</div>
                <div className="queue-artist">{item.artist}</div>
              </div>
              {index === 0 && <span className="next-badge">NEXT</span>}
            </div>
          ))}
        </div>
      )}

      <div className="queue-explanation">
        <strong>Queue Operations:</strong>
        <ul>
          <li>Enqueue: O(1)</li>
          <li>Dequeue: O(1)</li>
          <li>Uses FIFO (First-In-First-Out)</li>
        </ul>
      </div>
    </div>
  );
};

export default PlayNextQueue;