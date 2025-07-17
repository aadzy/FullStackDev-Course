/* JS is loosely typed
Primitive types:

string
number
boolean
undefined
null
symbol

everything else - Object type

1) Explicit type conversion
2) Implicit type conversion (coercion)
truthy
falsy

/ false
// 0
// ''
// null
// undefined
// NaN

1) Avoid direct comparisons in conditionals

// const username = null;

// if (!username) {
//   console.log('no user');
// }

// 2) Use triple equals === (strict equals operator) 

// if (null === undefined) {
//   console.log('equals');
// } else {
//   console.log('not equals');
// }

// 3) Convert to real Boolean values where needed

if (Boolean(NaN) === Boolean(NaN)) {
    console.log('equal')
} else {
    console.log('not equals')
}

// 1) Closures are a property of JavaScript functions
// 2) Call function in different scope than where function was original defined

Anonymous functions
Arrow Functions => fat arrow
callback functions(higher order functions)
Objects,
Objects destructuring
Objects merge-assign  --

To avoid mutations, we put{} as a first element
Arrays
Check Element Existence in Arrays - includes
Perform Actions on All Elements -map
Get Subsets of Array
reduce
avoid mutations by Array spread 
- map()
- filter()
- reduce()
- some() / every()
- find() / findIndex()
- forEach()

Plus:

- slice()
- concat()
- includes()
- array spread operator


*/