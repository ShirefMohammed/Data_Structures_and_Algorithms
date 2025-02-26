// Implement HashTable Chaining and Linear Probing

namespace HashTable {
  export class HashNode<T> {
    public id: number;
    public data: T;
    public next: HashNode<T> | null;

    public constructor(id: number, data: T) {
      this.id = id;
      this.data = data;
      this.next = null;
    }
  }

  export class User {
    public name: string;
    public age: number;

    public constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }

  // Collision resolution by chaining
  export class HashTable1<T> {
    private capacity: number;
    private buckets: HashNode<T>[];

    public constructor(capacity: number) {
      this.capacity = capacity;
      this.buckets = new Array(capacity).fill(null);
    }

    private GetHash(id: number): number {
      return id % this.capacity;
    }

    public Add(id: number, data: T): boolean {
      const position = this.GetHash(id);
      const newHashNode = new HashTable.HashNode(id, data);

      if (this.buckets[position] === null) {
        this.buckets[position] = newHashNode;
        return true;
      } else {
        let current = this.buckets[position];

        while (current.next !== null) {
          if (current.id === newHashNode.id) {
            console.log("Node Already Exists");
            return false;
          }
          current = current.next;
        }

        current.next = newHashNode;
        return true;
      }
    }

    public Remove(id: number): boolean {
      const position = this.GetHash(id);

      if (this.buckets[position] !== null) {
        let previous: HashNode<T> | null = null;
        let current = this.buckets[position];

        while (current !== null) {
          if (current.id === id) {
            if (previous === null) {
              this.buckets[position] = current.next;
            } else {
              previous.next = current.next;
            }
            return true;
          }
          previous = current;
          current = current.next;
        }
      }

      console.log("Node Not Found");
      return false;
    }

    public IsExist(id: number): boolean {
      const position = this.GetHash(id);

      let current = this.buckets[position];
      while (current !== null) {
        if (current.id === id) return true;
        current = current.next;
      }

      return false;
    }

    public Get(id: number): HashNode<T> | null {
      const position = this.GetHash(id);

      let current = this.buckets[position];
      while (current !== null) {
        if (current.id === id) return current;
        current = current.next;
      }

      return null;
    }

    public Print(): void {
      let output = "";

      for (let i = 0; i < this.capacity; i++) {
        if (this.buckets[i] === null) {
          output += `null`;
        } else {
          let current = this.buckets[i];
          while (current !== null) {
            output += `${current.id} --> `;
            current = current.next;
          }
          output += `null`;
        }
        output += "\n";
      }

      console.log(output);
    }
  }

  // Open Addressing Linear Probing
  export class HashTable2<T> {
    private capacity: number;
    private buckets: HashNode<T>[];

    public constructor(capacity: number) {
      this.capacity = capacity;
      this.buckets = new Array(capacity).fill(null);
    }

    private GetHash(id: number): number {
      return id % this.capacity;
    }

    public Add(id: number, data: T): boolean {
      const position = this.GetHash(id);
      const newHashNode = new HashTable.HashNode(id, data);

      if (this.buckets[position] === null) {
        this.buckets[position] = newHashNode;
        return true;
      } else {
        let nextPosition = this.GetHash(position + 1);

        while (
          nextPosition !== position
          && this.buckets[nextPosition] !== null
        ) {
          nextPosition = this.GetHash(nextPosition + 1);
        }

        if (this.buckets[nextPosition] === null) {
          this.buckets[nextPosition] = newHashNode;
          return true;
        } else {
          console.log("HashTable is Full");
          return false;
        }
      }
    }

    public Remove(id: number): boolean {
      const position = this.GetHash(id);

      if (
        this.buckets[position] !== null
        && this.buckets[position].id === id
      ) {
        this.buckets[position] = null;
        return true;
      }

      let nexPosition = this.GetHash(position + 1);

      while (
        nexPosition !== position
        && (
          this.buckets[nexPosition] === null
          || this.buckets[nexPosition].id !== id
        )
      ) {
        nexPosition = this.GetHash(nexPosition + 1);
      }

      if (
        this.buckets[nexPosition] !== null
        && this.buckets[nexPosition].id === id
      ) {
        this.buckets[nexPosition] = null;
        return true;
      } else {
        console.log("Node Not Found");
        return false;
      }
    }

    public IsExist(id: number): boolean {
      const position = this.GetHash(id);

      if (
        this.buckets[position] !== null
        && this.buckets[position].id === id
      ) {
        return true;
      }

      let nexPosition = this.GetHash(position + 1);

      while (
        nexPosition !== position
        && (
          this.buckets[nexPosition] === null
          || this.buckets[nexPosition].id !== id
        )
      ) {
        nexPosition = this.GetHash(nexPosition + 1);
      }

      if (
        this.buckets[nexPosition] !== null
        && this.buckets[nexPosition].id === id
      ) {
        return true;
      } else {
        return false;
      }
    }

    public Get(id: number): HashNode<T> | null {
      const position = this.GetHash(id);

      if (
        this.buckets[position] !== null
        && this.buckets[position].id === id
        ) {
        return this.buckets[position];
      }

      let nexPosition = this.GetHash(position + 1);

      while (
        nexPosition !== position
        && (
          this.buckets[nexPosition] === null
          || this.buckets[nexPosition].id !== id
        )
      ) {
        nexPosition = this.GetHash(nexPosition + 1);
      }

      if (
        this.buckets[nexPosition] !== null
        && this.buckets[nexPosition].id === id
      ) {
        return this.buckets[nexPosition];
      } else {
        return null;
      }
    }

    public Print(): void {
      for (let i = 0; i < this.capacity; i++) {
        if (this.buckets[i] !== null) {
          console.log(this.buckets[i].id);
        } else {
          console.log(null);
        }
      }
    }
  }
}

/**
 * HashTable Time Complexity
 * average case add, delete and access O(1)
 * worth case add, delete and access O(n)
 *
 * HashTable Space Complexity O(n)
 */

console.log("============ HashTable 1 Test ============");

const hashTable1 = new HashTable.HashTable1<HashTable.User>(10);

// Same Row 0
hashTable1.Add(0, new HashTable.User("name(0)", 20));
hashTable1.Add(100, new HashTable.User("name(100)", 20));
hashTable1.Add(100_000, new HashTable.User("name(100_1000)", 20));
// Same Row 5
hashTable1.Add(5, new HashTable.User("name(5)", 20));
hashTable1.Add(15, new HashTable.User("name(15)", 20));
hashTable1.Add(555_555, new HashTable.User("name(555_555)", 20));
// Same Row 7
hashTable1.Add(7, new HashTable.User("name(7)", 20));
hashTable1.Add(47, new HashTable.User("name(49)", 20));

hashTable1.Print();

console.log("--------------------------------------------");

console.log(hashTable1.IsExist(0)); // true
console.log(hashTable1.IsExist(100)); // true
console.log(hashTable1.IsExist(1000)); // false

console.log("--------------------------------------------");

console.log(hashTable1.Get(0)); // Exist
console.log(hashTable1.Get(100)); // Exist
console.log(hashTable1.Get(100_000)); // Exist
console.log(hashTable1.Get(1)); // Not Exist

console.log("--------------------------------------------");

console.log(hashTable1.Remove(0)); // true
console.log(hashTable1.Remove(100)); // true
console.log(hashTable1.Remove(1000)); // false
console.log(hashTable1.Remove(100_000)); // true

console.log("--------------------------------------------");

hashTable1.Print();

console.log("============ HashTable 2 Test ============");

const hashTable2 = new HashTable.HashTable2<HashTable.User>(10);

hashTable2.Add(0, new HashTable.User("name(0)", 20));
hashTable2.Add(100, new HashTable.User("name(100)", 20));
hashTable2.Add(100_000, new HashTable.User("name(100_1000)", 20));

hashTable2.Add(5, new HashTable.User("name(5)", 20));
hashTable2.Add(15, new HashTable.User("name(15)", 20));
hashTable2.Add(555_555, new HashTable.User("name(555_555)", 20));

hashTable2.Add(7, new HashTable.User("name(7)", 20));
hashTable2.Add(47, new HashTable.User("name(49)", 20));

hashTable2.Print();

console.log("--------------------------------------------");

console.log(hashTable2.IsExist(0)); // true
console.log(hashTable2.IsExist(100)); // true
console.log(hashTable2.IsExist(1000)); // false

console.log("--------------------------------------------");

console.log(hashTable2.Get(0)); // Exist
console.log(hashTable2.Get(100)); // Exist
console.log(hashTable2.Get(100_000)); // Exist
console.log(hashTable2.Get(1)); // Not Exist

console.log("--------------------------------------------");

console.log(hashTable2.Remove(0)); // true
console.log(hashTable2.Remove(100)); // true
console.log(hashTable2.Remove(1000)); // false
console.log(hashTable2.Remove(100_000)); // true

console.log("--------------------------------------------");

hashTable2.Print();