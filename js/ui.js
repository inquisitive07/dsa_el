const playlistEl = document.getElementById("playlist");
const dllNodesEl = document.getElementById("dll-nodes");

const coverImg = document.getElementById("cover-image");
const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("song-artist");

function renderPlaylist(dll, current) {
  playlistEl.innerHTML = "";
  let node = dll.head;

  while (node) {
    const li = document.createElement("li");
    li.className = node === current ? "active" : "";
    li.innerHTML = `<span>${node === current ? "▶" : ""}</span>${node.song.title}`;
    li.onclick = () => setCurrentNode(node);
    playlistEl.appendChild(li);
    node = node.next;
  }
}

function renderDLL(dll, current) {
  dllNodesEl.innerHTML = "";
  let node = dll.head;

  while (node) {
    const box = document.createElement("div");
    box.className = "dll-node";

    let label = "";
    if (node === dll.head) label += "HEAD ";
    if (node === dll.tail) label += "TAIL ";
    if (node === current) label += "CURRENT";

    box.innerHTML = `<strong>${node.song.title}</strong><small>${label}</small>`;
    if (node === current) box.classList.add("active");

    dllNodesEl.appendChild(box);

    if (node.next) {
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "⇄";
      dllNodesEl.appendChild(arrow);
    }

    node = node.next;
  }
}

function updateNowPlaying(node) {
  coverImg.src = node.song.cover;
  titleEl.textContent = node.song.title;
  artistEl.textContent = node.song.artist;
}

function updateUI(dll, current) {
  renderPlaylist(dll, current);
  renderDLL(dll, current);
  updateNowPlaying(current);
}
