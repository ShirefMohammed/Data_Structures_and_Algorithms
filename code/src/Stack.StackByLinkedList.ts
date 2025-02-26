/* Stack by LinkedList */

namespace Stack.StackByLinkedList {
  export class Node<T> {
    public data: T;
    public next: Node<T> | null;

    public constructor(data: T) {
      this.data = data;
      this.next = null;
    }
  }

  export class StackByLinkedList<T> {
    public top: Node<T>;
    public size: number;

    public constructor() {
      this.top = null;
      this.size = 0;
    }

    public Size(): number {
      return this.size;
    }

    public IsEmpty(): boolean {
      return this.size === 0;
    }

    public Push(nodeValue: T): void {
      const newNode = new Node(nodeValue);

      newNode.next = this.top;

      this.top = newNode;

      this.size++;
    }

    public Peek(): Node<T> {
      return this.top;
    }

    public Pop(): Node<T> {
      if (this.IsEmpty()) {
        return this.top;
      }

      const targetNode = this.top;

      this.top = this.top.next;

      this.size--;

      return targetNode;
    }
  }
}

// Test Stack By LinkedList
(() => {
  // initialize Stack
  const stack = new Stack.StackByLinkedList.StackByLinkedList<string>();

  // check if stack empty
  console.log(stack.IsEmpty()); // true

  // get stack size
  console.log(stack.Size()); // 0

  // peek top of stack
  console.log(stack.Peek()); // null

  // pop top of stack
  console.log(stack.Pop()); // null

  // Test Non Empty Stack

  // push items at top
  stack.Push("item[0]");
  stack.Push("item[1]");
  stack.Push("item[2]");

  // check if stack empty
  console.log(stack.IsEmpty()); // false

  // get stack size
  console.log(stack.Size()); // 3

  // peek top of stack
  console.log(stack.Peek().data); // item[2]

  // pop top of stack
  console.log(stack.Pop().data); // item[2]
  console.log(stack.Pop().data); // item[1]
  console.log(stack.Pop().data); // item[0]

  // check if stack empty
  console.log(stack.IsEmpty()); // true
})();
