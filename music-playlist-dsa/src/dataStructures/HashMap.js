// src/dataStructures/HashMap.js

/**
 * Hash Map Data Structure for Fast Song Lookup
 * 
 * Time Complexities:
 * - Insert: O(1) average
 * - Search: O(1) average
 * - Delete: O(1) average
 * - Get: O(1) average
 * 
 * Space Complexity: O(n) where n is number of songs
 * 
 * Maps song titles to their corresponding linked list nodes
 */
class HashMap {
  constructor() {
    // Use JavaScript's built-in Map for optimal performance
    this.map = new Map();
    // Store reference to song pool for searching
    this.songPool = [];
  }

  /**
   * Set the song pool reference for global search
   */
  setSongPool(pool) {
    this.songPool = pool || [];
  }

  /**
   * Insert a song into the hash map
   * Time Complexity: O(1) average
   */
  set(songTitle, node) {
    // Normalize the key for case-insensitive search
    const key = songTitle.toLowerCase().trim();
    this.map.set(key, node);
  }

  /**
   * Get a node by song title
   * Time Complexity: O(1) average
   */
  get(songTitle) {
    const key = songTitle.toLowerCase().trim();
    return this.map.get(key) || null;
  }

  /**
   * Check if a song exists
   * Time Complexity: O(1) average
   */
  has(songTitle) {
    const key = songTitle.toLowerCase().trim();
    return this.map.has(key);
  }

  /**
   * Delete a song from the hash map
   * Time Complexity: O(1) average
   */
  delete(songTitle) {
    const key = songTitle.toLowerCase().trim();
    return this.map.delete(key);
  }

  /**
   * Clear all entries
   */
  clear() {
    this.map.clear();
  }

  /**
   * Get the size of the hash map
   */
  size() {
    return this.map.size;
  }

  /**
   * Get all keys (song titles)
   */
  keys() {
    return Array.from(this.map.keys());
  }

  /**
   * Get all values (nodes)
   */
  values() {
    return Array.from(this.map.values());
  }

  /**
   * Get all entries as [key, value] pairs
   */
  entries() {
    return Array.from(this.map.entries());
  }

  /**
   * Search for songs by partial title match in playlist only
   * Returns array of matching nodes
   * Time Complexity: O(n) - must check all entries
   */
  search(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    const results = [];

    for (const [title, node] of this.map.entries()) {
      if (title.includes(term)) {
        results.push(node);
      }
    }

    return results;
  }

  /**
   * Search for songs in both playlist AND song pool
   * Returns object with separate arrays for playlist and pool matches
   * Time Complexity: O(n + m) where n is playlist size and m is pool size
   */
  searchAll(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    const playlistResults = [];
    const poolResults = [];

    // Search in playlist (existing nodes) - ONLY by song title
    for (const [title, node] of this.map.entries()) {
      if (title.includes(term)) {
        playlistResults.push({
          ...node,
          location: 'playlist',
          isInPlaylist: true
        });
      }
    }

    // Search in song pool - ONLY by song title
    if (this.songPool && this.songPool.length > 0) {
      for (const song of this.songPool) {
        const songTitleLower = song.songName.toLowerCase();
        
        // Check if song title matches search term
        if (songTitleLower.includes(term)) {
          // Check if this song is already in playlist
          const isInPlaylist = this.has(song.songName);
          
          if (!isInPlaylist) {
            poolResults.push({
              ...song,
              location: 'pool',
              isInPlaylist: false
            });
          }
        }
      }
    }

    return {
      playlist: playlistResults,
      pool: poolResults,
      total: playlistResults.length + poolResults.length
    };
  }

  /**
   * Rebuild hash map from linked list
   * Used when playlist is modified
   */
  rebuild(linkedList) {
    this.clear();
    const nodes = linkedList.toArray();
    nodes.forEach(node => {
      this.set(node.songName, node);
    });
  }
}

export default HashMap;