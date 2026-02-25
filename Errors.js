// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//       JAVASCRIPT — SECTION 8: ERROR HANDLING & DEBUGGING
//       Author: Abdullah Al Noman
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//   8.1  Errors           (SyntaxError, TypeError, ReferenceError, RangeError)
//   8.2  Handling Errors  (try/catch/finally, throw, custom error classes)
//   8.3  Debugging Tools  (console methods, debugger, DevTools tips)
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// >>>>>>>>>>>>>>>>>>>>>>  8.1 Errors  <<<<<<<<<<<<<<<<<<<<<<<
// An error is JavaScript's way of telling you something went wrong.
// When JS encounters a problem it cannot recover from, it throws an error
// and stops running any further code — unless you catch it (section 8.2).
//
// There are 4 common error types you will run into:
//   - SyntaxError    : code is written incorrectly, JS cannot even read it
//   - TypeError      : you used a value in the wrong way (wrong type)
//   - ReferenceError : you tried to use a variable that does not exist
//   - RangeError     : a number or value is outside the allowed range


// ---- SyntaxError ----
// Happens when you write code that breaks JavaScript's grammar rules.
// JS catches this before the file even runs — the whole script stops.
// You will never see a SyntaxError at runtime because it prevents startup.

// Examples (these are commented out because they would break the file):
// const name =      // SyntaxError: missing value after =
// if (true {        // SyntaxError: missing closing ) before {
// let 1abc = 5;     // SyntaxError: cannot start a name with a number


// ---- TypeError ----
// Happens when you try to do something with a value that does not support it.
// Common causes: calling a non-function, reading a property of null/undefined.

// Trying to call something that is not a function
try {
  let num = 42;
  num();               // TypeError: num is not a function
} catch (err) {
  console.log(err.name);    // "TypeError"
  console.log(err.message); // "num is not a function"
}

// Reading a property on null
try {
  let user = null;
  console.log(user.name);   // TypeError: Cannot read properties of null
} catch (err) {
  console.log(err.name);    // "TypeError"
  console.log(err.message); // "Cannot read properties of null (reading 'name')"
}

// Calling a string method on a number
try {
  let score = 95;
  score.toUpperCase();       // TypeError: score.toUpperCase is not a function
} catch (err) {
  console.log(err.name);    // "TypeError"
}


// ---- ReferenceError ----
// Happens when you try to use a variable that has not been declared.
// Also happens when you access a let/const before its declaration (TDZ).

try {
  console.log(nomanScore);  // ReferenceError: nomanScore is not defined
} catch (err) {
  console.log(err.name);    // "ReferenceError"
  console.log(err.message); // "nomanScore is not defined"
}

// TDZ (Temporal Dead Zone) — accessing let/const before its line
try {
  console.log(myCity);      // ReferenceError: Cannot access 'myCity' before initialization
  let myCity = "Dhaka";
} catch (err) {
  console.log(err.name);    // "ReferenceError"
}


// ---- RangeError ----
// Happens when you pass a value that is outside the accepted range.
// Common causes: invalid array length, too many recursive calls, toFixed with bad number.

try {
  let arr = new Array(-5);  // RangeError: Invalid array length
} catch (err) {
  console.log(err.name);    // "RangeError"
  console.log(err.message); // "Invalid array length"
}

try {
  let pi = 3.14159;
  pi.toFixed(200);           // RangeError: toFixed() digits argument must be 0 - 100
} catch (err) {
  console.log(err.name);    // "RangeError"
}

// Infinite recursion causes a RangeError too
try {
  function infinite() { return infinite(); }
  infinite();                // RangeError: Maximum call stack size exceeded
} catch (err) {
  console.log(err.name);    // "RangeError"
}




// >>>>>>>>>>>>>>>>>>>>>>  8.2 Handling Errors  <<<<<<<<<<<<<<
// Instead of letting your program crash, you can handle errors gracefully.
// JS gives you try/catch/finally and the throw keyword for this.
//
//   - try / catch / finally
//   - throw keyword
//   - Custom error classes


// ---- try / catch / finally ----
// try    : put the code that might fail here
// catch  : runs only if the try block throws an error — you get the error object
// finally: runs ALWAYS — whether there was an error or not
//
// This is the standard pattern for safe error handling.

// Basic try/catch
try {
  let data = JSON.parse("{ bad json }");  // this will throw a SyntaxError
} catch (err) {
  console.log("Something went wrong!");
  console.log("Error type   :", err.name);    // "SyntaxError"
  console.log("Error message:", err.message); // details about what failed
}

// try/catch/finally
function readUserData() {
  try {
    let raw = '{"name": "Noman", "age": 22}';
    let user = JSON.parse(raw);
    console.log("User loaded:", user.name);   // "User loaded: Noman"
    return user;
  } catch (err) {
    console.log("Failed to parse user data:", err.message);
    return null;
  } finally {
    // this always runs — good for cleanup (close a file, stop a loader, etc.)
    console.log("readUserData() finished.");  // always prints
  }
}

readUserData();

// finally runs even when the try block returns early
function divide(a, b) {
  try {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
  } catch (err) {
    console.log("Error:", err.message);
    return null;
  } finally {
    console.log("divide() done.");            // runs in both cases
  }
}

console.log(divide(10, 2));   // 5   (try succeeds)
console.log(divide(10, 0));   // null (catch handles it)


// ---- throw keyword ----
// You can create and throw your own errors using the throw keyword.
// You can throw anything — a string, number, or an Error object.
// Using new Error() is the best practice because it includes a stack trace.

function validateAge(age) {
  if (typeof age !== "number") {
    throw new TypeError("Age must be a number, got: " + typeof age);
  }
  if (age < 0 || age > 120) {
    throw new RangeError(`Age ${age} is not a realistic value (0-120).`);
  }
  return `Valid age: ${age}`;
}

try {
  console.log(validateAge(22));   // "Valid age: 22"
  console.log(validateAge(-5));   // throws RangeError
} catch (err) {
  console.log(err.name + ":", err.message);
}

try {
  console.log(validateAge("old")); // throws TypeError
} catch (err) {
  console.log(err.name + ":", err.message);
}

// Throw is not limited to Error objects — but prefer Error for best practice
function mustBePositive(n) {
  if (n <= 0) throw new Error(`Expected a positive number, got ${n}`);
  return Math.sqrt(n);
}

try {
  console.log(mustBePositive(25));  // 5
  console.log(mustBePositive(-9));  // throws
} catch (err) {
  console.log("Caught:", err.message);
}


// ---- Custom error classes ----
// You can extend the built-in Error class to create your own error types.
// This lets you throw errors with a specific name and check them with instanceof.
// Very useful in larger apps where different errors need different handling.

class ValidationError extends Error {
  constructor(message, field) {
    super(message);            // calls Error's constructor with the message
    this.name  = "ValidationError";
    this.field = field;        // extra info about which field caused the error
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name       = "NetworkError";
    this.statusCode = statusCode;
  }
}

// Using custom errors
function processForm(data) {
  if (!data.name) {
    throw new ValidationError("Name field is required.", "name");
  }
  if (!data.email.includes("@")) {
    throw new ValidationError("Email is not valid.", "email");
  }
  console.log("Form is valid:", data);
}

try {
  processForm({ name: "", email: "noman@test.com" });
} catch (err) {
  if (err instanceof ValidationError) {
    console.log(`${err.name} on field '${err.field}': ${err.message}`);
    // "ValidationError on field 'name': Name field is required."
  } else {
    console.log("Unexpected error:", err.message);
  }
}

// Simulate a failed API call
function fetchUser(id) {
  if (id <= 0) throw new NetworkError("User not found.", 404);
  return { id, name: "Noman" };
}

try {
  fetchUser(-1);
} catch (err) {
  if (err instanceof NetworkError) {
    console.log(`${err.name} [${err.statusCode}]: ${err.message}`);
    // "NetworkError [404]: User not found."
  }
}




// >>>>>>>>>>>>>>>>>>>>>>  8.3 Debugging Tools  <<<<<<<<<<<<<<
// Debugging means finding and fixing problems in your code.
// JS gives you several tools to inspect what is happening at runtime.
//
//   - console methods (log, warn, error, table, group, time)
//   - debugger statement
//   - Browser DevTools tips


// ---- console methods ----

// console.log() — the most used one, prints any value
console.log("Hello from console.log");
console.log("name:", "Noman", "| age:", 22);   // multiple values separated by commas
console.log({ name: "Noman", cgpa: 3.94 });    // logs an object — expandable in browser

// console.warn() — prints a yellow warning message
// Use when something is not broken yet but might cause a problem
console.warn("This function is deprecated, use the new version instead.");

// console.error() — prints a red error message with a stack trace
// Use when something has definitely gone wrong
console.error("Failed to load user data.");

// console.table() — prints an array of objects as a formatted table
// Very useful for comparing multiple records at a glance
const students = [
  { name: "Noman",   cgpa: 3.94, dept: "SWE" },
  { name: "Rahim",   cgpa: 3.75, dept: "CSE" },
  { name: "Karim",   cgpa: 3.50, dept: "EEE" },
];
console.table(students);

// console.group() / console.groupEnd() — visually group related logs together
console.group("Student Info");
  console.log("Name :", "Abdullah Al Noman");
  console.log("Age  :", 22);
  console.log("CGPA :", 3.94);
console.groupEnd();

// console.time() / console.timeEnd() — measure how long something takes
console.time("loop timer");
let total = 0;
for (let i = 0; i < 1_000_000; i++) {
  total += i;
}
console.timeEnd("loop timer");   // "loop timer: Xms"
console.log("Total:", total);

// console.assert() — only logs if the condition is FALSE
// Good for catching unexpected states without throwing an error
let userAge = 22;
console.assert(userAge >= 18, "User must be at least 18!");  // no output (condition is true)
console.assert(userAge >= 30, "User must be at least 30!");  // logs the message (condition is false)

// console.count() — counts how many times a label has been logged
function processItem(item) {
  console.count("processItem called");
  return item * 2;
}
processItem(1);  // "processItem called: 1"
processItem(2);  // "processItem called: 2"
processItem(3);  // "processItem called: 3"

// console.clear() — clears the console output
// console.clear();


// ---- debugger statement ----
// When your code runs and hits the 'debugger' keyword, it pauses execution
// and opens the browser DevTools at that exact line.
// You can then inspect all variables and step through the code line by line.
// This only works when DevTools is open — otherwise it is silently ignored.

function calculateDiscount(price, percent) {
  debugger;                      // execution pauses here in the browser
  let discount = (price * percent) / 100;
  let finalPrice = price - discount;
  return finalPrice;
}

// console.log(calculateDiscount(1000, 20)); // open DevTools, then run this


// ---- Browser DevTools tips ----
// DevTools is the most powerful debugging tool you have.
// Open it with F12 (or Ctrl+Shift+I) in any browser.
//
// The most useful panels for JavaScript:
//
//   Console panel
//     - Run any JS code directly
//     - See all console.log / warn / error output
//     - Click on an error to jump to the exact line in the file
//
//   Sources panel
//     - View your actual JS files
//     - Click on any line number to set a breakpoint (same as debugger keyword)
//     - When paused at a breakpoint:
//         Step Over (F10)   → run the current line and move to the next
//         Step Into (F11)   → go inside the function being called
//         Step Out  (Shift+F11) → finish the current function and come back out
//         Resume    (F8)    → continue running until the next breakpoint
//     - Inspect the Scope panel on the right to see all current variable values
//
//   Network panel
//     - See all HTTP requests (fetch, API calls)
//     - Check response status codes, headers, and response body
//     - Useful for debugging fetch() issues
//
// Quick tip: right-click on any element in the page → "Inspect"
// to jump straight to it in the Elements panel.
