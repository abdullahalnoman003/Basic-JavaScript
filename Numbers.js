// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//          JAVASCRIPT — SECTION 3: NUMBERS & MATH
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//   3.1  Number Basics   (int, float, Infinity, NaN, parse)  
//   3.2  Math Object     (round, random, pow, sqrt, PI)      
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


// >>>>>>>>>>>>>>>>>>>>>>  3.1 Number Basics  <<<<<<<<<<<<<<<<
// In JavaScript, there is only ONE number type.
// It handles both whole numbers (integers) and decimal numbers (floats).
//
//   - Integer, float, Infinity, -Infinity     
//   - NaN and isNaN() check                   
//   - Number.isInteger() / Number.isFinite()  
//   - toFixed() / toPrecision()               
//   - parseInt() / parseFloat()               


// ---- Integer & Float ----
// Integer = whole number, Float = number with a decimal point
let studentCount = 45;          // integer
let cgpa         = 3.94;        // float
let temperature  = -7;          // negative integer
let discount     = 0.15;        // small float (15%)

console.log(studentCount);      // 45
console.log(cgpa);              // 3.94
console.log(temperature);       // -7
console.log(discount);          // 0.15


// ---- Infinity & -Infinity ----
// When a number goes beyond JS's limit, it becomes Infinity
// You get it by dividing a number by 0, or using the Infinity keyword directly
let posInfinity = Infinity;
let negInfinity = -Infinity;
let divByZero   = 1 / 0;        // dividing by 0 gives Infinity (no crash!)
let negDivByZero = -1 / 0;

console.log(posInfinity);       // Infinity
console.log(negInfinity);       // -Infinity
console.log(divByZero);         // Infinity
console.log(negDivByZero);      // -Infinity
console.log(typeof Infinity);   // "number" — Infinity is still a number type

// You can check if something is finite
console.log(isFinite(100));     // true  — 100 is a normal finite number
console.log(isFinite(Infinity));// false — Infinity is not finite


// ---- NaN (Not a Number) ----
// NaN is what you get when a math operation doesn't make sense
// For example: trying to multiply a word by a number
let badCalc  = "Noman" * 5;     // a name × number makes no sense
let badSqrt  = Math.sqrt(-9);   // square root of a negative = impossible
let badParse = parseInt("abc"); // "abc" can't be converted to a number

console.log(badCalc);           // NaN
console.log(badSqrt);           // NaN
console.log(badParse);          // NaN
console.log(typeof NaN);        // "number" — another JS quirk, NaN IS of number type

// Use isNaN() to check if a value is NaN
// Note: isNaN() also converts the value first — so isNaN("hello") = true
console.log(isNaN(badCalc));    // true
console.log(isNaN(42));         // false
console.log(isNaN("hello"));    // true  — "hello" gets converted, fails → NaN

// Number.isNaN() is stricter — it does NOT convert, checks the value as-is
console.log(Number.isNaN(NaN));     // true
console.log(Number.isNaN("hello")); // false — "hello" is not NaN, it's a string


// ---- Number.isInteger() ----
// Checks if a value is an integer (whole number), no decimals
console.log(Number.isInteger(22));    // true  — whole number
console.log(Number.isInteger(3.94)); // false — has a decimal
console.log(Number.isInteger(-7));   // true  — negative whole number
console.log(Number.isInteger("5"));  // false — it's a string, not a number


// ---- Number.isFinite() ----
// Safer than isFinite() — does NOT convert the value first
console.log(Number.isFinite(100));       // true
console.log(Number.isFinite(Infinity));  // false
console.log(Number.isFinite(-Infinity)); // false
console.log(Number.isFinite(NaN));       // false
console.log(Number.isFinite("100"));     // false — "100" is a string, not a number
// Compare: the global isFinite() would convert "100" → 100 and say true
console.log(isFinite("100"));            // true  ← this is why Number.isFinite() is safer


// ---- toFixed() ----
// Rounds a number to a fixed number of decimal places
// Returns a STRING, not a number — useful for displaying prices/cgpa
let price = 199.987654;
let myCgpa = 3.94444;

console.log(price.toFixed(2));       // "200.00" — rounded to 2 decimal places
console.log(price.toFixed(0));       // "200"    — rounded to whole number
console.log(myCgpa.toFixed(2));      // "3.94"
console.log(myCgpa.toFixed(1));      // "3.9"

// Practical use — showing a price tag
let itemPrice = 49.9;
console.log("Price: $" + itemPrice.toFixed(2)); // "Price: $49.90"


// ---- toPrecision() ----
// Sets the total number of significant digits (not just decimal places)
let bigNum = 123456.789;

console.log(bigNum.toPrecision(7));  // "123456.8" — 7 significant digits total
console.log(bigNum.toPrecision(4));  // "1.235e+5" — 4 digits, switches to sci notation
console.log(bigNum.toPrecision(9));  // "123456.789"

let small = 0.004567;
console.log(small.toPrecision(2));   // "0.0046" — 2 significant digits


// ---- parseInt() ----
// Reads a string and pulls out a whole number from the beginning
// Stops as soon as it hits something that is not a digit
console.log(parseInt("42"));         // 42
console.log(parseInt("42.99"));      // 42    — stops at the decimal point
console.log(parseInt("42px"));       // 42    — stops at 'p'
console.log(parseInt("3.94"));       // 3     — only the integer part
console.log(parseInt("abc"));        // NaN   — doesn't start with a digit
console.log(parseInt("  10  "));     // 10    — trims spaces automatically

// parseInt also accepts a second argument — the base (radix)
console.log(parseInt("ff", 16));     // 255   — "ff" in base 16 (hex) = 255
console.log(parseInt("1010", 2));    // 10    — "1010" in base 2 (binary) = 10


// ---- parseFloat() ----
// Same as parseInt but keeps the decimal part too
console.log(parseFloat("3.94"));     // 3.94
console.log(parseFloat("42.5px"));   // 42.5  — stops at 'p'
console.log(parseFloat("abc"));      // NaN
console.log(parseFloat("  7.77  ")); // 7.77  — trims spaces




// >>>>>>>>>>>>>>>>>>>>>>  3.2 Math Object  <<<<<<<<<<<<<<<<<<
// The Math object is built into JavaScript.
// It gives you useful math tools through its methods and constants.
// You do NOT need to import anything — it's always available.
//
//   - Math.round() / ceil() / floor()          
//   - Math.min() / max() / abs()               
//   - Math.random()                            
//   - Math.pow() / Math.sqrt()                 
//   - Math.PI                                  


// ---- Math.round() / Math.ceil() / Math.floor() ----
// These 3 all remove the decimal part, but differently:
//   round() → rounds to nearest integer (normal rounding rules)
//   ceil()  → always rounds UP  (ceiling = above you)
//   floor() → always rounds DOWN (floor = below you)

let num = 4.6;

console.log(Math.round(4.5));   // 5    — .5 and above rounds up
console.log(Math.round(4.4));   // 4    — below .5 rounds down
console.log(Math.round(-4.5));  // -4   — for negatives, .5 rounds toward 0

console.log(Math.ceil(4.1));    // 5    — always goes UP no matter what
console.log(Math.ceil(4.9));    // 5
console.log(Math.ceil(-4.1));   // -4   — for negatives, "up" means toward 0

console.log(Math.floor(4.9));   // 4    — always goes DOWN no matter what
console.log(Math.floor(4.1));   // 4
console.log(Math.floor(-4.1));  // -5   — for negatives, "down" means away from 0

// Practical use — calculating pages needed for items
let totalItems  = 23;
let itemsPerPage = 5;
let pages = Math.ceil(totalItems / itemsPerPage);
console.log("Pages needed:", pages); // 5 — you can't have half a page, so ceil


// ---- Math.min() / Math.max() ----
// min() returns the smallest value from the list
// max() returns the biggest value from the list
let scores = [88, 72, 95, 61, 79, 100, 55];

console.log(Math.min(10, 20, 5, 30));       // 5
console.log(Math.max(10, 20, 5, 30));       // 30

// To use with an array, spread it using ...
console.log(Math.min(...scores));           // 55
console.log(Math.max(...scores));           // 100


// ---- Math.abs() ----
// Returns the absolute value — removes the negative sign
// Think of it as "distance from 0", always positive
let bankBalance = -5000;   // you owe 5000 tk
let debt = Math.abs(bankBalance);
console.log(debt);              // 5000

console.log(Math.abs(-42));     // 42
console.log(Math.abs(42));      // 42    — positive stays positive
console.log(Math.abs(-3.14));   // 3.14
console.log(Math.abs(0));       // 0


// ---- Math.random() ----
// Returns a RANDOM decimal number between 0 (inclusive) and 1 (exclusive)
// Meaning: 0 is possible, but 1 is NOT possible
console.log(Math.random());     // something like 0.4729381... (different every time)
console.log(Math.random());     // a different number each time

// Get a random integer between 1 and 10 (including both):
let randomNum = Math.floor(Math.random() * 10) + 1;
console.log("Random 1–10  :", randomNum);

// General formula to get a random integer between min and max (inclusive):
//   Math.floor(Math.random() * (max - min + 1)) + min

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
console.log("Random 1–6   :", randomInt(1, 6));   // like rolling a dice
console.log("Random 50–100:", randomInt(50, 100));


// ---- Math.pow() ----
// Raises a number to a power (exponent)
// Math.pow(base, exponent) is same as base ** exponent
console.log(Math.pow(2, 10));   // 1024  — 2 to the power of 10
console.log(Math.pow(3, 3));    // 27    — 3 cubed
console.log(Math.pow(5, 0));    // 1     — anything to the power of 0 = 1
console.log(Math.pow(4, 0.5));  // 2     — power of 0.5 = square root

// Modern shortcut — the ** operator does the same thing
console.log(2 ** 10);           // 1024
console.log(3 ** 3);            // 27

// Practical use — compound interest formula: A = P * (1 + r)^n
let principal = 10000;   // initial amount in taka
let rate      = 0.1;     // 10% interest rate
let years     = 5;
let finalAmount = principal * Math.pow(1 + rate, years);
console.log("Final amount:", finalAmount.toFixed(2)); // "16105.10"


// ---- Math.sqrt() ----
// Returns the square root of a number
console.log(Math.sqrt(25));     // 5    — because 5 × 5 = 25
console.log(Math.sqrt(144));    // 12   — because 12 × 12 = 144
console.log(Math.sqrt(2));      // 1.4142135... — irrational number
console.log(Math.sqrt(0));      // 0
console.log(Math.sqrt(-4));     // NaN  — square root of negative = impossible in real numbers

// Practical use — finding the distance between two points (Pythagorean theorem)
// distance = sqrt(a² + b²)
let a = 3;
let b = 4;
let distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
console.log("Distance:", distance); // 5  (classic 3-4-5 right triangle)


// ---- Math.PI ----
// PI (π) is a constant — approximately 3.14159...
// Used for circle calculations
console.log(Math.PI);           // 3.141592653589793

// Area of a circle = π × r²
let radius = 7;
let area   = Math.PI * Math.pow(radius, 2);
console.log("Area of circle  :", area.toFixed(2));       // "153.94"

// Circumference of a circle = 2 × π × r
let circumference = 2 * Math.PI * radius;
console.log("Circumference   :", circumference.toFixed(2)); // "43.98"


// ---- Other handy Math methods ----

// Math.trunc() — removes the decimal part, no rounding, just cuts it off
console.log(Math.trunc(4.9));   // 4
console.log(Math.trunc(-4.9));  // -4   — different from floor(-4.9) which gives -5

// Math.sign() — tells you if a number is positive, negative, or zero
console.log(Math.sign(100));    //  1   — positive
console.log(Math.sign(-50));    // -1   — negative
console.log(Math.sign(0));      //  0   — zero

// Math.log() — natural logarithm (base e)
console.log(Math.log(1));       // 0
console.log(Math.log(Math.E));  // 1    — Math.E is Euler's number ≈ 2.718