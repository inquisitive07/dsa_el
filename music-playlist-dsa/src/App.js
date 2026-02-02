// src/App.jsx

import React, { useState, useEffect, useRef } from 'react';
import DoublyLinkedList from './dataStructures/DoublyLinkedList';
import Stack from './dataStructures/Stack';
import Queue from './dataStructures/Queue';
import HashMap from './dataStructures/HashMap';
import { getInitialPlaylist, songPool } from './utils/songData';

// Components - all in the same components folder
import Playlist from './components/Playlist';
import Player from './components/Player';
import Lyrics from './components/Lyrics';
import TheoryModal from './components/TheoryModal';
import AddSongModal from './components/AddSongModal';
import DoublyLinkedListVisualization from './components/DoublyLinkedListVisualization';
import PlayNextQueue from './components/PlayNextQueue';
import PlaybackHistory from './components/PlaybackHistory';
import SearchBar from './components/SearchBar';

import './App.css';

function App() {
  // Initialize all 4 data structures
  const [playlist] = useState(() => {
    const dll = new DoublyLinkedList();
    getInitialPlaylist().forEach(song => dll.addSong(song));
    return dll;
  });

  const [hashMap] = useState(() => {
    const map = new HashMap();
    // Set the song pool reference for searching
    map.setSongPool(songPool);
    return map;
  });

  const [undoStack] = useState(() => new Stack(50));
  const [playbackHistory] = useState(() => new Stack(100));
  const [playNextQueue] = useState(() => new Queue());

  const [currentNode, setCurrentNode] = useState(playlist.getHead());
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);
  
  const audioRef = useRef(null);

  // Build hash map on initial load
  useEffect(() => {
    hashMap.rebuild(playlist);
    // Make sure song pool is set
    hashMap.setSongPool(songPool);
  }, [hashMap, playlist]);

  // Update component when playlist changes
  const refreshPlaylist = () => {
    setForceUpdate(prev => prev + 1);
    hashMap.rebuild(playlist);
    // Ensure song pool reference is maintained
    hashMap.setSongPool(songPool);
  };

  // Handle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
        if (currentNode) {
          playbackHistory.push({
            node: currentNode,
            timestamp: new Date().toISOString()
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle next song - CHECK QUEUE FIRST
  const handleNext = () => {
    if (!playNextQueue.isEmpty()) {
      const queuedSong = playNextQueue.dequeue();
      const node = hashMap.get(queuedSong.songName);
      if (node) {
        setCurrentNode(node);
        playbackHistory.push({
          node: node,
          timestamp: new Date().toISOString(),
          source: 'queue'
        });
        setIsPlaying(true);
        return;
      }
    }

    const nextNode = playlist.getNext(currentNode);
    setCurrentNode(nextNode);
    playbackHistory.push({
      node: nextNode,
      timestamp: new Date().toISOString(),
      source: 'navigation'
    });
    setIsPlaying(true);
  };

  // Handle previous song
  const handlePrev = () => {
    const prevNode = playlist.getPrev(currentNode);
    setCurrentNode(prevNode);
    playbackHistory.push({
      node: prevNode,
      timestamp: new Date().toISOString(),
      source: 'navigation'
    });
    setIsPlaying(true);
  };

  // Handle shuffle
  const handleShuffle = () => {
    const currentState = {
      type: 'shuffle',
      nodes: playlist.toArray().map(n => n.id)
    };
    undoStack.push(currentState);

    playlist.shuffle();
    setCurrentNode(playlist.getHead());
    refreshPlaylist();
    setIsPlaying(true);
  };

  // Handle delete current song
  const handleDelete = () => {
    if (playlist.getSize() === 1) {
      alert("Cannot delete the last song!");
      return;
    }

    const deletedNode = currentNode;
    undoStack.push({
      type: 'delete',
      node: deletedNode,
      prevNode: deletedNode.prev,
      nextNode: deletedNode.next
    });

    const nextNode = playlist.deleteNode(currentNode);
    setCurrentNode(nextNode);
    refreshPlaylist();
    
    if (isPlaying) {
      setIsPlaying(true);
    }
  };

  // Handle undo operation
  const handleUndo = () => {
    if (undoStack.isEmpty()) {
      alert("Nothing to undo!");
      return;
    }

    const lastAction = undoStack.pop();

    if (lastAction.type === 'delete') {
      alert("Undo delete - simplified implementation");
    } else if (lastAction.type === 'shuffle') {
      alert("Undo shuffle - would restore previous order");
    }

    refreshPlaylist();
  };

  // Handle song selection from playlist
  const handleSongSelect = (songId) => {
    const node = playlist.getNodeById(songId);
    if (node) {
      setCurrentNode(node);
      playbackHistory.push({
        node: node,
        timestamp: new Date().toISOString(),
        source: 'selection'
      });
      setIsPlaying(true);
    }
  };

  // Handle add song
  const handleAddSong = (songData) => {
    playlist.addSong(songData);
    hashMap.set(songData.songName, playlist.getTail());
    refreshPlaylist();
    setShowAddSongModal(false);
  };

  // Handle adding song from pool (via search)
  const handleAddSongFromPool = (songData) => {
    // Check if song already exists in playlist
    if (hashMap.has(songData.songName)) {
      // If it exists, just play it
      const existingNode = hashMap.get(songData.songName);
      setCurrentNode(existingNode);
      setIsPlaying(true);
      return;
    }

    // Add the song to playlist
    playlist.addSong(songData);
    const newNode = playlist.getTail();
    hashMap.set(songData.songName, newNode);
    
    // Set as current and play
    setCurrentNode(newNode);
    playbackHistory.push({
      node: newNode,
      timestamp: new Date().toISOString(),
      source: 'pool-search'
    });
    
    refreshPlaylist();
    setIsPlaying(true);
  };

  // Handle "Play Next" - add song to queue
  const handlePlayNext = (songId) => {
    const node = playlist.getNodeById(songId);
    if (node && !playNextQueue.contains(songId)) {
      playNextQueue.enqueue({
        id: node.id,
        songName: node.songName,
        artist: node.artist
      });
      refreshPlaylist();
    }
  };

  // Handle search - now searches both playlist and pool
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;

    // First try exact match in playlist
    const exactMatch = hashMap.get(searchTerm);
    if (exactMatch) {
      setCurrentNode(exactMatch);
      setIsPlaying(true);
      return;
    }

    // Then search all locations
    const results = hashMap.searchAll(searchTerm);
    
    // Prioritize playlist results
    if (results.playlist.length > 0) {
      setCurrentNode(results.playlist[0]);
      setIsPlaying(true);
      return;
    }
    
    // If not in playlist but found in pool, add and play
    if (results.pool.length > 0) {
      handleAddSongFromPool(results.pool[0]);
      return;
    }

    alert("No songs found!");
  };

  // Auto play next song when current ends
  useEffect(() => {
    const audio = audioRef.current;
    
    const handleEnded = () => {
      handleNext();
    };

    if (audio) {
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNode, playNextQueue]);

  // Update audio source when song changes
  useEffect(() => {
    if (audioRef.current && currentNode) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log("Playback error:", err));
      }
    }
  }, [currentNode, isPlaying]);

  return (
    <div className="App">
      <audio ref={audioRef}>
        {currentNode && <source src={currentNode.audioFile} type="audio/mpeg" />}
      </audio>

      <header className="app-header">
        <h1>Music Playlist - Multi Data Structure System</h1>
        <div className="header-actions">
          <button 
            className="theory-btn"
            onClick={() => setShowTheoryModal(true)}
          >
            Theory View
          </button>
        </div>
      </header>

      <SearchBar 
        onSearch={handleSearch} 
        hashMap={hashMap}
        onAddSongFromPool={handleAddSongFromPool}
      />

      <div className="main-content">
        <Playlist
          playlist={playlist}
          currentNode={currentNode}
          onSongSelect={handleSongSelect}
          onAddSong={() => setShowAddSongModal(true)}
          onPlayNext={handlePlayNext}
          forceUpdate={forceUpdate}
        />

        <Player
          currentNode={currentNode}
          isPlaying={isPlaying}
          audioRef={audioRef}
          onPlayPause={togglePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onShuffle={handleShuffle}
          onDelete={handleDelete}
          onUndo={handleUndo}
          canUndo={!undoStack.isEmpty()}
        />

        <Lyrics currentNode={currentNode} />
      </div>

      <div className="secondary-content">
        <PlayNextQueue 
          queue={playNextQueue} 
          forceUpdate={forceUpdate}
        />

        <PlaybackHistory 
          history={playbackHistory}
          onSelectSong={(node) => {
            setCurrentNode(node);
            setIsPlaying(true);
          }}
        />
      </div>

      <DoublyLinkedListVisualization
        playlist={playlist}
        currentNode={currentNode}
        forceUpdate={forceUpdate}
      />

      <div className="ds-info-panel">
        <div className="ds-stat">
          <span className="ds-label">Playlist (Circular DLL):</span>
          <span className="ds-value">{playlist.getSize()} songs</span>
        </div>
        <div className="ds-stat">
          <span className="ds-label">Play Next Queue:</span>
          <span className="ds-value">{playNextQueue.size()} queued</span>
        </div>
        <div className="ds-stat">
          <span className="ds-label">Undo Stack:</span>
          <span className="ds-value">{undoStack.size()} actions</span>
        </div>
        <div className="ds-stat">
          <span className="ds-label">History Stack:</span>
          <span className="ds-value">{playbackHistory.size()} played</span>
        </div>
        <div className="ds-stat">
          <span className="ds-label">Hash Map:</span>
          <span className="ds-value">{hashMap.size()} indexed</span>
        </div>
        <div className="ds-stat">
          <span className="ds-label">Song Pool:</span>
          <span className="ds-value">{songPool.length} total songs</span>
        </div>
      </div>

      {showTheoryModal && (
        <TheoryModal onClose={() => setShowTheoryModal(false)} />
      )}

      {showAddSongModal && (
        <AddSongModal
          playlist={playlist}
          onAddSong={handleAddSong}
          onClose={() => setShowAddSongModal(false)}
        />
      )}
    </div>
  );
}

export default App;