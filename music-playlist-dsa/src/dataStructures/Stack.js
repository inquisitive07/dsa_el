// src/dataStructures/Stack.js

/**
 * Stack Data Structure for Undo Operations and Playback History
 * 
 * Time Complexities:
 * - Push: O(1)
 * - Pop: O(1)
 * - Peek: O(1)
 * - isEmpty: O(1)
 * 
 * Space Complexity: O(n) where n is number of operations
 * 
 * Uses LIFO (Last-In-First-Out) semantics
 */
class Stack {
  constructor(maxSize = 50) {
    this.items = [];
    this.maxSize = maxSize; // Prevent memory overflow
  }

  /**
   * Push an item onto the stack
   * Time Complexity: O(1)
   */
  push(item) {
    // If stack is full, remove oldest item
    if (this.items.length >= this.maxSize) {
      this.items.shift();
    }
    this.items.push(item);
  }

  /**
   * Pop an item from the stack
   * Time Complexity: O(1)
   */
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  /**
   * Peek at the top item without removing it
   * Time Complexity: O(1)
   */
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  /**
   * Check if stack is empty
   * Time Complexity: O(1)
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Get stack size
   */
  size() {
    return this.items.length;
  }

  /**
   * Clear the stack
   */
  clear() {
    this.items = [];
  }

  /**
   * Get all items (for display purposes)
   */
  getAll() {
    return [...this.items];
  }
}

export default Stack;