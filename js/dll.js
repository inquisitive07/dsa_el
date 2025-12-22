/* ======================================
   Doubly Linked List Implementation
   Playlist Data Structure
====================================== */

/* -------- Node Definition -------- */
class SongNode {
  constructor(song) {
    this.song = song;
    this.prev = null;
    this.next = null;
  }
}

/* -------- Doubly Linked List -------- */
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /* Check if list is empty */
  isEmpty() {
    return this.length === 0;
  }

  /* -------- Insert at End -------- */
  addToEnd(song) {
    const newNode = new SongNode(song);

    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
    return newNode;
  }

  /* -------- Insert at Index -------- */
  addAtIndex(song, index) {
    if (index < 0 || index > this.length) return null;

    if (index === this.length) {
      return this.addToEnd(song);
    }

    const newNode = new SongNode(song);

    if (index === 0) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    } else {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }

      newNode.prev = current.prev;
      newNode.next = current;
      current.prev.next = newNode;
      current.prev = newNode;
    }

    this.length++;
    return newNode;
  }

  /* -------- Remove a Node -------- */
  removeNode(node) {
    if (!node || this.isEmpty()) return;

    if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      if (node === this.head) {
        this.head = node.next;
        this.head.prev = null;
      } else if (node === this.tail) {
        this.tail = node.prev;
        this.tail.next = null;
      } else {
        node.prev.next = node.next;
        node.next.prev = node.prev;
      }
    }

    this.length--;
  }

  /* -------- Move Node Up -------- */
  moveUp(node) {
    if (!node || node === this.head) return;

    const prevNode = node.prev;

    // Swap links
    const beforePrev = prevNode.prev;
    const afterNode = node.next;

    node.prev = beforePrev;
    node.next = prevNode;
    prevNode.prev = node;
    prevNode.next = afterNode;

    if (afterNode) afterNode.prev = prevNode;
    if (beforePrev) beforePrev.next = node;

    if (prevNode === this.head) this.head = node;
    if (node === this.tail) this.tail = prevNode;
  }

  /* -------- Move Node Down -------- */
  moveDown(node) {
    if (!node || node === this.tail) return;
    this.moveUp(node.next);
  }

  /* -------- Search -------- */
  search(query) {
    const results = [];
    let current = this.head;

    while (current) {
      const { title, artist } = current.song;
      if (
        title.toLowerCase().includes(query.toLowerCase()) ||
        artist.toLowerCase().includes(query.toLowerCase())
      ) {
        results.push(current);
      }
      current = current.next;
    }

    return results;
  }

  /* -------- Traverse Forward -------- */
  traverseForward() {
    const nodes = [];
    let current = this.head;

    while (current) {
      nodes.push(current);
      current = current.next;
    }

    return nodes;
  }

  /* -------- Traverse Backward -------- */
  traverseBackward() {
    const nodes = [];
    let current = this.tail;

    while (current) {
      nodes.push(current);
      current = current.prev;
    }

    return nodes;
  }

  /* -------- Shuffle Playlist -------- */
  shuffle() {
    const nodes = this.traverseForward();

    // Fisher-Yates Shuffle
    for (let i = nodes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nodes[i], nodes[j]] = [nodes[j], nodes[i]];
    }

    // Rebuild links
    this.head = nodes[0];
    this.tail = nodes[nodes.length - 1];

    nodes.forEach((node, index) => {
      node.prev = index === 0 ? null : nodes[index - 1];
      node.next = index === nodes.length - 1 ? null : nodes[index + 1];
    });
  }
}
