// 5. howSum memoization

// QUESTION
// Write a function `bestSum(targetSum, numbers)` that takes in a 
// targetSum and an array of numbers as arguments.

// The function should return an array containing the shortest
// combination of numbers that add up to exactly the targetSum

// If there is a tie for the shortest combination, you may return any
// one of the shortest.

// bestSum(7, [5, 3, 4, 7]) -> [3, 4] or [7] => [7] is the shortest so accepted answer
// bestSum(8, [2, 3, 5]) -> [3, 5] o [2, 3, 3] or [2, 2, 2, 2] => [3, 5] is the shortest array

// We want to check the shortest array for each branch, and bubble the
// shortest array up to the higher node. We add the value that we used
// to subtract that specific targetSum. Then we compare each branch of 
// the higher value untill we get a final array which is the shortest.


const bestSum = (targetSum, numbers) => {
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  let shortestCombination = null;

  for (let num of numbers) {
    let remainder = targetSum - num;
    const remainderCombination = bestSum(remainder, numbers);
    if (remainderCombination !== null) {
      const combination = [...remainderCombination, num];
      // if the combination is shorter than the current "shortest", update it
      if (shortestCombination === null || combination.length < shortestCombination.length) {
        shortestCombination = combination;
      }
    }
  }

  return shortestCombination;
}

console.log(bestSum(7, [5, 3, 4, 7]));    // [7]
console.log(bestSum(8, [2, 3, 5]));       // [3, 5]
console.log(bestSum(8, [1, 4, 5]));       // [4, 4]
console.log(bestSum(100, [1, 2, 5, 25])); // [25, 25, 25, 25]

// m = target sum
// n = numbers length

// Brute Force 
// TC = O((n^m) * m)
// SC = O(m^2)


const betterBestSum = (targetSum, numbers, memo={}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  let shortestLength = null;

  for (let num of numbers) {
    const remainder = targetSum - num;
    const remainderCombination = betterBestSum(remainder, numbers, memo);
    if (remainderCombination !== null) {
      const combination = [...remainderCombination, num];
      if (shortestLength === null || combination.length < shortestLength.length) {
        shortestLength = combination;
      }
    } 
  }

  memo[targetSum] = shortestLength;
  return memo[targetSum];
}

console.log(betterBestSum(7, [5, 3, 4, 7]));    // [7]
console.log(betterBestSum(8, [2, 3, 5]));       // [3, 5]
console.log(betterBestSum(8, [1, 4, 5]));       // [4, 4]
console.log(betterBestSum(100, [1, 2, 5, 25])); // [25, 25, 25, 25]

// m = target sum
// n = numbers length
  
// Memoized 
// TC = O((m^2) * n)
// SC = O(m^2) <- increased due to memoizing but worth the trade-off to improve TC

// Summary
// canSum   -> "Can you do it? yes/no"            (Decision Problem)
// howSum   -> "How will you do it?"              (Combinatoric Problem)
// bestSum  -> "What is the 'best' way to do it?" (Optimization Problem)