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

  // Delete a specific node from the circular DLL
  delete(nodeToDelete) {
    if (!nodeToDelete || !this.head) return null;

    // Case 1: Only one node in the list
    if (this.head === this.tail && nodeToDelete === this.head) {
      this.head = null;
      this.tail = null;
      return null; // No nodes left
    }

    // Case 2: Deleting head
    if (nodeToDelete === this.head) {
      this.head = this.head.next;
      this.head.prev = this.tail;
      this.tail.next = this.head;
      return this.head; // Return new head as safe current
    }

    // Case 3: Deleting tail
    if (nodeToDelete === this.tail) {
      this.tail = this.tail.prev;
      this.tail.next = this.head;
      this.head.prev = this.tail;
      return this.tail; // Return new tail as safe current
    }

    // Case 4: Deleting middle node
    nodeToDelete.prev.next = nodeToDelete.next;
    nodeToDelete.next.prev = nodeToDelete.prev;
    return nodeToDelete.next; // Return next node as safe current
  }

  // Convert DLL to array (for shuffle)
  toArray() {
    if (!this.head) return [];
    
    const arr = [];
    let node = this.head;
    
    do {
      arr.push(node.song);
      node = node.next;
    } while (node !== this.head);
    
    return arr;
  }

  // Rebuild DLL from array (after shuffle)
  fromArray(songsArray) {
    this.head = null;
    this.tail = null;
    
    songsArray.forEach(song => this.add(song));
  }
}
