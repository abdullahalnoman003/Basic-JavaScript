// ============================================================
//              SECTION 5 — ARRAYS (in depth)
// ============================================================
//
//   5.1 Basics
//        - Creating arrays                         ✅ done
//        - Accessing and updating elements         ✅ done
//        - push / pop / shift / unshift            ✅ done
//        - length property                         ✅ done
//        - Array.from() / Array.of()               ✅ done
//        - Array.isArray()                         ✅ done
//
//   5.2 Searching
//        - indexOf() / lastIndexOf()               ✅ done
//        - includes()                              ✅ done
//        - find() / findIndex()                    ✅ done
//
//   5.3 Iteration Methods
//        - forEach()                               ✅ done
//        - map()                                   ✅ done
//        - filter()                                ✅ done
//        - reduce()                                ✅ done
//        - some() / every()                        ✅ done
//        - flat() / flatMap()                      ✅ done
//
//   5.4 Manipulation
//        - slice()                                 ✅ done
//        - splice()                                ✅ done
//        - sort() / reverse()                      ✅ done
//        - concat() / join()                       ✅ done
//        - spread operator [...]                   ✅ done
//        - Destructuring  const [a, b] = arr       ✅ done
//
// ============================================================


// ─────────────────────────────────────────────
//  5.1  BASICS
// ─────────────────────────────────────────────

// --- Creating arrays ---
const numArray  = [10, 20, 30, 40];          // number array
const strArray  = ["apple", "banana", "cherry", "date"]; // string array
const mixArray  = [1, "hello", true, null];  // mixed array

console.log("Number array :", numArray);
console.log("String array :", strArray);
console.log("Mixed  array :", mixArray);

// --- Accessing and updating elements ---
console.log("First element  :", numArray[0]);   //  10
console.log("Third element  :", strArray[2]);   // "cherry"

numArray[1] = 99;                               // update index 1
strArray[0] = "APPLE";                          // update string element
console.log("After update numArray :", numArray);
console.log("After update strArray :", strArray);

// reset for later use
numArray[1] = 20;
strArray[0] = "apple";

// --- push / pop / shift / unshift ---
const fruits = ["banana", "cherry"];

fruits.push("date");            // add to end
console.log("After push    :", fruits);   // ["banana", "cherry", "date"]

fruits.pop();                   // remove from end
console.log("After pop     :", fruits);   // ["banana", "cherry"]

fruits.unshift("apple");        // add to beginning
console.log("After unshift :", fruits);   // ["apple", "banana", "cherry"]

fruits.shift();                 // remove from beginning
console.log("After shift   :", fruits);   // ["banana", "cherry"]

// --- length property ---
const scores = [10, 20, 20, 30, 40, 30, 50, 25, 35, 55, 78];
console.log("Length of scores :", scores.length);           // 11

const names = ["Alice", "Bob", "Charlie", "Diana"];
console.log("Length of names  :", names.length);            // 4

// --- Array.from() ---
// Creates an array from an iterable or array-like value
const fromString  = Array.from("hello");          // string → array of chars
const fromSet     = Array.from(new Set([1, 2, 2, 3])); // Set → unique values
const fromRange   = Array.from({ length: 5 }, (_, i) => i + 1); // [1,2,3,4,5]

console.log("Array.from string :", fromString);   // ["h","e","l","l","o"]
console.log("Array.from Set    :", fromSet);      // [1, 2, 3]
console.log("Array.from range  :", fromRange);    // [1, 2, 3, 4, 5]

// --- Array.of() ---
// Creates an array from the arguments passed
const ofNums    = Array.of(1, 2, 3, 4);
const ofStrings = Array.of("one", "two", "three");
const ofMixed   = Array.of(10, "text", true);

console.log("Array.of numbers :", ofNums);        // [1, 2, 3, 4]
console.log("Array.of strings :", ofStrings);     // ["one", "two", "three"]
console.log("Array.of mixed   :", ofMixed);       // [10, "text", true]

// --- Array.isArray() ---
// typeof returns "object" for arrays, so use isArray() to confirm
console.log("typeof numArray  :", typeof numArray);            // "object"
console.log("isArray numArray :", Array.isArray(numArray));    // true
console.log("isArray string   :", Array.isArray("hello"));    // false
console.log("isArray object   :", Array.isArray({ a: 1 }));   // false


// ─────────────────────────────────────────────
//  5.2  SEARCHING
// ─────────────────────────────────────────────

const letters = ["a", "b", "c", "b", "d", "a"];
const numbers = [10, 20, 20, 30, 40, 30, 50];

// --- indexOf() / lastIndexOf() ---
console.log("indexOf  'b'  :", letters.indexOf("b"));       // 1  (first occurrence)
console.log("lastIndexOf 'b':", letters.lastIndexOf("b"));  // 3  (last  occurrence)
console.log("indexOf  30   :", numbers.indexOf(30));        // 3
console.log("lastIndexOf 30:", numbers.lastIndexOf(30));    // 5
console.log("indexOf  99   :", numbers.indexOf(99));        // -1 (not found)

// --- includes() ---
console.log("includes 'c'  :", letters.includes("c"));    // true
console.log("includes 'z'  :", letters.includes("z"));    // false
console.log("includes 40   :", numbers.includes(40));     // true

// string array with includes
const languages = ["JavaScript", "Python", "TypeScript", "Rust"];
console.log("includes 'Python'   :", languages.includes("Python"));    // true
console.log("includes 'Ruby'     :", languages.includes("Ruby"));      // false

// --- find() / findIndex() ---
// find() returns the first element that satisfies the condition
const foundNum   = numbers.find((n) => n > 25);
const foundStr   = languages.find((lang) => lang.startsWith("T"));
console.log("find > 25          :", foundNum);    // 30
console.log("find starts with T :", foundStr);    // "TypeScript"

// findIndex() returns the index of the first match, or -1
const foundIdx   = numbers.findIndex((n) => n > 25);
const foundStrIdx = languages.findIndex((lang) => lang.length > 10);
console.log("findIndex > 25          :", foundIdx);    // 3
console.log("findIndex length > 10   :", foundStrIdx); // 2  ("TypeScript")


// ─────────────────────────────────────────────
//  5.3  ITERATION METHODS
// ─────────────────────────────────────────────

const prices  = [100, 200, 300, 400, 500];
const words   = ["hello", "world", "foo", "bar", "javascript"];

// --- forEach() ---
// Runs a function for every element — returns undefined
console.log("--- forEach (numbers) ---");
prices.forEach((price, i) => console.log(`  [${i}] $${price}`));

console.log("--- forEach (strings) ---");
words.forEach((word) => console.log("  " + word.toUpperCase()));

// --- map() ---
// Returns a NEW array with the results of the function
const doubled   = prices.map((p) => p * 2);
const discounted = prices.map((p) => p * 0.9);          // 10% off
const upperWords = words.map((w) => w.toUpperCase());
const wordLengths = words.map((w) => `${w} (${w.length})`);

console.log("doubled     :", doubled);     // [200, 400, 600, 800, 1000]
console.log("discounted  :", discounted);  // [90, 180, 270, 360, 450]
console.log("upperWords  :", upperWords);  // ["HELLO", "WORLD", ...]
console.log("wordLengths :", wordLengths); // ["hello (5)", "world (5)", ...]

// --- filter() ---
// Returns a NEW array with elements that pass the test
const expensive  = prices.filter((p) => p > 250);
const cheap      = prices.filter((p) => p <= 200);
const longWords  = words.filter((w) => w.length > 4);
const hasVowelStart = words.filter((w) => "aeiou".includes(w[0]));

console.log("expensive       :", expensive);     // [300, 400, 500]
console.log("cheap           :", cheap);         // [100, 200]
console.log("longWords       :", longWords);     // ["hello", "world", "javascript"]
console.log("starts w/ vowel :", hasVowelStart); // []

// --- reduce() ---
// Reduces the array to a single value
// Syntax: arr.reduce((accumulator, currentValue) => ..., initialValue)

const totalPrice  = prices.reduce((acc, curr) => acc + curr, 0);
const maxPrice    = prices.reduce((max, curr) => (curr > max ? curr : max), 0);
const charCount   = words.reduce((acc, w) => acc + w.length, 0);
const wordMap     = words.reduce((acc, w) => {
  acc[w] = w.length;
  return acc;
}, {});

console.log("totalPrice  :", totalPrice);  // 1500
console.log("maxPrice    :", maxPrice);    // 500
console.log("charCount   :", charCount);   // total characters across all words
console.log("wordMap     :", wordMap);     // { hello: 5, world: 5, ... }

// --- some() / every() ---
// some()  → true if AT LEAST ONE element passes the test
// every() → true if ALL elements pass the test

console.log("some > 400   :", prices.some((p) => p > 400));    // true
console.log("some > 1000  :", prices.some((p) => p > 1000));   // false
console.log("every > 50   :", prices.every((p) => p > 50));    // true
console.log("every > 200  :", prices.every((p) => p > 200));   // false

console.log("some len > 8 :", words.some((w) => w.length > 8));   // true ("javascript")
console.log("every len > 2:", words.every((w) => w.length > 2));  // true

// --- flat() / flatMap() ---
// flat()    → flattens nested arrays into a single array
// flatMap() → maps first, then flattens one level

const nested       = [1, [2, 3], [4, [5, 6]]];
const deepNested   = ["hello", ["world", ["foo", "bar"]]];

console.log("flat depth 1 :", nested.flat());       // [1, 2, 3, 4, [5, 6]]
console.log("flat depth 2 :", nested.flat(2));      // [1, 2, 3, 4, 5, 6]
console.log("flat Infinity:", nested.flat(Infinity)); // [1, 2, 3, 4, 5, 6]
console.log("flat strings :", deepNested.flat(Infinity)); // ["hello","world","foo","bar"]

const sentences = ["Hello World", "Foo Bar", "JS Arrays"];
const flatMapped = sentences.flatMap((s) => s.split(" "));  // split each then flatten
console.log("flatMap split:", flatMapped); // ["Hello","World","Foo","Bar","JS","Arrays"]

const numFlatMap = prices.flatMap((p) => [p, p * 2]);  // each price → [price, double]
console.log("flatMap nums :", numFlatMap); // [100, 200, 200, 400, ...]


// ─────────────────────────────────────────────
//  5.4  MANIPULATION
// ─────────────────────────────────────────────

const base    = [10, 20, 30, 40, 50, 60, 70];
const strBase = ["apple", "banana", "cherry", "date", "elderberry"];

// --- slice() ---
// Returns a portion of the array (does NOT modify original)
// Syntax: arr.slice(startIndex, endIndex)  — endIndex is exclusive

console.log("slice(1, 4)    :", base.slice(1, 4));      // [20, 30, 40]
console.log("slice(3)       :", base.slice(3));          // [40, 50, 60, 70]
console.log("slice(-2)      :", base.slice(-2));         // last 2 → [60, 70]
console.log("str slice(1,3) :", strBase.slice(1, 3));   // ["banana", "cherry"]

// --- splice() ---
// Modifies the original array — can insert, remove, or replace
// Syntax: arr.splice(startIndex, deleteCount, ...itemsToAdd)

const arrA = [1, 2, 3, 4, 5];
arrA.splice(2, 0, 99);          // insert 99 at index 2 (delete 0)
console.log("After insert     :", arrA);  // [1, 2, 99, 3, 4, 5]

arrA.splice(1, 2);              // remove 2 elements from index 1
console.log("After remove     :", arrA);  // [1, 3, 4, 5]

arrA.splice(1, 1, 200, 300);   // replace 1 element at index 1 with 200, 300
console.log("After replace    :", arrA);  // [1, 200, 300, 4, 5]

const strC = ["apple", "banana", "cherry"];
strC.splice(1, 1, "BLUEBERRY");  // replace "banana"
console.log("str After replace :", strC); // ["apple", "BLUEBERRY", "cherry"]

// --- sort() / reverse() ---
// sort() modifies the original array
// Without a comparator it sorts lexicographically (as strings)

const sortNums = [40, 5, 100, 3, 20];
sortNums.sort((a, b) => a - b);     // ascending numeric sort
console.log("Sorted asc   :", sortNums);  // [3, 5, 20, 40, 100]

sortNums.sort((a, b) => b - a);     // descending numeric sort
console.log("Sorted desc  :", sortNums);  // [100, 40, 20, 5, 3]

const sortStr = ["banana", "apple", "cherry", "date"];
sortStr.sort();                     // alphabetical sort (A–Z)
console.log("Sorted A-Z   :", sortStr);   // ["apple", "banana", "cherry", "date"]

sortStr.reverse();                  // reverse in place → Z–A
console.log("Reversed Z-A :", sortStr);   // ["date", "cherry", "banana", "apple"]

// --- concat() / join() ---
// concat() merges arrays into a NEW array (original unchanged)
// join()   converts array to a string using a separator

const arrX = [1, 2, 3];
const arrY = [4, 5, 6];
const arrZ = ["a", "b", "c"];

const merged1 = arrX.concat(arrY);          // merge two number arrays
const merged2 = arrX.concat(arrY, arrZ);    // merge three arrays
console.log("concat 2 arrays :", merged1);  // [1, 2, 3, 4, 5, 6]
console.log("concat 3 arrays :", merged2);  // [1, 2, 3, 4, 5, 6, "a", "b", "c"]

const joinDefault = merged1.join();         // default separator = ","
const joinDash    = merged1.join(" - ");    // custom separator
const joinSpace   = strBase.join(" ");      // join words with space
const joinPipe    = strBase.join(" | ");    // join words with pipe

console.log("join default :", joinDefault); // "1,2,3,4,5,6"
console.log("join dash    :", joinDash);    // "1 - 2 - 3 - 4 - 5 - 6"
console.log("join space   :", joinSpace);   // "apple banana cherry date elderberry"
console.log("join pipe    :", joinPipe);    // "apple | banana | cherry | date | elderberry"
console.log("typeof join  :", typeof joinDefault); // "string"

// --- spread operator [...] ---
// Copies or merges arrays without mutating the originals

const original = [1, 2, 3];
const copy     = [...original];              // shallow copy
const extended = [...original, 4, 5, 6];    // copy + extra elements
const combined = [...arrX, ...arrY, ...arrZ]; // merge multiple

copy[0] = 999;                               // mutating copy does NOT affect original
console.log("original    :", original);  // [1, 2, 3]  ← unchanged
console.log("copy        :", copy);      // [999, 2, 3]
console.log("extended    :", extended);  // [1, 2, 3, 4, 5, 6]
console.log("combined    :", combined);  // [1, 2, 3, 4, 5, 6, "a", "b", "c"]

// spreading a string into an array of characters
const chars = [..."JavaScript"];
console.log("spread string:", chars); // ["J","a","v","a","S","c","r","i","p","t"]

// --- Destructuring ---
// Extract values from an array into variables

const [first, second, third] = [10, 20, 30];
console.log("Destructure   :", first, second, third); // 10 20 30

// skip elements with commas
const [a, , b] = [100, 200, 300];
console.log("Skip middle   :", a, b);   // 100 300

// rest element collects the remainder
const [head, ...tail] = ["apple", "banana", "cherry", "date"];
console.log("head  :", head);  // "apple"
console.log("tail  :", tail);  // ["banana", "cherry", "date"]

// default values — used when the element is undefined
const [x = 0, y = 0, z = 99] = [5, 10];
console.log("defaults      :", x, y, z);  // 5 10 99

// swap variables using destructuring
let m = "hello", n = "world";
[m, n] = [n, m];
console.log("swapped       :", m, n);   // "world" "hello"


