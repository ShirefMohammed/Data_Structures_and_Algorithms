/* Single Linked List */

namespace SingleLinkedList {
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

    public constructor() {
      this.size = 0;
      this.head = null;
    }

    public Add(newNodeData: T): void {
      const newNode = new Node<T>(newNodeData);

      if (this.head === null) {
        this.head = newNode;
      } else {
        let current: Node<T> | null = this.head;

        while (current.next !== null) {
          current = current.next;
        }

        current.next = newNode;
      }

      this.size++;
    }

    public PrintAll(): void {
      let current: Node<T> | null = this.head;
      let output: string = "";

      while (current !== null) {
        output += current.data + " -> ";
        current = current.next;
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
        this.head = this.head.next;
        this.size--;
      } else {
        let previous: Node<T> | null = this.head;
        let current: Node<T> | null = this.head?.next;

        while (current !== null) {
          if (current.data === data) {
            previous.next = current.next;
            this.size--;
            break;
          } else {
            previous = current;
            current = current.next;
          }
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

        while (current.next !== null) {
          if (+current.data - +current.next.data > 0) {
            // Swap the data
            const temp = current.data;
            current.data = current.next.data;
            current.next.data = temp;

            sorted = false;
          }

          current = current.next;
        }
      }
    }
  }
}

// Test Single Linked List
(() => {
  // Initialize single linkedList
  const linkedList = new SingleLinkedList.LinkedList<string>();

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

  const linkedList = new SingleLinkedList.LinkedList<number>();
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
