/* ======================================
   LocalStorage Handling
====================================== */

const STORAGE_KEY = "dll_playlist";

/* -------- Save Playlist -------- */
function savePlaylist(dll) {
  const songs = [];
  let current = dll.head;

  while (current) {
    songs.push(current.song);
    current = current.next;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
}

/* -------- Load Playlist -------- */
function loadPlaylist() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  return JSON.parse(data);
}
