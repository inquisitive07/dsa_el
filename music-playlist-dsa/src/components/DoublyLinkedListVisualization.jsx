// src/components/DoublyLinkedListVisualization.jsx

import React, { useEffect, useRef } from "react";
import "./Visualization.css";

const DoublyLinkedListVisualization = ({ playlist, currentNode }) => {
  const currentNodeRef = useRef(null);
  const nodes = playlist.toArray();

  useEffect(() => {
    if (currentNodeRef.current) {
      currentNodeRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentNode]);

  if (!nodes.length) {
    return (
      <div className="visualization-container">
        <div className="empty-visualization">No songs in playlist</div>
      </div>
    );
  }

  return (
    <div className="visualization-container">

      {/* HEADER */}
      <div className="visualization-header">
        <h3>Circular Doubly Linked List Visualization</h3>
        <div className="visualization-info">
          <span className="info-item">Size: {nodes.length}</span>
          <span className="info-item">Structure: Circular</span>
        </div>
      </div>

      {/* MAIN ROW */}
      <div className="dll-row">

        {/* HEAD */}
        <div className="side-label head">
          <span>HEAD</span>
          <div className="side-arrow">➡</div>
        </div>

        {/* NODES */}
        <div className="nodes-container">
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <div
                className={`dll-node ${
                  currentNode?.id === node.id ? "current" : ""
                }`}
                ref={
                  currentNode?.id === node.id
                    ? currentNodeRef
                    : null
                }
              >
                <div className="node-id">ID: {node.id}</div>
                <div className="node-name">{node.songName}</div>
                <div className="node-artist">{node.artist}</div>

                <div className="node-pointers">
                  <span>← prev</span>
                  <span>next →</span>
                </div>
              </div>

              {index < nodes.length - 1 && (
                <div className="connector">⇄</div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* TAIL */}
        <div className="side-label tail">
          <span>TAIL</span>
          <div className="side-arrow">⬅</div>
        </div>
      </div>

      {/* CIRCULAR INDICATOR */}
      <div className="circular-box">
        🔁 <strong>Circular Connection:</strong>  
        TAIL.next → HEAD &nbsp; | &nbsp; HEAD.prev → TAIL
      </div>
    </div>
  );
};

export default DoublyLinkedListVisualization;
