const finalMenuItems = [
  "American Cheeseburger",
  "Southern Fried Chicken",
  "Glazed Salmon"
];

let [first, second] = finalMenuItems;
console.log('before', { first },{ second });
[second, first] = [first, second];
console.log('after', { first },{ second });
