class Node {
  constructor(song) {
    this.song = song;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(song) {
    const node = new Node(song);

    if (!this.head) {
      // First node
      this.head = this.tail = node;
      node.next = node;
      node.prev = node;
    } else {
      // Insert at tail (circular)
      node.prev = this.tail;
      node.next = this.head;

      this.tail.next = node;
      this.head.prev = node;

      this.tail = node;
    }
    return node;
  }
}
