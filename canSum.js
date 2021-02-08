// 3. canSum memoization

// QUESTION
// Write a function `canSum(targetSum, numbers)` that takes in a
// targetSum and an array of numbers as arguments.

// The function should return a boolean indicating whether of not it
// is possible to generate the targetSum using numbers from the array.

// You may use an element of the array as many times as needed.

// You may assume that all input numbers are nonnegative.

// canSum(7, [5, 3, 4, 7]) -> true
// true > since (3 + 4) = 7 also 7 itself is equal to 7
// canSum(7, [2, 4]) -> false
// false > since (2 + 4) != 7 nor are 2 and 4 equal to 7

// Let's start to think of a recursive structure for the first example, canSum(7, [5, 3, 4, 7])
// my personal attempt... -----------------------------------------
//                  7[5,3,4,7] return true
//             5[3,4,7]  3[5,4,7]  4[5,3,7]  7[5,3,4]
//            0   0  0  3 4 true     true
//                      0 0
// if targetSum - array[value] = 0 -> return true;
// if targetSum - array[value] = another array[value] return true;
// my personal attempt ends here... (clueless still :s) ------------

//                        7
//      2(-5)F    3(-4)        4(-3)       0(-7)T      subtract each array value from the target sum
//                0(-3)T  1(-3)F   0(-4)T

// flip side: canSum(7, [2,4]) -> false
//            7
//     5(-2)      3(-4)
//  3(-2) 1(-4)F   1(-2)F
//  1(-2)F
// all false since they can not equal 0

const canSum = (targetSum, numbers) => {
  if (targetSum === 0) return true;
  if (newTargetSum < 0) return;

  for (let num of numbers) {
    const newTargetSum = targetSum - num;
    if (canSum(newTargetSum, numbers) === true) return true;
  }
  return false;
};

console.log(canSum(7, [2, 3]));       // true
console.log(canSum(7, [5, 3, 4, 7])); // true
console.log(canSum(7, [2, 4]));       // false
console.log(canSum(8, [2, 3, 5]));       // true
console.log(canSum(300, [7, 14]));       // false

// Let's determine the Time Complexity for the above function. Let 
// m = target sum and n = array length. We should first start by analyzing
// the height of the recursion tree. In the case of canSum(8, [2,3,5]), the
// height of the tree would be 5. In the worst case, lets say we have a value
// of 1 in the array. We would then have to -1 each time from the target sum.
// This means that the height of the tree would be m. Now, let's identify the
// branching factor, that is how does the number of nodes change from one level
// to the next. The branching factor in the case of canSum(8, [2,3,5]), is 
// exactly 3 or in general, n, because n is the length of the array. So a target
// sum would have children equal to the length of the array since we subract
// the targetSum by each number in the array. Therefore, the Time Complexity
// would be O(n^m), which is the same as saying we take n and mulitple it by
// itself m times. The Space Complexity for this would be the height, O(m).

// Let's memoize our function
const betterCanSum = (targetSum, numbers, memo={}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;

  for (let num of numbers) {
    const newTargetSum = targetSum - num;
    if (betterCanSum(newTargetSum, numbers, memo) === true) {
      memo[targetSum] = true;
      return true;
    }
  }
  memo[targetSum] = false;
  return false;
}
console.log(betterCanSum(7, [2, 3]));       // true
console.log(betterCanSum(7, [5, 3, 4, 7])); // true
console.log(betterCanSum(7, [2, 4]));       // false
console.log(betterCanSum(8, [2, 3, 5]));       // true
console.log(betterCanSum(300, [7, 14]));       // false

// let m = target sum and n = array length, 
// brute force -> TC = O(n^m), SC = O(m)
// memoized    -> TC = O(m*n), SC = O(m)