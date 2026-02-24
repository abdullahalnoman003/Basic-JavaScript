
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//         JAVASCRIPT — SECTION 7: FUNCTIONS (in depth)
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//   7.1  Declaration Styles  (declaration, expression, arrow, IIFE)
//   7.2  Parameters          (default, rest, arguments object)
//   7.3  Higher-Order        (callbacks, returning functions, closures)
//   7.4  Important Concepts  (this, call/apply/bind, pure, recursion)
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// >>>>>>>>>>>>>>>>>>>>>>  7.1 Declaration Styles  <<<<<<<<<<<
// A function is a reusable block of code you give a name to.
// You write it once and call it as many times as you need.
// There are 4 ways to write a function in JavaScript.
//
//   - Function declaration
//   - Function expression
//   - Arrow function
//   - IIFE (Immediately Invoked Function Expression)


// ---- Function declaration ----
// The classic way. Write the keyword 'function', then a name, then the body.
// The big feature: you can call a declared function BEFORE it appears in the file
// because JS hoists it to the top automatically.

function greet(name) {
  console.log("Hello,", name);
}

greet("Noman");                    // "Hello, Noman"
greet("Abdullah");                 // "Hello, Abdullah"

// Functions can return a value using the return keyword.
// Once return runs, the function stops — nothing after it executes.
function add(a, b) {
  return a + b;
}

let sum = add(10, 20);
console.log("Sum:", sum);          // "Sum: 30"

// Hoisting — you can call a declared function before its definition
console.log(square(5));            // 25 — works even though square is defined below

function square(n) {
  return n * n;
}


// ---- Function expression ----
// Store a function inside a variable.
// NOT hoisted — you can only use it after the line where it is defined.

const multiply = function(a, b) {
  return a * b;
};

console.log(multiply(4, 5));       // 20

// You can also give the function a name (named function expression).
// The name is only useful inside the function itself (e.g. for recursion).
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);          // 'fact' is accessible here
};

console.log(factorial(5));         // 120
// console.log(fact(5));           // ReferenceError — 'fact' is not accessible outside


// ---- Arrow function ----
// A shorter, modern syntax for writing functions.
// Arrow functions do NOT have their own 'this' (important in section 7.4).

// Full arrow function
const subtract = (a, b) => {
  return a - b;
};
console.log(subtract(30, 10));     // 20

// One-liner arrow function — when there is only one expression,
// you can skip the curly braces and the return keyword
const double = n => n * 2;        // single param, no () needed
const addTwo = (a, b) => a + b;   // multiple params need ()

console.log(double(7));            // 14
console.log(addTwo(15, 5));        // 20

// Arrow function that returns an object — wrap it in () to avoid confusion with a block
const makeStudent = (name, cgpa) => ({ name, cgpa });
console.log(makeStudent("Noman", 3.94)); // { name: "Noman", cgpa: 3.94 }


// ---- IIFE (Immediately Invoked Function Expression) ----
// A function that runs immediately as soon as it is defined.
// Useful for running setup code once, or keeping variables private.
// Syntax: wrap the function in () then call it with another () at the end.

(function () {
  console.log("IIFE ran immediately!");
})();

// IIFE with a parameter
(function (siteName) {
  console.log("Welcome to", siteName);
})("Programming Hero");            // "Welcome to Programming Hero"

// Arrow function IIFE
(() => {
  let secret = "This variable is trapped inside";
  console.log(secret);             // accessible here
})();
// console.log(secret);            // ReferenceError — cannot access it outside




// >>>>>>>>>>>>>>>>>>>>>>  7.2 Parameters & Arguments  <<<<<<<
// Parameters are the names you write in the function definition.
// Arguments are the actual values you pass when calling the function.
// JS is flexible — you can pass more arguments than parameters, or fewer.
//
//   - Default parameters
//   - Rest parameters  (...args)
//   - Arguments object (in regular functions)


// ---- Default parameters ----
// Set a fallback value for a parameter in case the caller does not pass it.
// The default is used when the argument is missing OR is undefined.

function greetUser(name = "Guest") {
  console.log("Welcome,", name);
}

greetUser("Noman");                // "Welcome, Noman"
greetUser();                       // "Welcome, Guest" — no argument, uses default

const power = (base, exp = 2) => base ** exp;

console.log(power(3));             // 9   — exp defaults to 2
console.log(power(3, 3));          // 27  — exp is provided, no default used

// Default can reference an earlier parameter
function createId(prefix = "USR", number = 1) {
  return `${prefix}-${number}`;
}
console.log(createId());           // "USR-1"
console.log(createId("DEV", 42)); // "DEV-42"


// ---- Rest parameters (...args) ----
// Collect any number of extra arguments into an array.
// The ... before the last parameter name means "gather the rest into an array".
// There can only be one rest parameter and it must be the last one.

function sumAll(...numbers) {
  let total = 0;
  for (let n of numbers) {
    total += n;
  }
  return total;
}

console.log(sumAll(1, 2, 3));           // 6
console.log(sumAll(10, 20, 30, 40));    // 100
console.log(sumAll(5));                 // 5
console.log(sumAll());                  // 0

// Mix regular parameters with rest
function introduce(greeting, ...names) {
  for (let name of names) {
    console.log(`${greeting}, ${name}!`);
  }
}

introduce("Hello", "Noman", "Rahim", "Karim");
// "Hello, Noman!"
// "Hello, Rahim!"
// "Hello, Karim!"


// ---- Arguments object ----
// Regular functions (NOT arrow functions) have a special built-in object
// called 'arguments' that holds all passed values as an array-like object.
// It is the old way — rest parameters (...args) are preferred now.

function showArgs() {
  console.log(arguments);           // Arguments object: { 0: 1, 1: 2, 2: 3 }
  console.log(arguments.length);    // how many arguments were passed
  console.log(arguments[0]);        // first argument
}

showArgs(1, 2, 3);

// 'arguments' is NOT available in arrow functions
const arrowArgs = () => {
  // console.log(arguments); // ReferenceError in strict mode, or accesses outer scope
};

// Practical old-style sum using arguments
function oldSum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

console.log(oldSum(5, 10, 15));     // 30




// >>>>>>>>>>>>>>>>>>>>>>  7.3 Higher-Order Functions  <<<<<<<
// A higher-order function is a function that either:
//   - accepts another function as an argument  (callback)
//   - returns a function                       (closure)
//
//   - Callback functions
//   - Returning functions
//   - Closures explained


// ---- Callback functions ----
// A callback is a function you pass to another function as an argument.
// The outer function will call it at the right time.
// This is how things like setTimeout, forEach, and event listeners work.

function runTask(taskName, callback) {
  console.log(`Starting task: ${taskName}`);
  callback();
  console.log("Task finished.");
}

const myTask = () => {
  console.log("Doing the actual work...");
};

runTask("Download data", myTask);
// "Starting task: Download data"
// "Doing the actual work..."
// "Task finished."

// Passing an arrow function directly (anonymous callback)
runTask("Upload file", () => {
  console.log("Uploading the file...");
});

// Callbacks in built-in array methods
const scores = [88, 72, 95, 61, 79];

const passed = scores.filter(score => score >= 70);
console.log("Passed:", passed);     // [88, 72, 95, 79]

const doubled = scores.map(score => score * 2);
console.log("Doubled:", doubled);   // [176, 144, 190, 122, 158]


// ---- Returning functions ----
// A function can return another function.
// The returned function is then stored in a variable and called later.
// This is the foundation of closures.

function makeGreeter(greeting) {
  return function(name) {        // this inner function is returned
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = makeGreeter("Hello");
const sayHi    = makeGreeter("Hi");

sayHello("Noman");               // "Hello, Noman!"
sayHi("Abdullah");               // "Hi, Abdullah!"

// Arrow function version — same thing
const makeMultiplier = factor => number => number * factor;

const triple = makeMultiplier(3);
const times5 = makeMultiplier(5);

console.log(triple(4));          // 12
console.log(times5(6));          // 30


// ---- Closures ----
// A closure is when an inner function remembers the variables from its
// outer function even after the outer function has finished running.
// The inner function "closes over" the outer variable — it keeps a reference to it.

function makeCounter() {
  let count = 0;             // this variable lives on even after makeCounter() finishes

  return {
    increment() { count++;  console.log("Count:", count); },
    decrement() { count--;  console.log("Count:", count); },
    reset()     { count = 0; console.log("Count reset."); },
    getCount()  { return count; },
  };
}

const counter = makeCounter();
counter.increment();             // Count: 1
counter.increment();             // Count: 2
counter.increment();             // Count: 3
counter.decrement();             // Count: 2
counter.reset();                 // Count reset.
console.log(counter.getCount()); // 0

// Each call to makeCounter() creates a completely separate count variable
const counter2 = makeCounter();
counter2.increment();            // Count: 1  — separate from counter

// Practical closure — a function that remembers a base value
function makeAdder(base) {
  return n => base + n;          // 'base' is remembered via closure
}

const addTen  = makeAdder(10);
const addHund = makeAdder(100);

console.log(addTen(5));          // 15
console.log(addHund(25));        // 125




// >>>>>>>>>>>>>>>>>>>>>>  7.4 Important Concepts  <<<<<<<<<<<
//
//   - this keyword
//   - call() / apply() / bind()
//   - Pure functions
//   - Recursion


// ---- this keyword ----
// 'this' refers to the object that is currently calling the function.
// Its value depends on HOW and WHERE the function is called — not where it is defined.

// In a regular function inside an object, 'this' = that object
const student = {
  name: "Noman",
  cgpa: 3.94,
  introduce() {
    console.log(`I am ${this.name} and my CGPA is ${this.cgpa}`);
    // 'this' here refers to the student object
  },
};

student.introduce();             // "I am Noman and my CGPA is 3.94"

// In a regular function called on its own, 'this' = global object (or undefined in strict mode)
function whoAmI() {
  console.log(this);             // global object in browser, undefined in Node strict mode
}
whoAmI();

// Arrow functions do NOT have their own 'this'.
// They inherit 'this' from the surrounding code (lexical this).
const timer = {
  label: "My Timer",
  start() {
    // Arrow function inside a regular method — 'this' comes from start()
    setTimeout(() => {
      console.log(this.label);   // "My Timer" — works because arrow inherits 'this'
    }, 0);
  },
};
timer.start();


// ---- call() / apply() / bind() ----
// These let you manually set what 'this' should be when calling a function.

function printInfo(department, year) {
  console.log(`${this.name} | ${department} | Year: ${year}`);
}

const person1 = { name: "Noman" };
const person2 = { name: "Rahim" };

// call() — call the function immediately, pass args one by one
printInfo.call(person1, "Software Engineering", 2026);  // "Noman | Software Engineering | Year: 2026"
printInfo.call(person2, "CSE", 2025);                  // "Rahim | CSE | Year: 2025"

// apply() — same as call(), but arguments are passed as an array
printInfo.apply(person1, ["Software Engineering", 2026]); // same result
printInfo.apply(person2, ["CSE", 2025]);

// bind() — does NOT call immediately, returns a new function with 'this' locked in
const nomanPrint = printInfo.bind(person1);
nomanPrint("Software Engineering", 2026);  // call it later — 'this' is already locked

// bind() with pre-filled arguments (partial application)
const nomanSWE = printInfo.bind(person1, "Software Engineering");
nomanSWE(2026);                  // "Noman | Software Engineering | Year: 2026"
nomanSWE(2027);                  // "Noman | Software Engineering | Year: 2027"


// ---- Pure functions ----
// A pure function is a function that:
//   1. Always returns the same output for the same input
//   2. Has no side effects — does not modify anything outside itself
//
// Pure functions are easier to test, debug, and understand.

// Pure — same input always gives same output, nothing outside is changed
function addNumbers(a, b) {
  return a + b;                  // depends only on its inputs
}

console.log(addNumbers(3, 4));   // always 7
console.log(addNumbers(3, 4));   // always 7

// Impure — depends on an outside variable (side effect)
let taxRate = 0.1;
function calculatePrice(price) {
  return price + price * taxRate; // depends on taxRate which can change anytime
}

// Impure — modifies something outside itself
const students2 = [];
function addStudent(name) {
  students2.push(name);          // side effect — mutates the array outside the function
}

// Better — pure version, returns a new array instead of modifying the original
function addStudentPure(list, name) {
  return [...list, name];        // returns a new array, original is untouched
}

const original = ["Noman", "Rahim"];
const updated  = addStudentPure(original, "Karim");
console.log(original);           // ["Noman", "Rahim"]  — not changed
console.log(updated);            // ["Noman", "Rahim", "Karim"]


// ---- Recursion ----
// Recursion is when a function calls itself.
// Every recursive function needs a base case — a condition that stops the loop.
// Without a base case, it calls itself forever and crashes (stack overflow).
//
// Structure:
//   if (base case reached) → stop and return
//   otherwise → call itself with a smaller/simpler input

// Example 1 — factorial
// 5! = 5 × 4 × 3 × 2 × 1 = 120
function fact(n) {
  if (n <= 1) return 1;          // base case — stop here
  return n * fact(n - 1);        // recursive call with a smaller number
}

console.log(fact(5));            // 120
console.log(fact(6));            // 720

// Example 2 — countdown
function countdown(n) {
  if (n < 1) {                   // base case
    console.log("Done!");
    return;
  }
  console.log(n);
  countdown(n - 1);              // call itself with n reduced by 1
}

countdown(5);
// 5, 4, 3, 2, 1, Done!

// Example 3 — sum of numbers 1 to n
// sum(4) = 4 + 3 + 2 + 1 = 10
function sumTo(n) {
  if (n <= 0) return 0;          // base case
  return n + sumTo(n - 1);       // n + sum of everything below n
}

console.log(sumTo(4));           // 10
console.log(sumTo(10));          // 55

// Example 4 — flatten a deeply nested array without using flat()
function flattenArray(arr) {
  let result = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenArray(item)); // recurse into nested arrays
    } else {
      result.push(item);
    }
  }
  return result;
}

const nested = [1, [2, [3, [4, 5]]], 6];
console.log(flattenArray(nested)); // [1, 2, 3, 4, 5, 6]