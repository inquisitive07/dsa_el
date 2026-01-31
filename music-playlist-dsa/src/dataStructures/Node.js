// src/dataStructures/Node.js

/**
 * Node class for Circular Doubly Linked List
 * Each node represents a song in the playlist
 */
class Node {
  constructor(songData) {
    this.id = songData.id;
    this.songName = songData.songName;
    this.artist = songData.artist;
    this.albumArt = songData.albumArt;
    this.audioFile = songData.audioFile;
    this.lyrics = songData.lyrics;
    this.duration = songData.duration || "3:45";
    
    // DLL pointers - will be set during insertion
    this.next = null;
    this.prev = null;
  }

  /**
   * Get full data object
   */
  getData() {
    return {
      id: this.id,
      songName: this.songName,
      artist: this.artist,
      albumArt: this.albumArt,
      audioFile: this.audioFile,
      lyrics: this.lyrics,
      duration: this.duration
    };
  }
}

export default Node;