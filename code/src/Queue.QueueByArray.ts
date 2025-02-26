/* Queue by Array */

namespace QueueByArray {
  export class Queue<T> {
    private queue: T[];
    private front: number;
    private rear: number;
    private capacity: number;
    private size: number;

    public constructor(capacity: number) {
      this.capacity = capacity;
      this.queue = new Array(capacity);
      this.front = 0;
      this.rear = capacity - 1;
      this.size = 0;
    }

    public Size(): number {
      return this.size;
    }

    public IsEmpty(): boolean {
      return this.size === 0;
    }

    public IsFull(): boolean {
      return this.size === this.capacity;
    }

    public Enqueue(item: T): void {
      if (this.IsFull()) {
        return;
      }

      this.rear = (this.rear + 1) % this.capacity;
      this.queue[this.rear] = item;
      this.size++;
    }

    public Dequeue(): T | null {
      if (this.IsEmpty()) {
        return null;
      }

      let item: T = this.queue[this.front];
      this.front = (this.front + 1) % this.capacity;
      this.size--;
      return item;
    }

    public Peek(): T | null {
      if (this.IsEmpty()) {
        return null;
      }

      return this.queue[this.front];
    }

    public GetRear(): T | null {
      if (this.IsEmpty()) {
        return null;
      }

      return this.queue[this.rear];
    }
  }
}

(() => {
  // initialize Queue
  const queue = new QueueByArray.Queue<string>(5);

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
  queue.Enqueue("item[5]"); // Queue is full - not added

  // check if queue empty
  console.log(queue.IsEmpty()); // false

  // get queue size
  console.log(queue.Size()); // 5

  // get first item of queue without removing it from queue
  console.log(queue.Peek()); // item[0]

  // get last item of queue without removing it from queue
  console.log(queue.GetRear()); // item[4]

  // dequeue to get first item of queue and remove it from queue
  console.log(queue.Dequeue()); // item[0]
  console.log(queue.Dequeue()); // item[1]
  console.log(queue.Dequeue()); // item[2]
  console.log(queue.Dequeue()); // item[3]
  console.log(queue.Dequeue()); // item[4]

  // check if queue empty
  console.log(queue.IsEmpty()); // true
})();
