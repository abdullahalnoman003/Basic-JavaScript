// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//              JAVASCRIPT — SECTION 1: BASICS
//              Author: Abdullah Al Noman
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//   1.1  Variables         (var, let, const)              
//   1.2  Data Types        (primitives + reference)       
//   1.3  Scope & Hoisting  (global, block, TDZ)           
//   1.4  Type Conversion   (coercion, truthy, == vs ===)  
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// >>>>>>>>>>>>>>>>>>>>>>  1.1 Variables  <<<<<<<<<<<<<<<<<<<<
// A variable is like a box — you give it a name and store something in it.
// In modern JS we use 2 keywords: let and const
// We DON'T recommend using var anymore (see why below)

//      - var   → old way, avoid it (function-scoped, hoisted weirdly)
//      - let   → can be changed later  (block-scoped)         recommended
//      - const → cannot be re-assigned (block-scoped)         recommended


// --- let: use when the value will change ---
let userName = "Noman";
console.log(userName);       // "Noman"

userName = "Abdullah";       //  we can change it
console.log(userName);       // "Abdullah"


// --- const: use when the value stays the same ---
const birthYear = 2002;
console.log(birthYear);      // 2002

// birthYear = 2003;         //  Error! Cannot re-assign a const


// --- var: avoid using this ---
// Problem 1: var leaks outside if/for blocks
// Problem 2: var is hoisted weirdly (see section 1.3)
var oldWay = "I am var, but avoid me";
console.log(oldWay);         // works, but use let/const instead


// --- Variable naming rules ---
let myAge = 22;              //  camelCase — the standard style in JS
let _score = 100;            //  underscore is fine
let $price = 9.99;           //  dollar sign is fine
// let 1stName = "bad";      //  cannot start with a number
// let my-name = "bad";      //  hyphens are not allowed



// >>>>>>>>>>>>>>>>>>>>>>  1.2 Data Types  <<<<<<<<<<<<<<<<<<
// JavaScript has 2 categories of data types:
//
//   Primitive  → stored by VALUE   (copy = separate box)   
//   Reference  → stored by MEMORY  (copy = same box, shared)
//
// JS is dynamically typed — one variable can hold any type.
//
//   Primitive types:
//     - String      "hello"                   
//     - Number      42, 3.14                  
//     - Boolean     true / false              
//     - null        empty on purpose          
//     - undefined   not yet given a value     
//     - NaN         bad math result           
//     - Symbol      unique id (advanced)      
//     - BigInt      very large numbers        
//   Reference types:
//     - Object      {}                        
//     - Array       []                         (see Arrays.js)
//     - Function    () => {}                   (see Functions.js)
//   - typeof operator                         
//   - Primitive vs Reference (copy vs share)  


// ---- 1. String ----
// Text — always wrapped in quotes (single, double, or backtick)
let firstName = "Abdullah";
let lastName = 'Noman';                              // single quotes also fine
let fullName = `My name is ${firstName} ${lastName}`; // backtick = template literal
console.log(fullName);                               // "My name is Abdullah Noman"


// ---- 2. Number ----
// Both integers and decimals use the same 'number' type
let age = 22;
let cgpa = 3.94;
let temperature = -5;
console.log(age, cgpa, temperature);


// ---- 3. Boolean ----
// Only 2 possible values: true or false
let isStudent = true;
let isMarried = false;
console.log(isStudent);  // true
console.log(isMarried);  // false


// ---- 4. null ----
// You set null intentionally — it means "no value right now"
let selectedCourse = null;
console.log(selectedCourse);   // null
console.log(typeof selectedCourse); // "object" ← known JS bug, don't worry


// ---- 5. undefined ----
// A variable declared but never given a value is automatically undefined
let futureGoal;
console.log(futureGoal);  // undefined


// ---- 6. NaN (Not a Number) ----
// Result of a math operation that doesn't make sense
let badMath = "Noman" * 5;
console.log(badMath);        // NaN
console.log(isNaN(badMath)); // true — use isNaN() to check


// ---- 7. Symbol ----
// Always creates a 100% unique value — no two Symbols are ever equal
// Useful for creating unique keys in objects (advanced stuff)
const id1 = Symbol("user_id");
const id2 = Symbol("user_id");
console.log(id1 === id2);    // false — same label, but they are different!
console.log(typeof id1);     // "symbol"


// ---- 8. BigInt ----
// Normal numbers have a max safe limit: Number.MAX_SAFE_INTEGER = 9007199254740991
// BigInt lets you go beyond that — just add 'n' at the end
const bigNum = 9007199254740993n;    // 'n' at the end makes it BigInt
const alsoGig = BigInt("99999999999999999999");
console.log(bigNum);
console.log(typeof bigNum);  // "bigint"
// Note: you cannot mix BigInt with regular number in math
// console.log(bigNum + 5); //  Error — must use: bigNum + 5n


// ---- 9. Object ----
// A collection of related data stored as key → value pairs
const student = {
  name: "Abdullah Al Noman",
  age: 22,
  department: "Software Engineering",
  cgpa: 3.94,
  isMarried: false,
};
console.log(student);
console.log(student.name);       // "Abdullah Al Noman"  — dot notation
console.log(student["cgpa"]);    // 3.94                 — bracket notation


// ---- 10. Array ---- (more in Arrays.js)
const skills = ["JavaScript", "React", "Node.js"];
console.log(skills[0]);      // "JavaScript"
console.log(skills.length);  // 3


// ---- 11. Function ---- (more in Functions.js)
function greet(name) {
  return `Hello, ${name}! Welcome to JS.`;
}
console.log(greet("Noman")); // "Hello, Noman! Welcome to JS."


// ---- typeof operator ----
// Use typeof to check what type a value is
console.log(typeof "hello");       // "string"
console.log(typeof 42);            // "number"
console.log(typeof true);          // "boolean"
console.log(typeof undefined);     // "undefined"
console.log(typeof null);          // "object"   ← JS bug (null is not an object)
console.log(typeof {});            // "object"
console.log(typeof []);            // "object"   ← arrays are objects in JS
console.log(typeof function(){}); // "function"
console.log(typeof Symbol());      // "symbol"
console.log(typeof 10n);           // "bigint"
// Also we can check it in variables

// ---- Primitive vs Reference (copy vs share) ----

// PRIMITIVE — copying makes a brand new separate value
let x = 10;
let y = x;   // y gets its OWN copy of 10
y = 99;
console.log(x); // 10 — x is NOT affected, still its own value
console.log(y); // 99

// REFERENCE — copying only copies the address (pointer), not the actual object
// So both variables point to the SAME object in memory
const obj1 = { university: "KUET" };
const obj2 = obj1;           // obj2 is NOT a new object — same one
obj2.university = "BUET";
console.log(obj1.university); // "BUET" — obj1 changed too! (same box)

// To make a real separate copy, use the spread operator { ...obj }
const obj3 = { ...obj1 };   // now obj3 is its own separate object
obj3.university = "SUST";
console.log(obj1.university); // "BUET" — obj1 is safe this time
console.log(obj3.university); // "SUST"




// >>>>>>>>>>>>>>>>>>>>>>  1.3 Scope & Hoisting  <<<<<<<<<<<<<<
// Scope   = where in your code a variable can be seen/used
// Hoisting = JS secretly moves variable declarations to the top before running
//
//   - Global scope                            
//   - Function scope                          
//   - Block scope                             
//   - Hoisting (var vs let/const)             
//   - Temporal Dead Zone (TDZ)                


// ---- Global Scope ----
// Declared outside everything — visible everywhere in the file
let globalMessage = "I am available everywhere";

function readGlobal() {
  console.log(globalMessage); //  can access the global variable from inside
}
readGlobal();


// ---- Function Scope ----
// Variables declared inside a function stay inside that function only
function myFunction() {
  let localVar = "only I can see this";
  console.log(localVar); //  works inside
}
myFunction();
// console.log(localVar); //  ReferenceError — can't access it from outside


// ---- Block Scope ----
// A block = anything inside { curly braces }  (if, for, while...)
// let and const respect the block. var does NOT.
{
  let blockOnly = "I live in this block";
  var iEscape = "var leaks out of blocks!";
  console.log(blockOnly); //  works inside the block
}
// console.log(blockOnly); //  gone — let is block-scoped
console.log(iEscape);      //  var leaked out — this is the var problem

// Real-world example
let isLoggedIn = true;
if (isLoggedIn) {
  let welcomeMsg = "Welcome back, Noman!";
  console.log(welcomeMsg);   //  works here
}
// console.log(welcomeMsg);  //  Error — it's gone outside the if block


// ---- Hoisting ----
// Before your code runs, JS scans the file and "hoists" (moves) declarations.
// var → hoisted AND given undefined automatically (no error, but confusing)
// let/const → hoisted BUT not initialized (causes error if used too early)

console.log(hoistedVar); // undefined  — no error because var is hoisted
var hoistedVar = "now I have a value";
console.log(hoistedVar); // "now I have a value"

// console.log(hoistedLet); //  ReferenceError — TDZ (see below)
let hoistedLet = "only accessible from this line onward";


// ---- Temporal Dead Zone (TDZ) ----
// The gap between the start of a block and where let/const is defined.
// During TDZ, the variable EXISTS but you CANNOT touch it.
function checkTDZ() {
  // ← TDZ for 'city' starts here (it exists but we can't use it yet)
  // console.log(city); //  ReferenceError — you're in the TDZ
  let city = "Dhaka";  // ← TDZ ends here, now it's safe
  console.log(city);   //  "Dhaka"
}
checkTDZ();




// >>>>>>>>>>>>>>>>>>>>>>  1.4 Type Conversion & Coercion  <<<<<
// Coercion   = JS automatically changes the type for you (implicit)
// Conversion = You manually change the type yourself (explicit)
//
//   - Implicit coercion (JS auto-converts)    
//   - Explicit conversion Number(), String()  
//   - Truthy & Falsy values                   
//   - == vs === vs Object.is()                


// ---- Implicit Coercion (automatic, JS decides) ----
// JS tries to make things work even when the types don't match

// String + Number → String  (number gets converted to string first)
console.log(5 + "3");        // "53"  ← not 8! JS joined them as strings
console.log(typeof (5+"3")); // "string"

// String - Number → Number  (minus forces JS to convert string to number)
console.log("10" - 4);       // 6   ← "10" became 10
console.log("10" * 2);       // 20

// Boolean in math: true = 1, false = 0
console.log(true + 1);       // 2
console.log(false + 10);     // 10

// null in math → 0
console.log(null + 5);       // 5

// undefined in math → NaN
console.log(undefined + 5);  // NaN


// ---- Explicit Conversion (you do it yourself) ----

// → Number()
console.log(Number("42"));      // 42
console.log(Number("3.14"));    // 3.14
console.log(Number(""));        // 0
console.log(Number("Noman"));   // NaN   — cannot convert a name to a number
console.log(Number(true));      // 1
console.log(Number(false));     // 0
console.log(Number(null));      // 0
console.log(Number(undefined)); // NaN

console.log(+"50");             // 50  — shortcut for Number(), the unary +

// → String()
console.log(String(100));       // "100"
console.log(String(true));      // "true"
console.log(String(null));      // "null"
console.log(String(undefined)); // "undefined"
console.log((255).toString(16));// "ff"  — number to hex string

// → Boolean()
console.log(Boolean(1));        // true
console.log(Boolean(0));        // false
console.log(Boolean("Noman"));  // true
console.log(Boolean(""));       // false
console.log(Boolean(null));     // false
console.log(Boolean(undefined));// false


// ---- Truthy & Falsy Values ----
// In JS, every value is either "truthy" or "falsy".
// This matters in if-conditions because JS converts to boolean automatically.
//
//   FALSY  (treated as false) — only these 6 values:
//     false, 0, "", null, undefined, NaN
//
//   TRUTHY = everything else (including "0", " ", [], {})

if (0) {
  console.log("won't run");
} else {
  console.log("0 is falsy");          // ← this runs
}

if ("Noman") {
  console.log('"Noman" is truthy');   // ← non-empty string is truthy 
}

if ([]) {
  console.log("empty array is truthy"); // ← [] is truthy! not falsy 
}

if ({}) {
  console.log("empty object is truthy"); // ← {} is truthy too! 
}

// Practical use — check if a user typed something
let inputName = "";
if (!inputName) {
  console.log("Please enter your name"); // runs because "" is falsy
}


// ---- == vs === vs Object.is() ----

// == (loose equality) — converts types first, THEN compares
// This causes weird results and bugs — try to avoid it
console.log(5 == "5");          // true  — "5" becomes 5 before comparing
console.log(0 == false);        // true  — false becomes 0
console.log(null == undefined); // true  — special rule in JS
console.log(null == 0);         // false — null only equals null or undefined

// === (strict equality) — NO conversion, type AND value must both match
//  Always prefer === over ==
console.log(5 === "5");         // false — number vs string, different types
console.log(0 === false);       // false — number vs boolean, different types
console.log(5 === 5);           // true  — same value, same type 

// Object.is() — almost same as ===, but fixes 2 weird edge cases
console.log(Object.is(NaN, NaN)); // true  — but NaN === NaN gives false!
console.log(NaN === NaN);         // false — NaN never equals itself with ===
console.log(Object.is(0, -0));    // false — 0 and -0 are technically different
console.log(0 === -0);            // true  — === can't tell the difference
