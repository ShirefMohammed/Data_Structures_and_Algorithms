class CalculatorByStack {
  private static availableSymbols = ["+", "-", "/", "*", "%", "^", "(", ")"];

  // Check if the math expression is correct
  public static checkIsCorrectExpression(expression: string): boolean {
    if (
      (!this.isDigit(expression[0]) && expression[0] !== "(") ||
      (!this.isDigit(expression[expression.length - 1]) &&
        expression[expression.length - 1] !== ")")
    ) {
      return false;
    }

    const stack: string[] = [];

    for (let i = 0; i < expression.length; i++) {
      if (
        !this.isDigit(expression[i]) &&
        !CalculatorByStack.availableSymbols.includes(expression[i]) &&
        expression[i] !== " "
      ) {
        return false;
      } else if (expression[i] === "(") {
        stack.push(expression[i]);
      } else if (expression[i] === ")") {
        if (
          stack.length > 0 &&
          this.isOppositeParentheses(stack[stack.length - 1], expression[i])
        ) {
          stack.pop();
        } else {
          return false;
        }
      }
    }

    return stack.length === 0;
  }

  private static isDigit(char: string): boolean {
    return /\d/.test(char);
  }

  private static isOppositeParentheses(first: string, second: string): boolean {
    return first === "(" && second === ")";
  }

  // Convert from infix math expression to postfix
  public static convertFromInfixToPostfix(expression: string): string {
    let output = "";
    const stack: string[] = [];

    for (let i = 0; i < expression.length; i++) {
      if (expression[i] === " ") {
        continue;
      }

      if (this.isDigit(expression[i])) {
        let number = "";
        let position = i;

        while (
          position < expression.length &&
          this.isDigit(expression[position])
        ) {
          number += expression[position];
          position++;
        }

        output += number + " ";
        i = position - 1;
      } else if (expression[i] === "(") {
        stack.push(expression[i]);
      } else if (expression[i] === ")") {
        while (stack[stack.length - 1] !== "(") {
          output += stack.pop() + " ";
        }
        stack.pop(); // remove '(' from stack
      } else {
        while (
          stack.length > 0 &&
          this.operatorLevel(expression[i]) <=
            this.operatorLevel(stack[stack.length - 1])
        ) {
          output += stack.pop() + " ";
        }
        stack.push(expression[i]);
      }
    }

    while (stack.length > 0) {
      output += stack.pop() + " ";
    }

    return output.trim();
  }

  private static operatorLevel(operator: string): number {
    switch (operator) {
      case "+":
      case "-":
        return 1;
      case "*":
      case "/":
      case "%":
        return 2;
      case "^":
        return 3;
      default:
        return -1;
    }
  }

  // Calculate the final result of the postfix math expression
  public static calcPostfixExpression(postfixExpression: string): number {
    const arr = postfixExpression.split(" ").filter((val) => val.length > 0);
    const stack: number[] = [];

    for (const token of arr) {
      if (!isNaN(Number(token))) {
        stack.push(Number(token));
      } else {
        const operand2 = stack.pop()!;
        const operand1 = stack.pop()!;
        const result = this.calcMathOperation(operand1, operand2, token);
        stack.push(result);
      }
    }

    return stack.pop()!;
  }

  private static calcMathOperation(
    operand1: number,
    operand2: number,
    operator: string
  ): number {
    switch (operator) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        return operand1 / operand2;
      case "%":
        return operand1 % operand2;
      case "^":
        return Math.pow(operand1, operand2);
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  }
}

// Tests
const runTests = () => {
  // Check expression validity
  console.log(CalculatorByStack.checkIsCorrectExpression("3 + (5 - 2)")); // true
  console.log(CalculatorByStack.checkIsCorrectExpression("3 + )5 - 2(")); // false

  // Infix to postfix conversion
  console.log(CalculatorByStack.convertFromInfixToPostfix("3 + 5 * 2")); // "3 5 2 * +"
  console.log(CalculatorByStack.convertFromInfixToPostfix("10 + 2 * 6")); // "10 2 6 * +"
  console.log(
    CalculatorByStack.convertFromInfixToPostfix("100 * ( 2 + 12 ) / 14")
  ); // "100 2 12 + * 14 /"

  // Postfix expression calculation
  console.log(CalculatorByStack.calcPostfixExpression("3 5 2 * +")); // 13
  console.log(CalculatorByStack.calcPostfixExpression("10 2 6 * +")); // 22
  console.log(CalculatorByStack.calcPostfixExpression("100 2 12 + * 14 /")); // 100
};

// Run tests
runTests();
