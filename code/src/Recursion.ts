// Implement Some Algorithms which Use Recursion By Typescript

// Recursion mean a function call itself one or more times

export class Recursion {
  // calc factorial for number O(n)
  public static CalcFactorial(number: number): number {
    if (number === 1) { // Base Case
      return 1;
    } else { // Recursive Case
      return number * this.CalcFactorial(number - 1);
    }
  }

  // fibonacci like 0 1 1 2 3 5 8 13 ... Be a Ware When Using Recursion O(2^n)
  public static CalcFibonacci(index: number): number {
    if (index <= 2) { // Base Case
      return 1;
    } else { // Recursive Case
      return this.CalcFibonacci(index - 1) + this.CalcFibonacci(index - 2);
    }
  }

  // we can avoid fibonacci recursion bad algorithm using loop O(n)
  public static CalcFibonacciInLinear(index: number): number {
    let n1 = 0;
    let n2 = 1;
    let n3 = -1;

    for (let i = 2; i <= index; i++) {
      n3 = n1 + n2;
      n1 = n2;
      n2 = n3;
    }

    return n3;
  }
}

// test factorial
console.log(Recursion.CalcFactorial(3)); // 6
console.log(Recursion.CalcFactorial(5)); // 120

// test fibonacci
console.log(Recursion.CalcFibonacci(20)); // 6765
console.log(Recursion.CalcFibonacci(45)); // 1134903170

// test fibonacci in linear
console.log(Recursion.CalcFibonacciInLinear(20)); // 6765
console.log(Recursion.CalcFibonacciInLinear(45)); // 1134903170