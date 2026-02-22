
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//        JAVASCRIPT — SECTION 4: LOGIC & CONTROL FLOW
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//   4.1  Conditionals      (if/else, switch, ternary)
//   4.2  Logical Operators (&&, ||, !, ??, short-circuit)
//   4.3  Loops             (for, while, do-while, for-of, for-in)
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// >>>>>>>>>>>>>>>>>>>>>>  4.1 Conditionals  <<<<<<<<<<<<<<<<<
// Conditionals let your code make decisions.
// You give it a condition — if it is true, do this, otherwise do that.
//
//   - if / else if / else
//   - switch / case / break / default
//   - Ternary operator   condition ? a : b


// ---- if / else if / else ----
// The most basic way to make a decision in JS.
// JS checks the condition inside () — if it is true, the block runs.

let age = 22;

if (age >= 18) {
  console.log("You are an adult.");   // this runs because 22 >= 18 is true
}

// Add an else to handle the false case
let marks = 45;

if (marks >= 50) {
  console.log("You passed.");
} else {
  console.log("You failed.");         // this runs because 45 is less than 50
}

// Add else if to check multiple conditions one by one
// JS checks from top to bottom and stops at the first true condition
let cgpa = 3.94;

if (cgpa >= 3.75) {
  console.log("Grade: A+");          // this runs
} else if (cgpa >= 3.50) {
  console.log("Grade: A");
} else if (cgpa >= 3.25) {
  console.log("Grade: A-");
} else if (cgpa >= 3.00) {
  console.log("Grade: B+");
} else {
  console.log("Grade: Below B+");
}

// Practical example — checking login status
let isLoggedIn = true;
let isAdmin    = false;

if (isLoggedIn && isAdmin) {
  console.log("Welcome, Admin!");
} else if (isLoggedIn) {
  console.log("Welcome, Noman!");     // this runs
} else {
  console.log("Please log in.");
}


// ---- switch / case / break / default ----
// Use switch when you are comparing ONE variable against MANY possible values.
// It is often cleaner than writing a long chain of if/else if.
//
// How it works:
//   1. JS looks at the value inside switch()
//   2. It jumps to the matching case
//   3. Runs code until it hits a break (break stops the switch)
//   4. If no case matches, the default block runs

let day = "Monday";

switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("It is the weekend — rest day!");
    break;
  case "Monday":
    console.log("Start of the work week.");  // this runs
    break;
  case "Friday":
    console.log("Almost weekend!");
    break;
  default:
    console.log("It is a regular weekday.");
}

// What happens without break? — "fall-through"
// If you forget break, JS keeps running the next cases too
let num = 2;

switch (num) {
  case 1:
    console.log("one");
  case 2:
    console.log("two");    // runs
  case 3:
    console.log("three");  // also runs! (no break above)
    break;
  case 4:
    console.log("four");   // does NOT run (break stopped it)
}

// Another practical example — grading with switch
let grade = "B";

switch (grade) {
  case "A":
    console.log("Excellent!");
    break;
  case "B":
    console.log("Good job.");   // this runs
    break;
  case "C":
    console.log("You can do better.");
    break;
  default:
    console.log("Invalid grade.");
}


// ---- Ternary Operator ----
// A short one-line way to write a simple if/else.
// Syntax:   condition ? valueIfTrue : valueIfFalse
//
// Think of it as: "Is this true? Yes → give A. No → give B."

let userAge = 20;
let access = userAge >= 18 ? "Allowed" : "Denied";
console.log(access);             // "Allowed"

// Same thing written with if/else for comparison:
// if (userAge >= 18) { access = "Allowed" } else { access = "Denied" }

// Ternary inside a template literal
let score = 75;
console.log(`Result: ${score >= 50 ? "Pass" : "Fail"}`); // "Result: Pass"

// You can also chain ternaries, but keep it readable
let point = 85;
let letterGrade = point >= 90 ? "A"
                : point >= 80 ? "B"
                : point >= 70 ? "C"
                : "F";
console.log(letterGrade);        // "B"




// >>>>>>>>>>>>>>>>>>>>>>  4.2 Logical Operators  <<<<<<<<<<<<
// Logical operators are used to combine or reverse conditions.
// They return a value — not just true or false (important!)
//
//   - && (AND)
//   - || (OR)
//   - !  (NOT)
//   - ?? (Nullish Coalescing)
//   - Short-circuit evaluation


// ---- && (AND) ----
// Returns true only if BOTH sides are true.
// If the left side is false, JS stops and does NOT check the right side.

console.log(true  && true);     // true   — both are true
console.log(true  && false);    // false  — right side is false
console.log(false && true);     // false  — left is false, right not even checked

// Practical use
let hasTicket = true;
let hasID     = true;

if (hasTicket && hasID) {
  console.log("You can enter.");       // runs — both are true
}

// Real values (not just booleans) — && returns the first falsy value it finds,
// or the last value if all are truthy
console.log(1 && 2 && 3);      // 3     — all truthy, returns the last one
console.log(1 && 0 && 3);      // 0     — 0 is falsy, stops and returns 0
console.log("hi" && "bye");    // "bye" — both truthy, returns last


// ---- || (OR) ----
// Returns true if AT LEAST ONE side is true.
// If the left side is already true, JS stops and does NOT check the right side.

console.log(true  || false);   // true  — left is true, done
console.log(false || true);    // true  — left is false, checks right
console.log(false || false);   // false — both false

// Practical use
let isWeekend = false;
let isHoliday = true;

if (isWeekend || isHoliday) {
  console.log("No class today!");      // runs — at least one is true
}

// Real values — || returns the first truthy value it finds,
// or the last value if all are falsy
console.log(0 || "Noman");     // "Noman" — 0 is falsy, returns right side
console.log("" || "default");  // "default"
console.log(null || 42);       // 42
console.log("hi" || "bye");    // "hi"   — "hi" is truthy, stops there

// Common use — default value fallback
let inputName = "";
let displayName = inputName || "Guest";
console.log(displayName);      // "Guest" — because "" is falsy


// ---- ! (NOT) ----
// Flips the boolean. true becomes false, false becomes true.

console.log(!true);            // false
console.log(!false);           // true
console.log(!0);               // true  — 0 is falsy, so !0 is true
console.log(!"hello");         // false — "hello" is truthy, so !"hello" is false
console.log(!null);            // true

// Double NOT !! — converts any value to its boolean form
// Same result as Boolean()
console.log(!!"Noman");        // true
console.log(!!"");             // false
console.log(!!0);              // false
console.log(!!1);              // true

// Practical use
let isNotLoggedIn = !isLoggedIn;
if (!isLoggedIn) {
  console.log("Please log in first.");
}


// ---- ?? (Nullish Coalescing) ----
// Similar to ||, but ONLY treats null and undefined as "missing".
// It does NOT treat 0, "", or false as missing — that is the key difference.

// With || :
console.log(0 || "default");     // "default" — because 0 is falsy (maybe not what you want)
console.log("" || "default");    // "default" — because "" is falsy

// With ?? :
console.log(0 ?? "default");     // 0          — 0 is not null/undefined, so keep it
console.log("" ?? "default");    // ""          — "" is not null/undefined, so keep it
console.log(null ?? "default");  // "default"  — null, so use the right side
console.log(undefined ?? "default"); // "default" — undefined, so use the right side

// Practical use — user settings where 0 or "" is a valid value
let userVolume = 0;             // user set volume to 0 (valid setting!)
let volume = userVolume ?? 50;  // should keep 0, not replace with 50
console.log(volume);            // 0 — correct behavior

let userVolume2 = null;         // user has no setting saved yet
let volume2 = userVolume2 ?? 50;
console.log(volume2);           // 50 — falls back to default


// ---- Short-circuit Evaluation ----
// JS is lazy — it stops evaluating as soon as the result is certain.
// && stops at the first falsy value
// || stops at the first truthy value
// This is called short-circuiting and is used as a pattern

// Pattern 1: run something only if a condition is true (using &&)
let isAuthenticated = true;
isAuthenticated && console.log("User is logged in."); // logs the message
// same as: if (isAuthenticated) { console.log(...) }

let notAuth = false;
notAuth && console.log("This will NOT run."); // skipped — notAuth is false

// Pattern 2: provide a fallback value (using ||)
let storedName = null;
let finalName  = storedName || "Anonymous";
console.log(finalName);   // "Anonymous"

// Pattern 3: provide a fallback only for null/undefined (using ??)
let savedScore = 0;
let finalScore = savedScore ?? 100;
console.log(finalScore);  // 0 — the 0 is kept, not replaced




// >>>>>>>>>>>>>>>>>>>>>>  4.3 Loops  <<<<<<<<<<<<<<<<<<<<<<<
// Loops repeat a block of code multiple times.
// Instead of writing the same line 10 times, you write it once in a loop.
//
//   - for loop
//   - while loop
//   - do...while loop
//   - for...of  (arrays / strings)
//   - for...in  (objects)
//   - break / continue


// ---- for loop ----
// Use when you know EXACTLY how many times to repeat.
// Structure: for (start ; condition ; step)
//   start     → runs once at the beginning
//   condition → checked before each iteration — if false, loop stops
//   step      → runs after each iteration

for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);      // prints 1, 2, 3, 4, 5
}

// Looping through an array by index
const students = ["Noman", "Rahim", "Karim", "Sadia"];

for (let i = 0; i < students.length; i++) {
  console.log(`Student ${i + 1}: ${students[i]}`);
}
// Student 1: Noman
// Student 2: Rahim
// Student 3: Karim
// Student 4: Sadia

// Counting down
for (let i = 5; i >= 1; i--) {
  console.log("Countdown:", i);  // 5, 4, 3, 2, 1
}

// Nested for loop — loop inside a loop
// Outer runs once, inner completes fully, then outer moves to next
for (let row = 1; row <= 3; row++) {
  for (let col = 1; col <= 3; col++) {
    console.log(`row ${row}, col ${col}`);
  }
}


// ---- while loop ----
// Use when you do NOT know exactly how many times to repeat.
// It keeps running as long as the condition is true.
// Structure: while (condition) { ... }
//
// Be careful — if the condition never becomes false, it runs forever (infinite loop)

let count = 1;
while (count <= 5) {
  console.log("While count:", count);
  count++;                       // very important — without this, infinite loop!
}

// Practical example — keep asking until a valid input (simulated)
let attempts = 0;
let maxAttempts = 3;
let loggedIn = false;

while (attempts < maxAttempts && !loggedIn) {
  attempts++;
  console.log(`Login attempt ${attempts}`);
  if (attempts === 2) {          // simulate correct password on 2nd try
    loggedIn = true;
    console.log("Login successful!");
  }
}


// ---- do...while loop ----
// Almost the same as while, but the block runs AT LEAST ONCE
// because the condition is checked AFTER the first run.
// Use when you always need the code to run at least one time.

let x = 10;
do {
  console.log("do-while x:", x); // runs once even though 10 > 5 is false? wait...
  x++;
} while (x < 5);
// x starts at 10, condition (10 < 5) is false — but the block already ran once
// Output: "do-while x: 10"  — just one time

// More practical example — show a menu at least once
let choice = 0;
do {
  console.log("Showing menu...");
  choice = 1;                    // simulate user picking option 1
} while (choice === 0);          // only repeat if user picked nothing
// Output: "Showing menu..." — once, then exits


// ---- for...of loop ----
// The easiest way to loop through arrays (and strings).
// You get the VALUE directly — no need to manage an index.

const cities = ["Dhaka", "Chittagong", "Sylhet", "Khulna"];

for (let city of cities) {
  console.log("City:", city);
}
// City: Dhaka
// City: Chittagong
// City: Sylhet
// City: Khulna

// Works on strings too — loops through each character
const word = "Noman";

for (let char of word) {
  console.log("Char:", char);    // N, o, m, a, n
}

// Looping over numbers with for...of using Array.from
for (let n of Array.from({ length: 5 }, (_, i) => i + 1)) {
  console.log("Number:", n);     // 1, 2, 3, 4, 5
}


// ---- for...in loop ----
// Used to loop through the KEYS of an object.
// Each iteration gives you the key — use obj[key] to get the value.
// Note: avoid using for...in on arrays (use for...of instead)

const student = {
  name: "Abdullah Al Noman",
  age: 22,
  department: "Software Engineering",
  cgpa: 3.94,
};

for (let key in student) {
  console.log(`${key}: ${student[key]}`);
}
// name: Abdullah Al Noman
// age: 22
// department: Software Engineering
// cgpa: 3.94

// Another example — counting how many properties an object has
let propertyCount = 0;
for (let key in student) {
  propertyCount++;
}
console.log("Total properties:", propertyCount); // 4


// ---- break & continue ----
// break    → completely stops the loop and exits it
// continue → skips the rest of the current iteration, jumps to the next one

// break example — stop when you find what you need
const numbers = [3, 7, 2, 9, 4, 6, 1];
let target = 9;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] === target) {
    console.log(`Found ${target} at index ${i}`); // "Found 9 at index 3"
    break;                       // no reason to keep looping once found
  }
}

// continue example — skip certain items
const allScores = [88, -5, 72, -10, 95, 61, -3, 79];

console.log("Valid scores:");
for (let score of allScores) {
  if (score < 0) {
    continue;                    // skip negative values, move to next
  }
  console.log(score);            // only prints: 88, 72, 95, 61, 79
}

// break inside a while loop
let attempt = 0;

while (true) {                   // would run forever without break
  attempt++;
  console.log("Attempt:", attempt);
  if (attempt === 3) {
    console.log("Max attempts reached. Stopping.");
    break;                       // exits the while loop
  }
}

