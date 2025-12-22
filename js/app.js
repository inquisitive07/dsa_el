/* ======================================
   Application Entry Point
====================================== */

/* -------- Global Playlist State -------- */
const playlistDLL = new DoublyLinkedList();
let currentNode = null;

/* -------- Initialize Playlist -------- */
function initializePlaylist() {
  // Try loading from LocalStorage first
  const storedSongs = loadPlaylist();

  const songsToLoad = storedSongs || sampleSongs;

  songsToLoad.forEach(song => {
    playlistDLL.addToEnd(song);
  });

  currentNode = playlistDLL.head;
  updateUI(playlistDLL, currentNode);
}

/* -------- Set Current Node -------- */
function setCurrentNode(node) {
  currentNode = node;
  playCurrentSong();
  updateUI(playlistDLL, currentNode);
}

/* -------- Save Playlist State -------- */
function persistPlaylist() {
  savePlaylist(playlistDLL);
}

/* -------- App Start -------- */
initializePlaylist();
