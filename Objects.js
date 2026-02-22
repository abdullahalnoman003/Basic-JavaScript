// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//          JAVASCRIPT — SECTION 6: OBJECTS (in depth)
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//   6.1  Basics          (literal, access, add, delete, shorthand)
//   6.2  Object Utilities (keys/values, assign, spread, destructure)
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// >>>>>>>>>>>>>>>>>>>>>>  6.1 Basics  <<<<<<<<<<<<<<<<<<<<<<<
// An object is a collection of related data stored as key → value pairs.
// Think of it like a real-world profile card — it holds multiple pieces
// of information about one thing, all in one place.
//
//   - Object literal {}
//   - Accessing: dot notation & bracket notation
//   - Adding / updating / deleting properties
//   - Shorthand property names
//   - Computed property names


// ---- Object literal {} ----
// The simplest way to create an object is to write it directly with {}.
// Each entry is called a property — it has a key and a value, separated by :
// Properties are separated from each other with commas.

const student = {
  name      : "Abdullah Al Noman",
  age       : 22,
  department: "Software Engineering",
  cgpa      : 3.94,
  isMarried : false,
};

console.log(student);


// ---- Accessing: dot notation & bracket notation ----
// There are two ways to read a value from an object.
//
//   dot notation    → obj.key     (clean, most common, use when key name is known)
//   bracket notation → obj["key"] (flexible, use when key is dynamic or has spaces)

console.log(student.name);          // "Abdullah Al Noman"
console.log(student.cgpa);          // 3.94
console.log(student["age"]);        // 22
console.log(student["department"]); // "Software Engineering"

// Bracket notation shines when the key comes from a variable
let field = "name";
console.log(student[field]);        // "Abdullah Al Noman" — reads the key from the variable

// Dot notation fails when the key has a space or special character
const profile = {
  "full name"  : "Noman",          // key with a space — only bracket notation can read this
  "user-id"    : 1042,
};

// console.log(profile.full name);  // error — invalid syntax
console.log(profile["full name"]);  // "Noman"
console.log(profile["user-id"]);    // 1042


// ---- Adding / Updating / Deleting properties ----
// Objects are mutable — you can change them after creation even with const.
// const only prevents you from reassigning the variable itself, not from
// changing what is inside the object.

const dev = {
  name: "Noman",
  lang: "JavaScript",
};

// Adding a new property
dev.university = "Daffodil International University";
dev["hobby"]   = "Coding";
console.log(dev);
// { name: "Noman", lang: "JavaScript", university: "Daffodil International University", hobby: "Coding" }

// Updating an existing property
dev.lang = "TypeScript";           // overwrite the old value
dev["name"] = "Abdullah";
console.log(dev.lang);             // "TypeScript"
console.log(dev.name);             // "Abdullah"

// Deleting a property — use the delete keyword
delete dev.hobby;
console.log(dev);
// { name: "Abdullah", lang: "TypeScript", university: "Daffodil International University" }

// Checking if a property exists — use the in operator
console.log("name" in dev);        // true
console.log("hobby" in dev);       // false — we just deleted it


// ---- Shorthand property names ----
// When a variable name matches the key you want, you can write it once.
// JS figures out the key and value automatically.

let name  = "Noman";
let age   = 22;
let cgpa  = 3.94;

// Long way (old style)
const studentA = {
  name: name,
  age : age,
  cgpa: cgpa,
};

// Short way (modern, cleaner)
const studentB = { name, age, cgpa };   // exact same result

console.log(studentA);             // { name: "Noman", age: 22, cgpa: 3.94 }
console.log(studentB);             // { name: "Noman", age: 22, cgpa: 3.94 }


// ---- Computed property names ----
// You can use a variable or expression as a key name by wrapping it in [].
// Useful when you don't know the key name until runtime.

let key1 = "subject";
let key2 = "score";

const result = {
  [key1]: "Mathematics",           // key is the value of key1 → "subject"
  [key2]: 95,                      // key is the value of key2 → "score"
};

console.log(result);               // { subject: "Mathematics", score: 95 }
console.log(result.subject);       // "Mathematics"

// Another example — building dynamic keys in a loop
const stats = {};
const fields = ["min", "max", "avg"];
const values = [55, 100, 78];

for (let i = 0; i < fields.length; i++) {
  stats[fields[i]] = values[i];    // e.g. stats["min"] = 55
}

console.log(stats);                // { min: 55, max: 100, avg: 78 }




// >>>>>>>>>>>>>>>>>>>>>>  6.2 Object Utilities  <<<<<<<<<<<<<
// JS gives you built-in tools to work with objects more effectively.
//
//   - Object.keys() / values() / entries()
//   - Object.assign()
//   - Object spread  { ...obj }
//   - Destructuring  const { a, b } = obj
//   - Optional chaining  obj?.prop
//   - Nullish coalescing  obj.prop ?? default


// ---- Object.keys() / Object.values() / Object.entries() ----
// These three methods convert an object into an array so you can loop over it.
//
//   Object.keys()    → array of all the keys
//   Object.values()  → array of all the values
//   Object.entries() → array of [key, value] pairs

const person = {
  name      : "Abdullah Al Noman",
  age       : 22,
  department: "Software Engineering",
  cgpa      : 3.94,
};

console.log(Object.keys(person));
// [ "name", "age", "department", "cgpa" ]

console.log(Object.values(person));
// [ "Abdullah Al Noman", 22, "Software Engineering", 3.94 ]

console.log(Object.entries(person));
// [ ["name","Abdullah Al Noman"], ["age",22], ["department","Software Engineering"], ["cgpa",3.94] ]

// Looping over an object using Object.entries() — cleaner than for...in
for (let [key, value] of Object.entries(person)) {
  console.log(`${key}: ${value}`);
}
// name: Abdullah Al Noman
// age: 22
// department: Software Engineering
// cgpa: 3.94

// Count how many properties the object has
console.log("Total fields:", Object.keys(person).length); // 4


// ---- Object.assign() ----
// Copies properties from one or more source objects into a target object.
// It modifies and returns the target.
// Syntax: Object.assign(target, source1, source2, ...)

const base = { name: "Noman", age: 22 };
const extra = { department: "CSE", cgpa: 3.94 };

const merged = Object.assign({}, base, extra); // {} is the target — a fresh empty object
console.log(merged);
// { name: "Noman", age: 22, department: "CSE", cgpa: 3.94 }

// If the same key exists in multiple sources, the later one wins
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 99, c: 3 };
const combined = Object.assign({}, obj1, obj2);
console.log(combined);             // { a: 1, b: 99, c: 3 } — b from obj2 wins

// Important: Object.assign() does a SHALLOW copy — nested objects are still shared
// Use spread or structuredClone() for a proper deep copy


// ---- Object spread { ...obj } ----
// A cleaner modern way to copy or merge objects — same idea as Object.assign().
// Very commonly used in real projects.

const info = { name: "Noman", age: 22 };
const extra2 = { cgpa: 3.94, university: "Daffodil International University" };

// Merge two objects into a new one
const fullProfile = { ...info, ...extra2 };
console.log(fullProfile);
// { name: "Noman", age: 22, cgpa: 3.94, university: "Daffodil International University" }

// Copy an object and override one property
const updated = { ...info, age: 23 };          // everything from info, but age is now 23
console.log(updated);              // { name: "Noman", age: 23 }
console.log(info);                 // { name: "Noman", age: 22 } — original not affected

// Add extra fields on the fly while spreading
const withRole = { ...info, role: "Developer", active: true };
console.log(withRole);
// { name: "Noman", age: 22, role: "Developer", active: true }


// ---- Destructuring const { a, b } = obj ----
// A quick way to pull values out of an object into separate variables.
// Instead of writing obj.name and obj.age everywhere, you name them once.

const dev2 = {
  name      : "Noman",
  age       : 22,
  department: "Software Engineering",
  cgpa      : 3.94,
};

// Without destructuring (old way)
let devName = dev2.name;
let devAge  = dev2.age;

// With destructuring (modern, cleaner)
const { name: devName2, age: devAge2, department, cgpa: devCgpa } = dev2;
console.log(devName2);             // "Noman"
console.log(devAge2);              // 22
console.log(department);           // "Software Engineering"
console.log(devCgpa);              // 3.94

// Default values in destructuring — used when a property does not exist
const { university = "Not specified", cgpa: gpa = 0.0 } = dev2;
console.log(university);           // "Not specified" — dev2 has no university key
console.log(gpa);                  // 3.94 — cgpa exists, so default is ignored

// Destructuring in a function parameter — very common in real code
function printStudent({ name, cgpa, department = "Unknown" }) {
  console.log(`${name} | CGPA: ${cgpa} | Dept: ${department}`);
}

printStudent(dev2);
// "Noman | CGPA: 3.94 | Dept: Software Engineering"


// ---- Optional chaining obj?.prop ----
// Safely access a deeply nested property without crashing.
// If any part of the chain is null or undefined, it returns undefined instead
// of throwing a ReferenceError.
//
// Without optional chaining, reading a property of null causes an error.

const user1 = {
  name   : "Noman",
  address: {
    city   : "Dhaka",
    country: "Bangladesh",
  },
};

const user2 = {
  name: "Rahim",
  // no address property at all
};

// Without optional chaining — crashes if address is missing
// console.log(user2.address.city); // TypeError: Cannot read property 'city' of undefined

// With optional chaining — safe, returns undefined instead of crashing
console.log(user1.address?.city);       // "Dhaka"
console.log(user2.address?.city);       // undefined — no crash
console.log(user1.address?.zip?.code);  // undefined — zip does not exist, no crash

// Also works for method calls with ?.()
const account = {
  getBalance() { return 5000; },
};

const emptyAccount = {};

console.log(account.getBalance?.());      // 5000
console.log(emptyAccount.getBalance?.()); // undefined — method doesn't exist, no crash


// ---- Nullish coalescing obj.prop ?? default ----
// Provide a fallback value when a property is null or undefined.
// Works great together with optional chaining.

const settings = {
  theme    : "dark",
  fontSize : 0,          // 0 is a valid setting — we want to keep it
  username : "",         // empty string is also valid — we want to keep it
  language : null,       // not set yet — we want to fall back to a default
};

// Using || would incorrectly replace 0 and "" with the default
console.log(settings.fontSize  || 16);    // 16   — wrong! 0 is a valid value
console.log(settings.username  || "Guest"); // "Guest" — wrong! "" is valid

// Using ?? only replaces null and undefined — correct behavior
console.log(settings.fontSize  ?? 16);    // 0      — keeps the real value
console.log(settings.username  ?? "Guest"); // ""   — keeps the empty string
console.log(settings.language  ?? "English"); // "English" — null, so use default
console.log(settings.theme     ?? "light");   // "dark"    — already set, no fallback

// Combining optional chaining with nullish coalescing — very common pattern
const city = user2.address?.city ?? "City not provided";
console.log(city);                 // "City not provided" — address is missing