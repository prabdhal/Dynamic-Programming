// 1. Fib memoization

//  QUESTION
// write a function `fib(n)` that takes in a number as an argument.
// The function should return the n-th number of the Fibonacci sequence.

// The 1st and 2nd number of the sequence is 1.
// To genertate the next number of the sequence, we sum the previous two.

//  n:        1, 2, 3, 4, 5, 6, 7,  8,  9, ...
//  fib(n):   1, 1, 2, 3, 5, 8, 13, 21, 34, ...

// SOLUTION
// This is an inefficient way to write the function as it
// may have correctness but lacks efficieny, due to the
// Time Complexity of O(2^n). Aside: Space Complexity is O(n).
const fib = (n) => {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
};
// The reason for the inefficiency is that if you were to
// draw a tree diagram of the function, you would see that
// the function runs a lot of repetitive calculation. This
// is because as it calculates n-1 and n-2 of the inputted
// value, the branches eventually all lead to the same
// calculations. For example, if we run fib(7):
//                  7
//           6               5
//        5       4       4      3
//      4   3    3  2   3  2   2  1
//     3 2 2 1  2 1    2 1
//    2 1
// This is how we can map out the function, and here you can see,
// we have 2 branches of fib(5), 3 branches of fib(4), and 5 branches
// of fib(3)

console.log(fib(2));
console.log(fib(5));
console.log(fib(7));
// The above function takes a long time to compute fib(50)
console.log(fib(50));

// In order to make the above function more efficient, we will
// need to find a way to remove the repetive calculations,
// which we can try to handle by creating an object that stores
// the values of all the n keys. This will help with efficieny
// since the value of the nth key will be return instantly if
// we have already computed the nth key.

const betterFib = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = betterFib(n - 1, memo) + betterFib(n - 2, memo);
  return memo[n];
};

// The above function has a Time Complexity of O(n), which is
// much more efficient. The illustration for this function is
// depicted below:
//               7
//            6   5
//          5   4
//        4  3
//      3  2
//    2  1

console.log(betterFib(2));  // = 1
console.log(betterFib(5));  // = 5
console.log(betterFib(7));  // = 13
console.log(betterFib(50)); // = 12586269025