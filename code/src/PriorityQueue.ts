// Implement Priority Queue as Application on Heap by Typescript

// link for revision => https://www.programiz.com/dsa/priority-queue

export namespace PriorityQueue {
  export class Person {
    public name: string;
    public age: number; // priority for person with heigh age

    public constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }

  export class PriorityQueue {
    private heap: (Person | null)[];
    private size: number;
    private capacity: number;

    public constructor(capacity: number) {
      this.heap = new Array(capacity);
      this.size = 0;
      this.capacity = capacity;
    }

    public Count = () => this.size;

    public IsEmpty = () => this.size === 0;

    public IsFull = () => this.size === this.capacity;

    public Enqueue(name: string, age: number): void {
      if (this.IsFull()) {
        console.log("Item Not Added, PriorityQueue is full");
      } else {
        this.heap[this.size] = new Person(name, age);
        this.HeapifyUp(this.size);
        this.size++;
      }
    }

    public Peek(): Person | null {
      if (this.IsEmpty()) {
        return null;
      } else {
        return this.heap[0];
      }
    }

    public Dequeue(): Person | null {
      if (this.IsEmpty()) {
        return null;
      } else {
        let item = this.heap[0];
        this.Swap(0, this.size - 1);
        this.heap[this.size - 1] = null;
        this.size--;
        this.HeapifyDown(0);
        return item;
      }
    }

    private HeapifyUp(index: number) {
      let parent = Math.floor((index - 1) / 2);
      while (index > 0 && this.heap[index].age > this.heap[parent].age) {
        this.Swap(index, parent);
        index = parent;
        parent = Math.floor((index - 1) / 2);
      }
      // change > to < to convert max-heap to min-heap
    }

    private HeapifyDown(index: number) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let largest = index;

      if (
        leftChild < this.size
        && this.heap[leftChild].age > this.heap[largest].age
      ) {
        largest = leftChild;
      }

      if (
        rightChild < this.size
        && this.heap[rightChild].age > this.heap[largest].age
      ) {
        largest = rightChild;
      }

      if (largest !== index) {
        this.Swap(index, largest);
        this.HeapifyDown(largest)
      }
      // change > to < to convert max-heap to min-heap
    }

    private Swap(first: number, second: number) {
      let temp = this.heap[first];
      this.heap[first] = this.heap[second];
      this.heap[second] = temp;
    }

    public Print(): void {
      let output = "";
      let e = 0;
      let c = 0;

      for (let i = 0; i < this.size; i++) {
        c++;
        output += this.heap[i].age;
        if (Math.pow(2, e) === c) {
          output += "\n";
          e++;
          c = 0;
        } else {
          output += " ";
        }
      }

      console.log(output);
    }
  }
}

// initialize PriorityQueue
const priorityQueue = new PriorityQueue.PriorityQueue(6);

priorityQueue.Enqueue("ali", 40);
priorityQueue.Enqueue("mohammed", 50);
priorityQueue.Enqueue("saed", 35);
priorityQueue.Enqueue("ahmed", 45);
priorityQueue.Enqueue("shiref", 30);
priorityQueue.Enqueue("amr", 25);

priorityQueue.Print();
/*
max-heap       
        50     
    45      35 
  40  30  25   
*/

console.log("-----------------------------------------");

console.log(priorityQueue.Count()); // 6
console.log(priorityQueue.IsEmpty()); // false
console.log(priorityQueue.IsFull()); // true

console.log("-----------------------------------------");

console.log(priorityQueue.Peek());
// Person { name: 'mohammed', age: 50 }

console.log("-----------------------------------------");

console.log(priorityQueue.Dequeue());
// Person { name: 'mohammed', age: 50 }
console.log(priorityQueue.Dequeue());
// Person { name: 'ahmed', age: 45 }
console.log(priorityQueue.Dequeue());
// Person { name: 'ali', age: 40 }
console.log(priorityQueue.Dequeue());
// Person { name: 'saed', age: 35 }

console.log("-----------------------------------------");

priorityQueue.Print();
/*
    30
  25   
*/