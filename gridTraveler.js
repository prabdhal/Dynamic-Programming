// 2. Grid traveler memoization

// QUESTION
// Say that you are a traveler on a 2D grid. You begin in the
// top-left corner and your goal is to travel to the bottom-right
// corner. You may only move down or right.

// In how many ways can you travel to the goal on a grid with
// dimensions m * n?

// Write a function `gridTraveler(m, n)` that calculates this.

// gridTraveler(2,3) -> 3
// |S| | | 1. we can go 2 units to the right, then 1 unit down
// | | |E| 2. we can also go 1 unit down, then 2 units to the right
//         3. we can also go 1 unit to the right, 1 unit down and 1 unit to the right again
// where S* is the start and E* is the end
// gridTraveler(1,1) -> 1
// |S&E| 1. we are on the start and end block which means that we have 1 unique path (do nothing)
// gridTraveler(0, 1) or (1,0) -> 0   no ways to travel...
// gridTraveler(3,3) ->
// |S| | |
// | | | |
// | | |E|
// Analysis: so if we were to move down 1 unit from the S, the question basically becomes
// the same as the gridTraveler(2,3)...
// |S| | |
// |*| | |
// | | |E|
// * indicates our current position
// Now, if we move 1 unit to the right from our current position, the question becomes the
// same as the gridTraveler(2,2)...
// |S| | |
// | |*| |
// | | |E|
// Now, if we move 1 unit down from our current position, the question becomes the
// same as the gridTraveler(1,2)...
// |S| | |
// | | | |
// | |*|E|
// Finally, if we move 1 unit to the right from our current position, the question becomes the
// same as the gridTraveler(1,1)... This is a pattern to note as we increase the grid size.
// |S| | |
// | | | |
// | | |*| <-E

// Thought Process - Understanding the question
//                       (2,3) - start*
//        down(1,3)*                           right(2,2)*
// down(0,3)    right(1,2)*             down(1,2)*          right(2,1)*
//  = 0     down(0,2) right(1,1)* down(0,2) right(1,1)* down(1,1)* right(2,0)
//              = 0       = 1         = 0       = 1        = 1        = 0
// * indicates correct paths that lead to a solution
// From the tree diagram, we can see the correct paths are, DRR, RDR and RRD
// since they all lead to a final value of 1, rather than 0, which is undefined

// SOLUTION
// this is inefficient just like the above 
const gridTraveler = (m, n) => {
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;
  return gridTraveler(m - 1, n) + gridTraveler(m, n - 1);
};

console.log(gridTraveler(1, 1));    // 1
console.log(gridTraveler(2, 2));    // 2
console.log(gridTraveler(3, 2));    // 3
console.log(gridTraveler(2, 3));    // 3
// The function below takes a long time to run due to inefficency with our function again
console.log(gridTraveler(18, 18));  // 

// Similarily to the Fibanacci question, this can be attributed to the repetitive 
// calculations that occur when we run the above function. We will rework the function
// to make it more efficient: O(n+m) rather than an O(2^(n+m)) Time Complexity
// Note: Space Complexity is O(n+m), however we are worried about the Time 
// Complexity in this case. Let's analyze the tree diagram to look for optimization:
//                       (2,3) - start
//        down(1,3)                           right(2,2
// down(0,3)    right(1,2)*             down(1,2)*          right(2,1)*
//  = 0     down(0,2) right(1,1)  down(0,2) right(1,1) down(1,1) right(2,0)
//              = 0       = 1         = 0       = 1        = 1        = 0
// * Indicates similar computations which cause inefficiency in our function
// You may notice that we have 3 branches that are similar, (1,2) is the same as 
// (2,1) as the only difference is the order is reversed, which has no effect on 
// the result. Therefore, we need to find a way to store the values so that we can
// return the result instantly if we come accross a similar computation during 
// recursion. In conclusion -> gridTraveler(a,b) = gridTraveler(b,a)

const betterGridTraveler = (m,n, memo = {}) => {
  const key = m + ',' + n;
  if (key in memo) return memo[key]
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;
  memo[key] = betterGridTraveler(m - 1, n, memo) + betterGridTraveler(m, n -1, memo);
  return memo[key];
}

// So, reanalyzing the betterGridTraveler function, we have a Time Complexity of
// O(m * n), since for instance, lets say we have a (4,3) grid in a (m,n) format.
// We have m: { 0, 1, 2, 3, 4 } = 4 choices for m and n: { 0, 1, 2, 3 } = 3 choices
// for n, which gives us m * n possible combinations for a (4,3) or (3,4) grid.
// Therefore, this function improves our Time Complexity from O(2^(m+n)) to O(m*n).

console.log(betterGridTraveler(1, 1));    // 1
console.log(betterGridTraveler(2, 2));    // 2
console.log(betterGridTraveler(3, 2));    // 3
console.log(betterGridTraveler(2, 3));    // 3
console.log(betterGridTraveler(3, 3));    // 6
console.log(betterGridTraveler(18, 18));  // 2333606220

// Advice: Try to think of recursive function in a tree diagram.

// GUIDLINES ON SOLVING DYNAMIC PROGRAMMING PROBLEMS
// Memoization Recipe
// 1. Make it work. (correctness)
// -- visualize the problem as a tree
// -- implement the tree using recursion (think of leaves as a base case)
// -- test it
// 2. Make it efficient.  (efficiency)
// -- add a memo object
// -- add a base case to return memo values
// -- store return values into the memo