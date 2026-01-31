// src/dataStructures/DoublyLinkedList.js

import Node from './Node';

/**
 * CIRCULAR Doubly Linked List implementation for Music Playlist
 * 
 * Time Complexities:
 * - Insertion at end: O(1)
 * - Deletion: O(n) [need to find node first] or O(1) if node reference given
 * - Traversal: O(n)
 * - Access by position: O(n)
 * - Next/Previous navigation: O(1)
 * 
 * Space Complexity: O(n) where n is number of songs
 * 
 * Circular Linking:
 * - The last node points back to the first node
 * - The first node points to the last node
 * - Eliminates boundary conditions during playback
 * - Enables continuous traversal without special cases
 * 
 * Advantages:
 * 1. Bidirectional traversal (forward and backward)
 * 2. Efficient insertion and deletion without shifting elements
 * 3. Dynamic size - no fixed capacity
 * 4. Continuous playback without boundary checks
 * 5. Better suited for navigation-based applications like music players
 */
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Add a song to the end of the playlist
   * Time Complexity: O(1)
   * Implements circular linking
   */
  addSong(songData) {
    const newNode = new Node(songData);

    if (!this.head) {
      // Empty list - create circular link to itself
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode; // Circular: points to itself
      newNode.prev = newNode; // Circular: points to itself
    } else {
      // Add to end and maintain circular structure
      this.tail.next = newNode;
      newNode.prev = this.tail;
      newNode.next = this.head; // Circular: tail.next points to head
      this.head.prev = newNode; // Circular: head.prev points to tail
      this.tail = newNode;
    }

    this.size++;
    return newNode;
  }

  /**
   * Delete a song by ID
   * Time Complexity: O(n) - need to traverse to find the node
   */
  deleteSong(songId) {
    let current = this.head;

    while (current) {
      if (current.id === songId) {
        return this.deleteNode(current);
      }
      current = current.next;
    }

    return null;
  }

  /**
   * Delete a specific node
   * Time Complexity: O(1) - when node reference is given
   * Maintains circular linking
   */
  deleteNode(node) {
    if (!node) return null;

    // Store next node to return
    let nextNode = node.next;

    if (node === this.head && node === this.tail) {
      // Only one node - clear the list
      this.head = null;
      this.tail = null;
    } else if (node === this.head) {
      // Delete head - update head and maintain circular link
      this.head = node.next;
      this.tail.next = this.head; // Circular: tail points to new head
      this.head.prev = this.tail; // Circular: new head points back to tail
    } else if (node === this.tail) {
      // Delete tail - update tail and maintain circular link
      this.tail = node.prev;
      this.tail.next = this.head; // Circular: new tail points to head
      this.head.prev = this.tail; // Circular: head points back to new tail
      nextNode = this.head; // After tail, return to head
    } else {
      // Delete middle node - bypass the node
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    this.size--;
    return nextNode || this.head;
  }

  /**
   * Get next node (circular)
   * Time Complexity: O(1)
   * In circular list, next always exists (wraps to head)
   */
  getNext(currentNode) {
    if (!currentNode || !this.head) return this.head;
    return currentNode.next; // Always has a next in circular list
  }

  /**
   * Get previous node (circular)
   * Time Complexity: O(1)
   * In circular list, prev always exists (wraps to tail)
   */
  getPrev(currentNode) {
    if (!currentNode || !this.head) return this.tail;
    return currentNode.prev; // Always has a prev in circular list
  }

  /**
   * Shuffle the playlist using Fisher-Yates algorithm
   * Time Complexity: O(n)
   */
  shuffle() {
    if (this.size <= 1) return;

    // Convert to array
    const nodesArray = this.toArray();

    // Fisher-Yates shuffle
    for (let i = nodesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nodesArray[i], nodesArray[j]] = [nodesArray[j], nodesArray[i]];
    }

    // Rebuild the list
    this.head = null;
    this.tail = null;
    this.size = 0;

    nodesArray.forEach(node => {
      // Reset pointers
      node.next = null;
      node.prev = null;
      this.addSongNode(node);
    });
  }

  /**
   * Add an existing node (used during shuffle)
   */
  addSongNode(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size++;
  }

  /**
   * Convert circular list to array for easier manipulation
   * Time Complexity: O(n)
   */
  toArray() {
    const result = [];
    if (!this.head) return result;

    let current = this.head;
    let count = 0;

    // Use count to prevent infinite loop in circular structure
    while (count < this.size) {
      result.push(current);
      current = current.next;
      count++;
    }

    return result;
  }

  /**
   * Get node by ID
   * Time Complexity: O(n)
   */
  getNodeById(songId) {
    let current = this.head;

    while (current) {
      if (current.id === songId) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  /**
   * Check if list is empty
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * Get current size
   */
  getSize() {
    return this.size;
  }

  /**
   * Get head node
   */
  getHead() {
    return this.head;
  }

  /**
   * Get tail node
   */
  getTail() {
    return this.tail;
  }

  /**
   * Clear the entire playlist
   */
  clear() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}

export default DoublyLinkedList;