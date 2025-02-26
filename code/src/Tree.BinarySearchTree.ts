// Binary Search Tree Implementation Typescript

export namespace BinarySearchTree {
  export class Node {
    public key: number;
    public left: Node | null;
    public right: Node | null;

    public constructor(key: number) {
      this.key = key;
      this.left = null;
      this.right = null;
    }
  }

  export class BST {
    private root: Node | null;
    public size: number;

    public constructor() {
      this.root = null;
      this.size = 0;
    }

    public Add(key: number): void {
      const newNode = new Node(key);

      if (this.root === null) {
        this.root = newNode;
      } else {
        let current = this.root;
        let parent = this.root;

        while (current !== null) {
          parent = current;

          if (newNode.key < current.key) {
            current = current.left;
          } else {
            current = current.right;
          }
        }

        if (newNode.key < parent.key) {
          parent.left = newNode;
        } else {
          parent.right = newNode;
        }
      }

      this.size++;
    }

    // Get Node with min key
    public GetMinNode(): Node | null {
      let current = this.root;

      if (current === null) {
        return null;
      } else {
        while (current.left !== null) {
          current = current.left;
        }

        return current;
      }
    }

    // Get Node with max key
    public GetMaxNode(): Node | null {
      let current: Node | null = this.root;

      if (current === null) {
        return null;
      } else {
        while (current.right !== null) {
          current = current.right;
        }

        return current;
      }
    }

    // Get Node with min key
    public GetMinNodeByRecursion(): Node | null {
      if (this.root === null) {
        return this.root;
      } else {
        return this.GetMinNodeByRecursionHelper(this.root);
      }
    }

    private GetMinNodeByRecursionHelper(current: Node): Node | null {
      if (current.left === null) {
        return current;
      } else {
        return this.GetMinNodeByRecursionHelper(current.left);
      }
    }

    // Get Node with max key
    public GetMaxNodeByRecursion(): Node | null {
      if (this.root === null) {
        return this.root;
      } else {
        return this.GetMaxNodeByRecursionHelper(this.root);
      }
    }

    private GetMaxNodeByRecursionHelper(current: Node): Node | null {
      if (current.right === null) {
        return current;
      } else {
        return this.GetMaxNodeByRecursionHelper(current.right);
      }
    }

    // Get height of tree
    public GetHeight(): number {
      return this.GetHeightHelper(this.root);
    }

    private GetHeightHelper(current: Node | null): number {
      if (current === null) return -1;

      const leftSubTreeHeight = this.GetHeightHelper(current.left);
      const rightSubTreeHeight = this.GetHeightHelper(current.right);

      return 1 + Math.max(leftSubTreeHeight, rightSubTreeHeight);
    }

    // DFS
    // Pre-order traverse
    public PrintPreOrder(): void {
      this.PreOrderHelper(this.root);
    }

    private PreOrderHelper(current: Node | null) {
      if (current !== null) {
        // Base case
        console.log(current.key);
        this.PreOrderHelper(current.left);
        this.PreOrderHelper(current.right);
      }
    }

    // In-order traverse or sorted data
    public PrintInOrder(): void {
      this.InOrderHelper(this.root);
    }

    private InOrderHelper(current: Node | null) {
      if (current !== null) {
        // Base case
        this.InOrderHelper(current.left);
        console.log(current.key);
        this.InOrderHelper(current.right);
      }
    }

    // Post-order traverse
    public PrintPostOrder(): void {
      this.PostOrderHelper(this.root);
    }

    private PostOrderHelper(current: Node | null) {
      if (current !== null) {
        // Base case
        this.PostOrderHelper(current.left);
        this.PostOrderHelper(current.right);
        console.log(current.key);
      }
    }

    // BFS
    // level-order traverse
    public PrintLevelOrder(): void {
      const queue: Node[] = [];

      queue.unshift(this.root);

      while (queue.length > 0) {
        const item = queue.pop();
        console.log(item.key);

        if (item.left !== null) queue.unshift(item.left);
        if (item.right !== null) queue.unshift(item.right);
      }
    }

    // Delete Node from tree
    public Delete(key: number): void {
      this.root === this.DeleteHelper(this.root, key);
    }

    private DeleteHelper(current: Node | null, key: number): Node | null {
      if (current === null) return null;
      else if (key < current.key)
        current.left = this.DeleteHelper(current.left, key);
      else if (key > current.key)
        current.right = this.DeleteHelper(current.right, key);
      else {
        if (current.left === null) {
          this.size--;
          return current.right;
        } else if (current.right === null) {
          this.size--;
          return current.left;
        } else {
          const maxNodeInLeftSubTree = this.GetMaxNodeByRecursionHelper(
            current.left
          );

          if (maxNodeInLeftSubTree !== null) {
            current.key = maxNodeInLeftSubTree.key;

            current.left = this.DeleteHelper(
              current.left,
              maxNodeInLeftSubTree.key
            );
          }
        }
      }

      return current;
    }
  }
}

(() => {
  // initialize BST
  const tree = new BinarySearchTree.BST();

  /* 
          10        
      5        15   
    4   9    11   20
*/

  tree.Add(10);
  tree.Add(5);
  tree.Add(4);
  tree.Add(9);
  tree.Add(15);
  tree.Add(11);
  tree.Add(20);

  console.log(tree.size); // 7
  console.log("-----------------------------------------");

  // Get Node with min and max key
  console.log(tree.GetMinNode()); // { key: 4, left: null, right: null }
  console.log(tree.GetMaxNode()); // { key: 20, left: null, right: null }

  console.log(tree.GetMinNodeByRecursion()); // { key: 4, left: null, right: null }
  console.log(tree.GetMaxNodeByRecursion()); // { key: 20, left: null, right: null }
  console.log("-----------------------------------------");

  // Get height of the tree
  console.log(tree.GetHeight()); // 2
  console.log("-----------------------------------------");

  // DFS
  // Print elements by Pre-order traverse
  tree.PrintPreOrder(); // 10 5 4 9 15 11 20
  console.log("-----------------------------------------");

  // Print elements by In-order traverse or sorted data
  tree.PrintInOrder(); // 4 5 9 10 11 15 20
  console.log("-----------------------------------------");

  // Print elements by Post-order traverse
  tree.PrintPostOrder(); // 4 9 5 11 20 15 10
  console.log("-----------------------------------------");

  // Print elements by level-order traverse
  tree.PrintLevelOrder(); // 10 5 15 4 9 11 20
  console.log("-----------------------------------------");

  // Delete from tree by key
  tree.Delete(9);
  tree.Delete(10);
  tree.Delete(11);

  console.log(tree.size); // 4
  console.log("-----------------------------------------");

  // Print elements by In-order traverse or sorted data
  tree.PrintInOrder(); // 4 5 15 20
  console.log("-----------------------------------------");
})();
