// Implement Some Searching Techniques Typescript

export class Searching {
  // linear search O(n)
  public static LinearSearch(arr: any[], target: any): number {
    for (let i = 0; i < arr.length; i++) {
      if (target == arr[i]) {
        return i;
      }
    }

    return -1;
  }

  // binary search O(log(n))
  public static BinarySearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (target === arr[mid]) {
        return mid;
      } else if (target > arr[mid]) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }

    return -1;
  }
}

// test linear search
let testArr1 = ["shiref", "mohammed", "ahmed", "ali"];
console.log(Searching.LinearSearch(testArr1, "shiref")); // 0
console.log(Searching.LinearSearch(testArr1, "ahmed")); // 2

// test binary search
let testArr2 = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
console.log(Searching.BinarySearch(testArr2, 500)); // 0
console.log(Searching.BinarySearch(testArr2, 2500)); // 4