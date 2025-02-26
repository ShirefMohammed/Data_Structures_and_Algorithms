/* Array in JS/TS */

/* Arrays with predefined types */
(() => {
  console.log("** Arrays with predefined types **");

  const numbersArr: Number[] = [1, 2, 3, 4, 5];
  const stringsArr: String[] = ["Mohammed", "Ahmed"];
  const booleanArr: Boolean[] = [true, false];

  console.log("Array of numbers:", numbersArr);
  console.log("Array of strings:", stringsArr);
  console.log("Array of booleans:", booleanArr);
})();

/* Array with user defined type */
(() => {
  console.log("** Array with user defined type **");

  type User = { _id: number; name: string };

  const usersArr: User[] = [
    { _id: 1, name: "Mohammed" },
    { _id: 2, name: "Ahmed" },
    { _id: 3, name: "Ali" },
  ];

  console.log("Array of users:", usersArr);
})();

/* Some JS/TS Array Methods */
(() => {
  console.log("** Some JS/TS Array Methods **");

  const arr: (number | string | boolean)[] = [1, 2, 3, 4, 5];

  console.log("arr:", arr);
  console.log("arr[0]:", arr[0]);

  console.log("arr.includes(1):", arr.includes(1)); // true
  console.log("arr.indexOf(1):", arr.indexOf(1)); // 0
  console.log("arr.lastIndexOf(1):", arr.lastIndexOf(1)); // 0

  console.log(
    "concatenation result:",
    [].concat([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])
  );
  console.log("concatenation result:", [
    ...[1, 2, 3, 4, 5],
    ...[6, 7, 8, 9, 10],
  ]);

  console.log("sort result:", [5, 4, 3, 2, 1].sort());
  console.log("sort then reverse result:", [5, 4, 3, 2, 1].sort().reverse());

  arr.unshift("unshift");
  arr.push("push");
  console.log("result after unshift and push:", arr);

  console.log("shift result:", arr.shift()); // unshift
  console.log("pop result:", arr.pop()); // push
  console.log("result after shift and pop:", arr);

  console.log("Max number:", Math.max(...[1, 2, 3, 4, 5]));
  console.log("Min number:", Math.min(...[1, 2, 3, 4, 5]));

  let mix: any[] = [1, 2, 3, "W", 4, "e", "l", "c", "o", "m", 5, "e"];

  console.log(
    "Higher order functions EX1:",
    mix
      // .map((item) => (isNaN(parseInt(item)) ? item : ""))
      .filter((item) => isNaN(parseInt(item)))
      .reduce((acc, value) => `${acc}${value}`)
  ); // Welcome

  let numbersAndStrings: any[] = [1, 10, -10, -20, 5, "A", 3, "B", "C"];

  console.log(
    "Higher order functions EX2:",
    numbersAndStrings
      .filter((item) => typeof item === "number")
      .map((item) => -item)
  ); // [ -1, -10, 10, 20, -5, -3 ]
})();
