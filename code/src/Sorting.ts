// Implement Some Sorting Techniques Typescript

export class Sorting {
  /**
   * Selection Sort
   * time complexity O(n^2), space complexity O(1)
   */
  public static SelectionSort(arr: number[]): void {
    for (let i = arr.length - 1; i >= 0; i--) {
      // get max item index in unsorted section of arr
      const max: number = this.GetIndexOfMax(arr, 0, i);
      // swap max item with current item
      this.Swap(arr, max, i);
    }
  }

  /**
   * Bubble Sort
   * time complexity O(n^2), space complexity O(1)
   */
  public static BubbleSort(arr: number[]): void {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j + 1]) {
          this.Swap(arr, j, j + 1);
        }
      }
    }
  }

  /**
   * Insertion Sort
   * time complexity O(n^2), space complexity O(1)
   */
  public static InsertionSort(arr: number[]): void {
    for (let i = 1; i < arr.length; i++) {
      let temp = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > temp) {
        arr[j + 1] = arr[j];
        j--;
      }

      arr[j + 1] = temp;
    }
  }

  /**
   * Merge Sort
   * time complexity O(n*log(n)), space complexity O(n)
   */
  public static MergeSort(arr: number[]): void {
    this.MergeSortHelper1(arr, 0, arr.length - 1);
  }

  private static MergeSortHelper1(
    arr: number[],
    left: number,
    right: number
  ): void {
    if (left < right) {
      // Base Case
      const middle = left + Math.floor((right - left) / 2);

      this.MergeSortHelper1(arr, left, middle);
      this.MergeSortHelper1(arr, middle + 1, right);

      this.MergeSortHelper2(arr, left, middle, right);
    }
  }

  private static MergeSortHelper2(
    arr: number[],
    left: number,
    middle: number,
    right: number
  ) {
    const arr1Length = middle - left + 1;
    const arr2Length = right - middle;

    const arr1 = new Array(arr1Length);
    const arr2 = new Array(arr2Length);

    for (let i = 0; i < arr1Length; i++) {
      arr1[i] = arr[left + i];
    }

    for (let i = 0; i < arr2Length; i++) {
      arr2[i] = arr[middle + 1 + i];
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < arr1Length && j < arr2Length) {
      if (arr1[i] < arr2[j]) {
        arr[k] = arr1[i];
        i++;
      } else {
        arr[k] = arr2[j];
        j++;
      }
      k++;
    }

    while (i < arr1Length) {
      arr[k] = arr1[i];
      i++;
      k++;
    }

    while (j < arr2Length) {
      arr[k] = arr2[j];
      j++;
      k++;
    }
  }

  /**
   * Quick Sort
   * time complexity O(n*log(n)), space complexity O(1)
   */
  public static QuickSort(arr: number[]): void {
    this.QuickSortHelper(arr, 0, arr.length - 1);
  }

  private static QuickSortHelper(
    arr: number[],
    left: number,
    right: number
  ): void {
    if (left < right) {
      // Base Case
      const pivIdx = this.partition(arr, left, right);
      this.QuickSortHelper(arr, left, pivIdx - 1);
      this.QuickSortHelper(arr, pivIdx + 1, right);
    }
  }

  private static partition(arr: number[], left: number, right: number) {
    let i = left;
    let j = right;
    let pivIdx = left;

    while (true) {
      while (arr[pivIdx] <= arr[j] && pivIdx != j) {
        j--;
      }

      if (pivIdx == j) {
        break;
      } else if (arr[pivIdx] > arr[j]) {
        this.Swap(arr, pivIdx, j);
        pivIdx = j;
      }

      while (arr[pivIdx] >= arr[i] && pivIdx != i) {
        i++;
      }

      if (pivIdx == i) {
        break;
      } else if (arr[pivIdx] < arr[i]) {
        this.Swap(arr, pivIdx, i);
        pivIdx = i;
      }
    }

    return pivIdx;
  }

  /**
   * Heap Sort
   * time complexity O(n*log(n)), space complexity O(1)
   */
  public static HeapSort(arr: number[]): void {
    this.BuildHeap(arr);

    for (let i = arr.length - 1; i >= 0; i--) {
      this.Swap(arr, i, 0);
      this.HeapifyDown(arr, i, 0);
    }
  }

  private static BuildHeap(arr: number[]): void {
    for (let i = Math.floor(arr.length / 2 - 1); i >= 0; i--) {
      this.HeapifyDown(arr, arr.length, i);
    }
  }

  private static HeapifyDown(heap: number[], length: number, index: number) {
    let leftChild = 2 * index + 1;
    let rightChild = 2 * index + 2;
    let largest = index;

    if (leftChild < length && heap[leftChild] > heap[largest]) {
      largest = leftChild;
    }

    if (rightChild < length && heap[rightChild] > heap[largest]) {
      largest = rightChild;
    }

    if (largest !== index) {
      this.Swap(heap, index, largest);
      this.HeapifyDown(heap, length, largest);
    }
  }

  // Utilities
  private static GetIndexOfMax(
    arr: number[],
    firstIndex: number,
    lastIndex: number
  ): number {
    let maxValue = Number.MIN_SAFE_INTEGER;
    let index = -1;

    for (let i = firstIndex; i <= lastIndex; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
        index = i;
      }
    }

    return index;
  }

  // private static GetIndexOfMin(
  //   arr: number[],
  //   firstIndex: number,
  //   lastIndex: number
  // ): number {
  //   let minValue = Number.MAX_SAFE_INTEGER;
  //   let index = -1;

  //   for (let i = firstIndex; i <= lastIndex; i++) {
  //     if (arr[i] < minValue) {
  //       minValue = arr[i];
  //       index = i;
  //     }
  //   }

  //   return index;
  // }

  private static Swap(arr: number[], first: number, second: number) {
    let temp = arr[first];
    arr[first] = arr[second];
    arr[second] = temp;
  }
}

// ========================== Tests ==========================

// Selection Sort
console.log("================ test 1 ===================");
const startTime1 = Number(new Date());
const testArr1 = [5, 4, 1, 2, 3, 4, 9, 8, 6, 6, 7];
Sorting.SelectionSort(testArr1);
console.log("output =", testArr1); // [1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9]
console.log("Operation Time =", Number(new Date()) - startTime1);

// Bubble Sort
console.log("================ test 2 ===================");
const startTime2 = Number(new Date());
const testArr2 = [5, 4, 1, 2, 3, 4, 9, 8, 6, 6, 7];
Sorting.BubbleSort(testArr2);
console.log("output =", testArr2); // [1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9]
console.log("Operation Time =", Number(new Date()) - startTime2);

// Insertion Sort
console.log("================ test 3 ===================");
const startTime3 = Number(new Date());
const testArr3 = [5, 4, 1, 2, 3, 4, 9, 8, 6, 6, 7];
Sorting.InsertionSort(testArr3);
console.log("output =", testArr3); // [1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9]
console.log("Operation Time =", Number(new Date()) - startTime3);

// Merge Sort
console.log("================ test 4 ===================");
const startTime4 = Number(new Date());
const testArr4 = [5, 4, 1, 2, 3, 4, 9, 8, 6, 6, 7];
Sorting.MergeSort(testArr4);
console.log("output =", testArr4); // [1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9]
console.log("Operation Time =", Number(new Date()) - startTime4);

// Merge Sort
console.log("================ test 5 ===================");
const startTime5 = Number(new Date());
const testArr5 = [5, 4, 1, 2, 3, 4, 9, 8, 6, 6, 7];
Sorting.QuickSort(testArr5);
console.log("output =", testArr5); // [1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9]
console.log("Operation Time =", Number(new Date()) - startTime5);

// Heap Sort
console.log("================ test 6 ===================");
const startTime6 = Number(new Date());
const testArr6 = [5, 4, 1, 2, 3, 4, 9, 8, 6, 6, 7];
Sorting.HeapSort(testArr6);
console.log("output =", testArr6); // [1, 2, 3, 4, 4, 5, 6, 6, 7, 8, 9]
console.log("Operation Time =", Number(new Date()) - startTime6);
