// 4. howSum memoization

// QUESTION
// Write a function `howSum(targetSum, numbers)` that takes in a 
// targetSum and an array of numbers as arguments.

// The function should return an array containing any combination of 
// elements that add up to exactly the targetSum. If there is no 
// combination that adds up to the targetSum, then return null.

// If there are multiple combinations possible, you may return any 
// single one.

// howSum(7, [5, 3, 4, 7]) -> [3, 4] or [7]
// howSum(8, [2, 3, 5]) -> [2, 2, 2, 2] or [3, 5]
// howSum(7, [2, 4]) -> null
// howSum(0, [1, 2, 3]) -> []

//                        7[4,3], [7]
//      2(-5)null  3(-4)[3]      4(-3)[4]     0(-7)[]      subtract each array value from the target sum
//                0(-3)[]  1(-3)null  0(-4)[]      
// we bubble up from empty array and add the value we subtracted the
// newTargetSum by to the empty array, as we bubble up, we merge the
// the arrays together. In the case above, we get a final array of [4,3].
// Another valid combination would be [7], which would bubble up from
// the last branch in the case above. In conclusion, we check if at 
// least one of the branches returns an array, we can return the value
// without having to continue searching for more combinations

const howSum = (targetSum, numbers) => {
  if (targetSum == 0) return [];
  if (targetSum < 0) return null;

  for (let num of numbers) {
    let remainder = targetSum - num;
    const remainderResult = howSum(remainder, numbers);
    if (remainderResult !== null) {
      return [...remainderResult, num];
    }
  }

  return null;
}

console.log(howSum(7, [2, 3]))        // [3, 2, 2]
console.log(howSum(7, [5, 3, 4, 7]))  // [4, 3]
console.log(howSum(7, [2, 4]))        // null
console.log(howSum(8, [2, 3, 5]))     // [2, 2, 2, 2]
console.log(howSum(300, [7, 14]))     // null

// Brute Force
// The Time Complexity of the above function is O((n^m) * m), 
// where m = target sum and n = numbers.length. The * m is 
// due to the return [...remainderResult, num] as this runs
// in linear time, dependent upon the target sum value in 
// the worst-case, where we subtract the target sum by 1,
// each time. The Space Complexity would be O(m).

const betterHowSum = (targetSum, numbers, memo={}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let num of numbers) {
    const remainder = targetSum - num;
    const remainderResult = betterHowSum(remainder, numbers, memo);
    if (remainderResult !== null) {
      memo[targetSum] = [...remainderResult, num];
      return memo[targetSum];
    }
  }

  memo[targetSum] = null;
  return null;
}

console.log(betterHowSum(7, [2, 3]))        // [3, 2, 2]
console.log(betterHowSum(7, [5, 3, 4, 7]))  // [4, 3]
console.log(betterHowSum(7, [2, 4]))        // null
console.log(betterHowSum(8, [2, 3, 5]))     // [2, 2, 2, 2]
console.log(betterHowSum(300, [7, 14]))     // null

// Memoized, where m = targetSum and n = array length
// TC = O(n*m^2)
// SC = O(m^2) <- increased due to memoizing but worth the trade-off to improve TC