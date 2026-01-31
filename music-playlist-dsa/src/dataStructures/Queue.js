// src/dataStructures/Queue.js

/**
 * Queue Data Structure for "Play Next" Feature
 * 
 * Time Complexities:
 * - Enqueue: O(1)
 * - Dequeue: O(1)
 * - Peek: O(1)
 * - isEmpty: O(1)
 * 
 * Space Complexity: O(n) where n is number of queued songs
 * 
 * Uses FIFO (First-In-First-Out) semantics
 */
class Queue {
  constructor() {
    this.items = [];
  }

  /**
   * Add a song to the queue
   * Time Complexity: O(1)
   */
  enqueue(song) {
    this.items.push(song);
  }

  /**
   * Remove and return the first song in queue
   * Time Complexity: O(1) amortized
   */
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  /**
   * Peek at the first song without removing it
   * Time Complexity: O(1)
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  /**
   * Check if queue is empty
   * Time Complexity: O(1)
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Get queue size
   */
  size() {
    return this.items.length;
  }

  /**
   * Clear the queue
   */
  clear() {
    this.items = [];
  }

  /**
   * Get all queued items (for display)
   */
  getAll() {
    return [...this.items];
  }

  /**
   * Check if a specific song is in the queue
   */
  contains(songId) {
    return this.items.some(song => song.id === songId);
  }

  /**
   * Remove a specific song from queue
   */
  remove(songId) {
    const index = this.items.findIndex(song => song.id === songId);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default Queue;