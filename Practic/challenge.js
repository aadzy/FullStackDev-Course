// Challenge: Write a countdown function with a hard-coded starting number inside closure
// Stretch goal: Write a countdown function that can count from a provided number,
// with a provided step

// Start
function countdown() {
  start = 10;
  while (start >= 1) {
    start--;
    console.log(start);
  }
  return start;
}

const counting = countdown();
function countingDown(s) {
  let start = s || 10; // Default to 10 if no argument is provided
  while (start >= 1) {
    start--;
    console.log(start);
  }
}

console.log(countingDown(3));
console.log(countingDown(5));
console.log(countingDown(27));
