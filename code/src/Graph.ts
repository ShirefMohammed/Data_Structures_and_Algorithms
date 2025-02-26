// Implement Graph Adjacency Matrix and Adjacency List

namespace Graph {
  /**
   * Adjacency Matrix
   * Efficient to Check if an Edge Exist, Adding and Removing Vertices
   * Best Choose For Dense Graphs
   * Require Big Space
   */
  export class AdjacencyMatrix {
    public matrix: number[][];
    private capacity: number;

    public constructor(capacity: number) {
      this.capacity = capacity;
      this.matrix = new Array(capacity);
      for (let i = 0; i < capacity; i++) {
        this.matrix[i] = new Array(capacity).fill(0);
      }
    }

    public AddEdge(vertex1: number, vertex2: number): void {
      if (
        vertex1 >= 0 && vertex1 < this.capacity
        && vertex2 >= 0 && vertex2 < this.capacity
      ) {
        this.matrix[vertex1][vertex2] = 1;
        this.matrix[vertex2][vertex1] = 1;
      }
    }

    public RemoveEdge(vertex1: number, vertex2: number): void {
      if (
        vertex1 >= 0 && vertex1 < this.capacity
        && vertex2 >= 0 && vertex2 < this.capacity
      ) {
        this.matrix[vertex1][vertex2] = 0;
        this.matrix[vertex2][vertex1] = 0;
      }
    }
  }

  /**
   * Adjacency List
   * Save Space
   * Best Choose For Sparse Graphs
   */
  export class AdjacencyList {
    public map;

    public constructor() {
      this.map = new Map();
    }

    public AddVertex(vertex: number): void {
      if (!this.map.has(vertex)) {
        this.map.set(vertex, new Array());
      }
    }

    public RemoveVertex(vertex: number): void {
      if (this.map.has(vertex)) {
        this.map.delete(vertex);
        for (let arr of this.map.values()) {
          arr = arr.filter((v: number) => v != vertex);
        }
      }
    }

    public AddEdge(vertex1: number, vertex2: number) {
      if (this.map.has(vertex1) && this.map.has(vertex2)) {
        this.map.set(vertex1, [...this.map.get(vertex1), vertex2]);
        this.map.set(vertex2, [...this.map.get(vertex2), vertex1]);
      }
    }

    public RemoveEdge(vertex1: number, vertex2: number) {
      if (this.map.has(vertex1) && this.map.has(vertex2)) {
        this.map.set(
          vertex1,
          this.map.get(vertex1).filter((v: number) => v != vertex2)
        );
        this.map.set(
          vertex2,
          this.map.get(vertex2).filter((v: number) => v != vertex1)
        );
      }
    }
  }
}

console.log("============ Adjacency Matrix Test ============");

// Undirected Graph Will Make Symmetric Matrix about Diagonal
const adjacencyMatrix = new Graph.AdjacencyMatrix(5);

adjacencyMatrix.AddEdge(0, 1);
adjacencyMatrix.AddEdge(0, 2);
adjacencyMatrix.AddEdge(1, 3);
adjacencyMatrix.AddEdge(2, 3);
adjacencyMatrix.AddEdge(2, 4);

console.log("Matrix =", adjacencyMatrix.matrix);

adjacencyMatrix.RemoveEdge(0, 1);
adjacencyMatrix.RemoveEdge(0, 2);
adjacencyMatrix.RemoveEdge(1, 3);
adjacencyMatrix.RemoveEdge(2, 3);
adjacencyMatrix.RemoveEdge(2, 4);

console.log("Matrix =", adjacencyMatrix.matrix);

console.log("============ Adjacency List Test ============");

const adjacencyList = new Graph.AdjacencyList();

adjacencyList.AddVertex(1);
adjacencyList.AddVertex(2);
adjacencyList.AddVertex(3);
adjacencyList.AddVertex(4);
adjacencyList.AddVertex(5);

console.log(adjacencyList.map);

adjacencyList.AddEdge(1, 2);
adjacencyList.AddEdge(1, 3);
adjacencyList.AddEdge(2, 4);
adjacencyList.AddEdge(3, 4);
adjacencyList.AddEdge(3, 5);

console.log(adjacencyList.map);

adjacencyList.RemoveEdge(1, 2);
adjacencyList.RemoveEdge(1, 3);
adjacencyList.RemoveEdge(2, 4);
adjacencyList.RemoveEdge(3, 4);
adjacencyList.RemoveEdge(3, 5);

console.log(adjacencyList.map);

adjacencyList.RemoveVertex(1);
adjacencyList.RemoveVertex(2);
adjacencyList.RemoveVertex(3);
adjacencyList.RemoveVertex(4);
adjacencyList.RemoveVertex(5);

console.log(adjacencyList.map);