/* Queue by LinkedList */

export namespace QueueByLinkedList {
  export class Node<T> {
    public data: T;
    public next: Node<T> | null;

    public constructor(data: T) {
      this.data = data;
      this.next = null;
    }
  }

  export class Queue<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;

    public constructor() {
      this.head = null;
      this.tail = null;
      this.size = 0;
    }

    public Size(): number {
      return this.size;
    }

    public IsEmpty(): boolean {
      return this.size === 0;
    }

    public Enqueue(data: T): void {
      const newNode: Node<T> = new Node<T>(data);

      if (this.head === null && this.tail === null) {
        this.head = newNode;
        this.tail = newNode;
        this.size++;
        return;
      }

      this.tail.next = newNode;
      this.tail = this.tail.next;
      this.size++;
    }

    public Dequeue(): Node<T> | null {
      if (this.head === null) {
        return null;
      }

      let target = this.head;

      this.head = this.head.next;
      this.size--;

      return target;
    }

    public Peek(): Node<T> | null {
      return this.head;
    }
  }
}

(() => {
  // initialize Queue
  const queue = new QueueByLinkedList.Queue<string>();

  // Test Empty Queue

  // check if queue empty
  console.log(queue.IsEmpty()); // true

  // get queue size
  console.log(queue.Size()); // 0

  // get first item of queue without removing it from queue
  console.log(queue.Peek()); // null

  // dequeue to get first item of queue and remove it from queue
  console.log(queue.Dequeue()); // null

  // Test Non Empty Queue

  // enqueue items to queue
  queue.Enqueue("item[0]");
  queue.Enqueue("item[1]");
  queue.Enqueue("item[2]");
  queue.Enqueue("item[3]");
  queue.Enqueue("item[4]");
  queue.Enqueue("item[5]"); // will be added it's unlimited queue

  // check if queue empty
  console.log(queue.IsEmpty()); // false

  // get queue size
  console.log(queue.Size()); // 6

  // get first item of queue without removing it from queue
  console.log(queue.Peek()); // item[0]

  // dequeue to get first item of queue and remove it from queue
  console.log(queue.Dequeue()); // item[0]
  console.log(queue.Dequeue()); // item[1]
  console.log(queue.Dequeue()); // item[2]
  console.log(queue.Dequeue()); // item[3]
  console.log(queue.Dequeue()); // item[4]
  console.log(queue.Dequeue()); // item[5]

  // check if queue empty
  console.log(queue.IsEmpty()); // true
})();
