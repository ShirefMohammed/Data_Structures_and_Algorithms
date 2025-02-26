// Implement Heap Using Typescript

export namespace Heap {
  export class Heap {
    private heap: number[];
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

    public Add(item: number): void {
      if (this.IsFull()) {
        console.log("Heap is full");
      } else {
        this.heap[this.size] = item;
        this.HeapifyUp(this.size);
        this.size++;
      }
    }

    public Remove(index: number): number | null {
      if (index < 0 || index >= this.size) {
        console.log("No item in this index to delete");
        return null;
      } else {
        const removed = this.heap[index];
        this.Swap(index, this.size - 1);
        this.size--;
        // check if item in index is greater then parent or its children
        if (
          index > 0 &&
          this.heap[index] > this.heap[Math.floor((index - 1) / 2)]
        ) {
          this.HeapifyUp(index);
        } else {
          this.HeapifyDown(index);
        }
        return removed;
      }
    }

    private HeapifyUp(index: number) {
      let parent = Math.floor((index - 1) / 2);
      while (index > 0 && this.heap[index] > this.heap[parent]) {
        this.Swap(index, parent);
        index = parent;
        parent = Math.floor((index - 1) / 2);
      }
    }

    private HeapifyDown(index: number) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let largest = index;

      if (leftChild < this.size && this.heap[leftChild] > this.heap[largest]) {
        largest = leftChild;
      }

      if (
        rightChild < this.size &&
        this.heap[rightChild] > this.heap[largest]
      ) {
        largest = rightChild;
      }

      if (largest !== index) {
        this.Swap(index, largest);
        this.HeapifyDown(largest);
      }
    }

    private Swap(first: number, second: number) {
      let temp = this.heap[first];
      this.heap[first] = this.heap[second];
      this.heap[second] = temp;
    }

    public Print(): void {
      let c = 0;
      let p = 0;
      let output = "";

      for (let i = 0; i < this.size; i++) {
        c++;
        output += this.heap[i];

        if (Math.pow(2, p) === c) {
          output += "\n";
          p++;
          c = 0;
        } else {
          output += " ";
        }
      }

      console.log(output);
    }
  }
}

(() => {
  // initialize Heap
  const heap = new Heap.Heap(6);

  heap.Add(3);
  heap.Add(9);
  heap.Add(2);
  heap.Add(1);
  heap.Add(4);
  heap.Add(5);

  heap.Print();
  /*
    heap is a complete binary tree
            9       
        4       5   
      1   3   2     
  */

  console.log("-----------------------------------------");

  console.log(heap.Count()); // 6
  console.log(heap.IsEmpty()); // false
  console.log(heap.IsFull()); // true

  console.log("-----------------------------------------");

  // Remove Existing Item
  console.log(heap.Remove(0)); // 9
  console.log(heap.Remove(0)); // 5

  console.log("-----------------------------------------");

  // Remove Not Existing Item
  console.log(heap.Remove(4)); // No item in this index to delete, null

  console.log("-----------------------------------------");

  heap.Print();
  /*
        4       
    3       2   
  1           
*/
})();
