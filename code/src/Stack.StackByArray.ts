/* Stack by Array */

namespace Stack.StackByArray {
  export class StackByArray<T> {
    public arr: T[];
    public capacity: number;
    public topIndex: number;

    public constructor(capacity: number) {
      this.arr = new Array(capacity);
      this.capacity = capacity;
      this.topIndex = -1;
    }

    public Size(): number {
      return this.topIndex + 1;
    }

    public IsEmpty(): boolean {
      return this.topIndex === -1;
    }

    public IsFull(): boolean {
      return this.topIndex + 1 === this.capacity;
    }

    public Push(val: T): void {
      if (this.IsFull()) {
        return;
      }

      this.arr[++this.topIndex] = val;
    }

    public Peek(): T {
      if (this.IsEmpty()) {
        return null;
      }

      return this.arr[this.topIndex];
    }

    public Pop(): T {
      if (this.IsEmpty()) {
        return null;
      }

      return this.arr[this.topIndex--];
    }
  }
}

// Test Stack By Array
(() => {
  // initialize Stack
  const stack = new Stack.StackByArray.StackByArray<string>(5);

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
  console.log(stack.Peek()); // item[2]

  // pop top of stack
  console.log(stack.Pop()); // item[2]
  console.log(stack.Pop()); // item[1]
  console.log(stack.Pop()); // item[0]

  // check if stack empty
  console.log(stack.IsEmpty()); // true
})();
