// 6. howSum memoization

// QUESTION
// Write a function `canConstruct(target, wordBank)` that accepts a
// target string and an array of strings.

// The function should return a boolean indicating whether or not the
// `target` can be constructed by concatenating elements of the 
// `wordBank` array.

// You may reuse elemnts of `wordBank` as many times as needed.

// canConstruct(abcdef, [ab, abc, cd, def, abcd]) -> true, since abc + def = abcdef
// canConstruct(skateboard, [ bo, rd, ate, t, ska, sk, boar ]) -> false
// canConstruct('', [ cat, dog, mouse ]) -> true

// plan is to remove prefix until we get '' string
//                 abcdef
//    cdef(-ab) def(-abc) ef(-abcd)F  // do not take out any characters from the middle of the string
//    ef(-cd)F    ''T