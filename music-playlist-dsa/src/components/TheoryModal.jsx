// src/components/TheoryModal.jsx

import React from 'react';
import './TheoryModal.css';

const TheoryModal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content theory-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>Data Structures - Theory & Implementation</h2>
        
        <div className="theory-content">
          <section className="ds-section">
            <h3>1. Circular Doubly Linked List (Main Playlist)</h3>
            <div className="ds-description">
              <p>The primary data structure for playlist sequencing.</p>
              
              <h4>Structure:</h4>
              <ul>
                <li>Each song is a node with data and two pointers</li>
                <li><strong>prev</strong> pointer → Previous node</li>
                <li><strong>next</strong> pointer → Next node</li>
                <li><strong>Circular:</strong> Last node points back to first</li>
                <li><strong>Circular:</strong> First node points to last</li>
              </ul>

              <h4>Advantages:</h4>
              <ul>
                <li>✅ Bidirectional traversal (forward and backward)</li>
                <li>✅ Efficient insertion and deletion without shifting - O(1)</li>
                <li>✅ Continuous playback without boundary conditions</li>
                <li>✅ Dynamic size - no fixed capacity</li>
                <li>✅ Better suited for navigation-based applications</li>
              </ul>

              <h4>Time Complexity:</h4>
              <ul>
                <li><strong>Insertion at end:</strong> O(1)</li>
                <li><strong>Deletion with node reference:</strong> O(1)</li>
                <li><strong>Next/Previous navigation:</strong> O(1)</li>
                <li><strong>Traversal:</strong> O(n)</li>
                <li><strong>Search:</strong> O(n)</li>
              </ul>
            </div>
          </section>

          <section className="ds-section">
            <h3>2. Stack (Undo Operations & Playback History)</h3>
            <div className="ds-description">
              <p>Used for undo functionality and maintaining playback history.</p>
              
              <h4>LIFO Semantics:</h4>
              <ul>
                <li><strong>Last-In-First-Out</strong> principle</li>
                <li>Most recent action is undone first</li>
                <li>Most recently played song appears first in history</li>
              </ul>

              <h4>Operations:</h4>
              <ul>
                <li><strong>Push:</strong> Add action to stack - O(1)</li>
                <li><strong>Pop:</strong> Remove and return last action - O(1)</li>
                <li><strong>Peek:</strong> View last action without removing - O(1)</li>
              </ul>

              <h4>Use Cases:</h4>
              <ul>
                <li>✅ Undo song deletion</li>
                <li>✅ Undo playlist shuffle</li>
                <li>✅ Undo song reordering</li>
                <li>✅ View playback history</li>
                <li>✅ Jump to previously played songs</li>
              </ul>
            </div>
          </section>

          <section className="ds-section">
            <h3>3. Queue (Play Next Feature)</h3>
            <div className="ds-description">
              <p>Temporarily schedules songs for priority playback.</p>
              
              <h4>FIFO Semantics:</h4>
              <ul>
                <li><strong>First-In-First-Out</strong> principle</li>
                <li>Songs play in the order they were queued</li>
                <li>Does not modify underlying playlist structure</li>
              </ul>

              <h4>Operations:</h4>
              <ul>
                <li><strong>Enqueue:</strong> Add song to queue - O(1)</li>
                <li><strong>Dequeue:</strong> Remove and play first song - O(1)</li>
                <li><strong>Peek:</strong> View next song without removing - O(1)</li>
              </ul>

              <h4>Workflow:</h4>
              <ul>
                <li>✅ User clicks "Play Next" on any song</li>
                <li>✅ Song is added to the queue</li>
                <li>✅ When current song ends, check queue first</li>
                <li>✅ If queue has songs, dequeue and play</li>
                <li>✅ If queue is empty, continue normal playlist traversal</li>
              </ul>
            </div>
          </section>

          <section className="ds-section">
            <h3>4. Hash Map (Fast Song Search)</h3>
            <div className="ds-description">
              <p>Enables constant-time song lookup by title.</p>
              
              <h4>Structure:</h4>
              <ul>
                <li>Maps song title (key) → Linked list node (value)</li>
                <li>Uses case-insensitive matching</li>
                <li>Supports partial title search</li>
              </ul>

              <h4>Operations:</h4>
              <ul>
                <li><strong>Insert:</strong> Add song mapping - O(1) average</li>
                <li><strong>Search:</strong> Find song by title - O(1) average</li>
                <li><strong>Delete:</strong> Remove mapping - O(1) average</li>
              </ul>

              <h4>Advantages:</h4>
              <ul>
                <li>✅ Instant song lookup without traversing playlist</li>
                <li>✅ Eliminates O(n) linear search</li>
                <li>✅ Enables search suggestions</li>
                <li>✅ Jump directly to any song</li>
              </ul>
            </div>
          </section>

          <section className="ds-section comparison">
            <h3>5. Comparison with Traditional Methods</h3>
            <div className="comparison-table">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Array-Based</th>
                    <th>Singly Linked</th>
                    <th>Our Implementation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Insert/Delete</td>
                    <td>O(n) - requires shifting</td>
                    <td>O(1) at head only</td>
                    <td>✅ O(1) anywhere</td>
                  </tr>
                  <tr>
                    <td>Bidirectional</td>
                    <td>❌ Index-based only</td>
                    <td>❌ One direction</td>
                    <td>✅ Both directions</td>
                  </tr>
                  <tr>
                    <td>Continuous Play</td>
                    <td>❌ Needs boundary logic</td>
                    <td>❌ Needs boundary logic</td>
                    <td>✅ Built-in circular</td>
                  </tr>
                  <tr>
                    <td>Search</td>
                    <td>O(1) by index, O(n) by value</td>
                    <td>O(n)</td>
                    <td>✅ O(1) with HashMap</td>
                  </tr>
                  <tr>
                    <td>Memory</td>
                    <td>Fixed allocation</td>
                    <td>Dynamic</td>
                    <td>✅ Dynamic</td>
                  </tr>
                  <tr>
                    <td>Undo Feature</td>
                    <td>❌ Complex</td>
                    <td>❌ Complex</td>
                    <td>✅ Stack O(1)</td>
                  </tr>
                  <tr>
                    <td>Priority Queue</td>
                    <td>❌ Complex</td>
                    <td>❌ Complex</td>
                    <td>✅ Queue O(1)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="ds-section architecture">
            <h3>6. System Architecture (MVC Pattern)</h3>
            <div className="ds-description">
              <h4>Model Layer (Data Structures):</h4>
              <ul>
                <li>Circular Doubly Linked List - Playlist sequencing</li>
                <li>Stack - Undo operations and history</li>
                <li>Queue - Temporary song scheduling</li>
                <li>Hash Map - Fast song lookup</li>
              </ul>

              <h4>Controller Layer (Application Logic):</h4>
              <ul>
                <li>Manages user interactions</li>
                <li>Coordinates data structure operations</li>
                <li>Synchronizes audio playback with playlist state</li>
                <li>Handles search, undo, and scheduling logic</li>
              </ul>

              <h4>View Layer (React Components):</h4>
              <ul>
                <li>Real-time visualization of data structures</li>
                <li>Interactive UI components</li>
                <li>State-driven rendering</li>
                <li>Visual feedback for all operations</li>
              </ul>
            </div>
          </section>

          <section className="ds-section learning">
            <h3>7. Learning Outcomes</h3>
            <div className="ds-description">
              <h4>Practical Understanding:</h4>
              <ul>
                <li>✅ See how multiple data structures work together</li>
                <li>✅ Understand trade-offs between different structures</li>
                <li>✅ Learn when to use each data structure</li>
                <li>✅ Observe time complexity in real-world scenarios</li>
              </ul>

              <h4>Real-World Applications:</h4>
              <ul>
                <li>Music players and media applications</li>
                <li>Navigation systems (circular lists)</li>
                <li>Undo/Redo functionality (stack)</li>
                <li>Task scheduling (queue)</li>
                <li>Fast lookup systems (hash map)</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TheoryModal;