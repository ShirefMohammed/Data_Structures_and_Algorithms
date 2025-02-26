/* Circular Single Linked List */

namespace CircularSingleLinkedList {
  export class Node<T> {
    public data: T;
    public next: Node<T> | null;

    public constructor(data: T) {
      this.data = data;
      this.next = null;
    }
  }

  export class LinkedList<T> {
    public size: number;
    private head: Node<T> | null;
    private tail: Node<T> | null;

    public constructor() {
      this.size = 0;
      this.head = null;
      this.tail = null;
    }

    public Add(newNodeData: T): void {
      const newNode = new Node<T>(newNodeData);

      if (this.head === null) {
        this.head = newNode;
      } else {
        this.tail.next = newNode;
      }

      newNode.next = this.head;
      this.tail = newNode;

      this.size++;
    }

    public PrintAll(): void {
      let current: Node<T> | null = this.head;
      let output: string = "";
      let counter = 0;

      while (counter < this.size) {
        output += current.data + " -> ";
        current = current.next;
        counter++;
      }

      output += "null";

      console.log(output);
    }

    public GetItemData(index: number): T | undefined {
      if (index < 0 || index >= this.size) {
        throw new Error("Index out of range");
      }

      if (index === 0) {
        return this.head?.data;
      } else {
        let current: Node<T> | null = this.head;
        let counter: number = 0;

        while (counter < index) {
          current = current?.next;
          counter++;
        }

        return current?.data;
      }
    }

    public Update(index: number, newData: T): void {
      if (index < 0 || index >= this.size) {
        throw new Error("Index out of range");
      }

      if (index === 0) {
        this.head.data = newData;
      } else {
        let current: Node<T> | null = this.head;
        let counter: number = 0;

        while (counter < index) {
          current = current?.next;
          counter++;
        }

        current.data = newData;
      }
    }

    public Remove(data: T): void {
      if (this.head?.data === data) {
        if (this.head.next?.next === this.head)
          this.head.next.next = this.head.next;
        this.head = this.head.next;
        this.size--;
      } else {
        let previous: Node<T> | null = this.head;
        let current: Node<T> | null = this.head?.next;
        let counter = 1;

        while (counter < this.size) {
          if (current?.data === data) {
            previous.next = current.next;
            if (current === this.tail) this.tail = previous;
            this.size--;
            break;
          } else {
            previous = current;
            current = current.next;
          }

          counter++;
        }
      }
    }

    public Insert(index: number, newNodeData: T): void {
      if (index < 0 || index >= this.size) {
        throw new Error("Index out of range");
      }

      const newNode = new Node<T>(newNodeData);

      if (index === 0) {
        newNode.next = this.head;
        this.head = newNode;
        this.tail.next = this.head;
        this.size++;
      } else {
        let previous: Node<T> | null = this.head;
        let current: Node<T> | null = this.head?.next;
        let counter: number = 1;

        while (counter < index) {
          previous = current;
          current = current?.next;
          counter++;
        }

        newNode.next = current;
        previous.next = newNode;
        if (current === this.tail) this.tail = previous;
        this.size++;
      }
    }

    public Sort(): void {
      if (!this.head || this.size < 2) {
        return;
      }

      let sorted = false;

      while (!sorted) {
        sorted = true;
        let current = this.head;
        let counter = 0;

        while (counter < this.size - 1) {
          if (+current.data - +current.next.data > 0) {
            // Swap the data
            const temp = current.data;
            current.data = current.next.data;
            current.next.data = temp;

            sorted = false;
          }

          current = current.next;
          counter++;
        }
      }
    }
  }
}

// Test Circular Single Linked List
(() => {
  // Initialize circular single linkedList
  const linkedList = new CircularSingleLinkedList.LinkedList<string>();

  // Add
  console.log(">> Add");
  linkedList.Add("item[0]");
  linkedList.Add("item[1]");
  linkedList.Add("item[2]");
  linkedList.Add("item[3]");
  linkedList.Add("item[4]");
  console.log("5 items are added");

  // PrintAll
  console.log(">> PrintAll");
  linkedList.PrintAll();
  // item[0] -> item[1] -> item[2] -> item[3] -> item[4] -> null

  // GetItemData
  console.log(">> GetItemData");
  console.log("linkedList.GetItemData(0):", linkedList.GetItemData(0)); // item[0]
  console.log("linkedList.GetItemData(2):", linkedList.GetItemData(2)); // item[2]
  console.log("linkedList.GetItemData(4):", linkedList.GetItemData(4)); // item[4]

  // Updated
  console.log(">> Updated");
  linkedList.Update(4, "Updated");
  linkedList.PrintAll();
  // item[0] -> item[1] -> item[2] -> item[3] -> Updated -> null

  // Remove
  console.log(">> Remove");
  linkedList.Remove("Updated");
  linkedList.PrintAll();
  // item[0] -> item[1] -> item[2] -> item[3] -> null

  // Insert
  console.log(">> Insert");
  linkedList.Insert(2, "Inserted");
  linkedList.PrintAll();
  // item[0] -> item[1] -> Inserted -> item[2] -> item[3] -> null
})();

// Test Sorting
(() => {
  console.log(">> Sorting");

  const linkedList = new CircularSingleLinkedList.LinkedList<number>();
  linkedList.Add(5);
  linkedList.Add(3);
  linkedList.Add(8);
  linkedList.Add(1);

  console.log("Before sorting:");
  linkedList.PrintAll(); // 5 -> 3 -> 8 -> 1 -> null

  linkedList.Sort();

  console.log("After sorting:");
  linkedList.PrintAll(); // 1 -> 3 -> 5 -> 8 -> null
})();
