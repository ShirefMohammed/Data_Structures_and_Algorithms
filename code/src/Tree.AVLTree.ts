// AVL Tree Implementation Typescript

export namespace AVLTree {
  export class Node {
    public key: number;
    public height: number;
    public left: Node | null;
    public right: Node | null;

    public constructor(key: number) {
      this.key = key;
      this.height = 0;
      this.left = null;
      this.right = null;
    }
  }

  export class AVLTree {
    private root: Node | null;

    public constructor() {
      this.root = null;
    }

    // Get Height Of Node
    private GetHeight(node: Node | null): number {
      if (node === null) return -1;
      else return node.height;
    }

    // Update Height Of Node
    private UpdateHeight(node: Node | null): void {
      if (node !== null) {
        node.height =
          1 + Math.max(this.GetHeight(node.left), this.GetHeight(node.right));
      }
    }

    // Get Balance Factor
    private GetBalanceFactor(node: Node | null): number {
      if (node === null) return 0;
      else return this.GetHeight(node.left) - this.GetHeight(node.right);
    }

    // Rotate Right
    private RotateRight(root: Node): Node | null {
      if (root !== null && root.left != null) {
        const newRoot = root.left;
        const temp = newRoot?.right;

        newRoot.right = root;
        root.left = temp;

        this.UpdateHeight(root);
        this.UpdateHeight(newRoot);

        return newRoot;
      }

      return null;
    }

    // Rotate Left
    private RotateLeft(root: Node): Node | null {
      if (root !== null && root.right != null) {
        const newRoot = root.right;
        const temp = newRoot?.left;

        newRoot.left = root;
        root.right = temp;

        this.UpdateHeight(root);
        this.UpdateHeight(newRoot);

        return newRoot;
      }

      return null;
    }

    // Insert Item To Tree
    public InsertItem(key: number): void {
      this.root = this.InsertHelper(this.root, key);
    }

    private InsertHelper(current: Node | null, key: number): Node | null {
      if (current === null) {
        return new Node(key);
      } else if (key < current.key) {
        current.left = this.InsertHelper(current.left, key);
      } else if (key > current.key) {
        current.right = this.InsertHelper(current.right, key);
      } else {
        return current;
      }

      this.UpdateHeight(current);

      let balanceFactor = this.GetBalanceFactor(current);

      // left left rotation
      if (balanceFactor > 1 && key === current.left?.left?.key) {
        return this.RotateRight(current);
      }

      // left right rotation
      if (balanceFactor > 1 && key === current.left?.right?.key) {
        current.left = this.RotateLeft(current.left);
        return this.RotateRight(current);
      }

      // right right rotation
      if (balanceFactor < -1 && key === current.right?.right?.key) {
        return this.RotateLeft(current);
      }

      // right left rotation
      if (balanceFactor < -1 && key === current.right?.left?.key) {
        current.right = this.RotateRight(current.right);
        return this.RotateLeft(current);
      }

      return current;
    }

    // Print Items In Order Traverse
    public PrintInOrder(): void {
      this.InOrderHelper(this.root);
    }

    private InOrderHelper(current: Node | null): void {
      if (current !== null) {
        this.InOrderHelper(current.left);
        console.log(current.key);
        this.InOrderHelper(current.right);
      }
    }

    // Delete Item From Tree
    public DeleteItem(key: number): void {
      this.root = this.DeleteItemHelper(this.root, key);
    }

    private DeleteItemHelper(current: Node | null, key: number): Node | null {
      if (current === null) {
        return current;
      } else if (key < current.key) {
        current.left = this.DeleteItemHelper(current.left, key);
      } else if (key > current.key) {
        current.right = this.DeleteItemHelper(current.right, key);
      } else {
        if (current.left === null) {
          return current.right;
        } else if (current.right === null) {
          return current.left;
        } else {
          const MinInLeftSubTree = this.FindMinimum(current.left);
          current.key = MinInLeftSubTree.key;
          current.left = this.DeleteItemHelper(
            current.left,
            MinInLeftSubTree.key
          );
        }
      }

      this.UpdateHeight(current);

      let balanceFactor = this.GetBalanceFactor(current);

      // left left rotation
      if (balanceFactor > 1 && key === current.left?.left?.key) {
        return this.RotateRight(current);
      }

      // left right rotation
      if (balanceFactor > 1 && key === current.left?.right?.key) {
        current.left = this.RotateLeft(current.left);
        return this.RotateRight(current);
      }

      // right right rotation
      if (balanceFactor < -1 && key === current.right?.right?.key) {
        return this.RotateLeft(current);
      }

      // right left rotation
      if (balanceFactor < -1 && key === current.right?.left?.key) {
        current.right = this.RotateRight(current.right);
        return this.RotateLeft(current);
      }

      return current;
    }

    // Find the node with the minimum key in any Subtree
    private FindMinimum(node: Node): Node {
      let current = node;
      while (current.left != null) {
        current = current.left;
      }
      return current;
    }
  }
}

(() => {
  // initialize AVL Tree
  const tree = new AVLTree.AVLTree();

  /* 
            30       
        20      40    
    10	  25       50
*/

  // Insert Items To The Tree
  tree.InsertItem(10);
  tree.InsertItem(20);
  tree.InsertItem(30);
  tree.InsertItem(40);
  tree.InsertItem(50);
  tree.InsertItem(25);

  // Print Items in Order Traverse Ascending Order
  tree.PrintInOrder(); // 10 20 25 30 40 50

  console.log("-----------------------------------------");

  // Delete Items
  tree.DeleteItem(25);
  tree.DeleteItem(30);
  tree.PrintInOrder(); // 10 20 40 50
})();
