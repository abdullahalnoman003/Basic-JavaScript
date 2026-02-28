// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//        JAVASCRIPT — SECTION 2: WORKING WITH STRINGS
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//  2.1  String Basics       (quotes, template literals, multiline, escape)
//  2.2  Reading Strings     (length, index access, iteration)
//  2.3  Case & Whitespace   (toUpperCase, toLowerCase, trim variants)
//  2.4  Searching           (includes, startsWith, endsWith, indexOf, lastIndexOf)
//  2.5  Extracting Parts    (slice, substring, at, charAt)
//  2.6  Replacing           (replace, replaceAll, regex replace)
//  2.7  Splitting & Joining (split, join — paired with arrays)
//  2.8  Padding & Repeating (padStart, padEnd, repeat)
//  2.9  Character Codes     (charCodeAt, codePointAt, String.fromCharCode)
//
//  NOTE: Strings are IMMUTABLE — no method changes the original string.
//        Every method returns a NEW string.
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// >>>>>>>>>>>>>>>>>>>>>>  2.1 String Basics  <<<<<<<<<<<<<<<
// A string is a sequence of characters — text.
// You can create strings using three kinds of quotes.


// ---- Single quotes and Double quotes ----
// Both work the same way. Use whichever you prefer — just stay consistent.

const firstName  = 'Abdullah';
const lastName   = "Al Noman";
const university = 'KUET';

console.log(firstName);            // "Abdullah"
console.log(lastName);             // "Al Noman"

// Mixing quotes: use the OTHER quote type inside a string
const sentence1  = "He said 'Hello' to everyone.";
const sentence2  = 'She replied "Good morning!"';

console.log(sentence1);            // "He said 'Hello' to everyone."
console.log(sentence2);            // 'She replied "Good morning!"'


// ---- Escape Characters ----
// When you MUST use the same quote type, escape it with a backslash \.
// Escape sequences also let you insert special characters.

const escaped    = 'It\'s a beautiful day.';  // \' inside single-quoted string
const quoted     = "He said \"Hi\" to me.";   // \" inside double-quoted string

console.log(escaped);              // "It's a beautiful day."
console.log(quoted);               // 'He said "Hi" to me.'

// Common escape sequences:
// \n   — new line
// \t   — tab (indent)
// \\   — a literal backslash
// \'   — a literal single quote
// \"   — a literal double quote

const withNewline = "Line 1\nLine 2\nLine 3";
const withTab     = "Name:\tNoman";
const withSlash   = "C:\\Users\\Noman\\Documents";

console.log(withNewline);
// "Line 1"
// "Line 2"
// "Line 3"

console.log(withTab);              // "Name:   Noman"
console.log(withSlash);            // "C:\Users\Noman\Documents"


// ---- Template Literals (Backtick strings) ----
// Use backticks ` ` instead of quotes.
// Two major advantages over regular strings:
//   1. You can embed ANY expression directly using ${ }
//   2. You can write multi-line strings naturally without \n

const dept  = "Software Engineering";
const cgpa  = 3.94;
const year  = 3;

// Embedding variables (interpolation)
const intro  = `My name is ${firstName} ${lastName}.`;
const result = `Studying ${dept} at ${university}, Year ${year}.`;
const grade  = `CGPA: ${cgpa} — ${cgpa >= 3.5 ? "Excellent" : "Good"}`;

console.log(intro);                // "My name is Abdullah Al Noman."
console.log(result);               // "Studying Software Engineering at KUET, Year 3."
console.log(grade);                // "CGPA: 3.94 — Excellent"

// Any valid JS expression works inside ${ }
console.log(`5 + 3 = ${5 + 3}`);             // "5 + 3 = 8"
console.log(`Today: ${new Date().getFullYear()}`); // "Today: 2026"
console.log(`Upper: ${"noman".toUpperCase()}`);    // "Upper: NOMAN"

// Function call inside template literal
function getLabel(score) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  return "C";
}

const physics = 88;
console.log(`Physics: ${physics} → Grade ${getLabel(physics)}`);
// "Physics: 88 → Grade A"


// ---- Multiline Strings ----
// With backticks, just press Enter — no \n needed.
// The whitespace and indentation are preserved exactly.

const bio = `Name       : Abdullah Al Noman
Department : Software Engineering
University : KUET
CGPA       : 3.94`;

console.log(bio);
// Name       : Abdullah Al Noman
// Department : Software Engineering
// University : KUET
// CGPA       : 3.94

// String concatenation (old way — avoid in modern code)
const oldStyle = "Hello, " + firstName + "! " +
                 "You are in year " + year + ".";

console.log(oldStyle);             // "Hello, Abdullah! You are in year 3."

// String concatenation using +=
let message = "Hello";
message += ", Noman";
message += "!";
console.log(message);              // "Hello, Noman!"




// >>>>>>>>>>>>>>>>>>>>>>  2.2 Reading Strings  <<<<<<<<<<<<<
// Strings behave like arrays of characters.
// You can access individual characters by their index (position).
// Index starts at 0.


const word = "JavaScript";
//            0123456789

// ---- length ----
// Tells you how many characters are in the string.
// Spaces, punctuation, and special chars all count.

console.log(word.length);          // 10
console.log("".length);            // 0
console.log("Hi!".length);         // 3
console.log("  spaces  ".length);  // 10  (spaces count too)

// Useful: check if a string is empty
const input = "";
if (input.length === 0) {
  console.log("Input is empty");   // "Input is empty"
}


// ---- Index Access — [ ] and charAt() ----
// Strings are zero-indexed — first char is at index 0.

console.log(word[0]);              // "J"
console.log(word[4]);              // "S"
console.log(word[9]);              // "t"
console.log(word[99]);             // undefined  (out of range)

// charAt(index) — older equivalent, returns "" for out-of-range
console.log(word.charAt(0));       // "J"
console.log(word.charAt(99));      // ""   (not undefined)

// Last character — two common ways
console.log(word[word.length - 1]);      // "t"
console.log(word.at(-1));                // "t"  — modern, cleaner


// ---- at() — modern index access ----
// at() accepts negative indices counting from the end.

const str = "Noman";
console.log(str.at(0));            // "N"   — first
console.log(str.at(1));            // "o"
console.log(str.at(-1));           // "n"   — last
console.log(str.at(-2));           // "a"   — second from last


// ---- Iterating over characters ----
// Since strings are iterable, you can use for-of to loop character by character.

const lang = "JS";
for (const char of lang) {
  console.log(char);               // "J" then "S"
}

// Using split("") to get an array of characters
const chars = "Hello".split("");
console.log(chars);                // ["H", "e", "l", "l", "o"]




// >>>>>>>>>>>>>>>>>>>>>>  2.3 Case & Whitespace  <<<<<<<<<<
// These methods clean and normalize strings.
// Very useful when handling user input — users type inconsistently.
// Remember: strings are immutable — original is never changed.


const raw        = "  Abdullah Al Noman  ";
const mixedCase  = "jAvAsCrIpT iS fUn";

// ---- toUpperCase() / toLowerCase() ----
console.log(mixedCase.toUpperCase());          // "JAVASCRIPT IS FUN"
console.log(mixedCase.toLowerCase());          // "javascript is fun"

// Common use: case-insensitive comparison
const userInput = "NOMAN";
const storedName = "noman";

if (userInput.toLowerCase() === storedName.toLowerCase()) {
  console.log("Names match");      // "Names match"
}

// Capitalize first letter (no built-in method — build it yourself)
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

console.log(capitalize("jAvAsCrIpT"));  // "Javascript"
console.log(capitalize("noman"));       // "Noman"


// ---- trim() / trimStart() / trimEnd() ----
// Remove whitespace (spaces, tabs, newlines) from the edges.
// trim()      — removes from BOTH sides
// trimStart() — removes from the LEFT only (also called trimLeft)
// trimEnd()   — removes from the RIGHT only (also called trimRight)

console.log(raw);                          // "  Abdullah Al Noman  "
console.log(raw.trim());                   // "Abdullah Al Noman"
console.log(raw.trimStart());              // "Abdullah Al Noman  "
console.log(raw.trimEnd());                // "  Abdullah Al Noman"

// Real-world use: clean up form input before using it
function processInput(input) {
  const cleaned = input.trim().toLowerCase();
  console.log(`Processed: "${cleaned}"`);
}

processInput("  NOMAN  ");                 // Processed: "noman"
processInput("\t  hello \n");              // Processed: "hello"




// >>>>>>>>>>>>>>>>>>>>>>  2.4 Searching  <<<<<<<<<<<<<<<<<<<<
// These methods check whether a string contains certain content,
// where it starts/ends, or at which position something appears.


const bio2   = "Abdullah Al Noman studies at KUET, Software Engineering.";
const email  = "noman@kuet.ac.bd";
const path   = "C:/users/noman/documents/notes.txt";


// ---- includes(searchString) ----
// Returns true if the string contains the search text, false otherwise.
// Case-sensitive.

console.log(bio2.includes("KUET"));            // true
console.log(bio2.includes("kuet"));            // false  (case-sensitive)
console.log(bio2.includes("Noman"));           // true
console.log(bio2.includes("Physics"));         // false

// Use case: check if an email has the @ sign
console.log(email.includes("@"));              // true

// includes with a start position (optional second argument)
console.log(bio2.includes("Al", 5));           // true  (search starts from index 5)
console.log(bio2.includes("Abdullah", 5));     // false (search starts at 5, misses it)


// ---- startsWith(prefix) / endsWith(suffix) ----
// Check the beginning or end of a string.

console.log(email.startsWith("noman"));        // true
console.log(email.startsWith("admin"));        // false

console.log(path.endsWith(".txt"));            // true
console.log(path.endsWith(".pdf"));            // false
console.log(email.endsWith(".bd"));            // true

// Optional length argument: treat the string as if it's only N chars long
const url = "https://kuet.ac.bd/page";
console.log(url.startsWith("https"));          // true
console.log(url.endsWith("kuet.ac.bd", 20));   // true  (checks first 20 chars only)


// ---- indexOf(searchString) ----
// Returns the INDEX of the FIRST occurrence of the search text.
// Returns -1 if not found.

const sentence = "Noman loves JavaScript. Noman is great.";

console.log(sentence.indexOf("Noman"));        // 0   — found at index 0
console.log(sentence.indexOf("loves"));        // 6
console.log(sentence.indexOf("Python"));       // -1  — not found

// Check if something exists (alternative to includes)
if (sentence.indexOf("JavaScript") !== -1) {
  console.log("JavaScript found");             // "JavaScript found"
}

// indexOf with a start position — skip the first match, find the next
console.log(sentence.indexOf("Noman", 1));     // 24  — skips the first "Noman" at 0


// ---- lastIndexOf(searchString) ----
// Same as indexOf but finds the LAST occurrence (searches from the end).

console.log(sentence.lastIndexOf("Noman"));    // 24  — the second "Noman"
console.log(sentence.lastIndexOf("o"));        // 35  — the very last 'o' in the string

// Use case: find the last slash in a file path
const filePath = "C:/users/noman/projects/app.js";
const lastSlash = filePath.lastIndexOf("/");
const fileName  = filePath.slice(lastSlash + 1);
console.log(fileName);                         // "app.js"




// >>>>>>>>>>>>>>>>>>>>>>  2.5 Extracting Parts  <<<<<<<<<<<<<
// Extract a piece of a string without changing the original.
// Both methods return a new string.


const fullName  = "Abdullah Al Noman";
const alphabet  = "abcdefghijklmnopqrstuvwxyz";

// ---- slice(start, end) ----
// Extracts from index 'start' up to BUT NOT including index 'end'.
// If you omit 'end', it goes all the way to the last character.
// Accepts NEGATIVE indices (counts from the end of the string).

console.log(fullName.slice(0, 8));             // "Abdullah"  — chars 0 to 7
console.log(fullName.slice(9, 11));            // "Al"
console.log(fullName.slice(12));               // "Noman"     — from 12 to end
console.log(fullName.slice(-5));               // "Noman"     — last 5 chars
console.log(fullName.slice(-5, -2));           // "Nom"       — negative range

// Common patterns
const str2 = "Hello, World!";
console.log(str2.slice(7));                    // "World!"
console.log(str2.slice(0, 5));                 // "Hello"
console.log(str2.slice(-6));                   // "World!"

// Remove first N characters
console.log("###Noman".slice(3));              // "Noman"

// Remove last N characters
console.log("Noman!!!".slice(0, -3));          // "Noman"


// ---- substring(start, end) ----
// Similar to slice, but does NOT support negative indices.
// If start > end, it swaps them automatically (unlike slice).

console.log(fullName.substring(0, 8));         // "Abdullah"
console.log(fullName.substring(12));           // "Noman"
console.log(fullName.substring(12, 9));        // "Al "  — swapped (9 to 12)

// When to use which:
// - Use slice()     → handles negative indices, more predictable
// - Use substring() → if you explicitly want the swap behavior


// ---- Comparing slice vs substring with negative values ----
const test = "JavaScript";
console.log(test.slice(-6));                   // "Script"  — last 6 chars
console.log(test.substring(-6));               // "JavaScript" — negatives treated as 0




// >>>>>>>>>>>>>>>>>>>>>>  2.6 Replacing  <<<<<<<<<<<<<<<<<<<<
// Replace parts of a string with new content.
// The original string is never changed — you get a new string back.


const greeting  = "Hello, World! Hello, JavaScript!";
const messy     = "  too   many   spaces  ";

// ---- replace(search, replacement) ----
// Replaces only the FIRST match.

console.log(greeting.replace("Hello", "Hi"));
// "Hi, World! Hello, JavaScript!"  — only first "Hello" replaced

console.log(greeting.replace("World", "Noman"));
// "Hello, Noman! Hello, JavaScript!"

// Using a RegEx to replace ALL matches (old way, before replaceAll existed)
console.log(greeting.replace(/Hello/g, "Hi"));
// "Hi, World! Hi, JavaScript!"  — /g flag = global (all matches)

// Case-insensitive replacement with RegEx
console.log("HELLO world".replace(/hello/i, "Hi"));
// "Hi world"  — /i flag = case-insensitive


// ---- replaceAll(search, replacement) ----
// Replaces ALL occurrences. Simpler than using /g regex.

console.log(greeting.replaceAll("Hello", "Hi"));
// "Hi, World! Hi, JavaScript!"

console.log("a-b-c-d".replaceAll("-", "_"));
// "a_b_c_d"

// Common use: clean up a string with extra spaces
// (replace multiple spaces with one — requires regex)
console.log(messy.trim().replace(/\s+/g, " "));
// "too many spaces"


// ---- Chaining replacements ----
// You can chain multiple replace calls since each returns a new string.

const dirty = "  Hello,   World!  ";
const clean = dirty.trim().replace(/\s+/g, " ").toLowerCase();
console.log(clean);                            // "hello, world!"

// Real-world example: create a URL slug from a title
function createSlug(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")   // remove non-alphanumeric (except space)
    .replace(/\s+/g, "-");          // replace spaces with hyphens
}

console.log(createSlug("  JavaScript is Awesome!  "));
// "javascript-is-awesome"

console.log(createSlug("Top 10 Tips for KUET Students"));
// "top-10-tips-for-kuet-students"




// >>>>>>>>>>>>>>>>>>>>>>  2.7 Splitting & Joining  <<<<<<<<<<
// split() converts a string into an array.
// join() converts an array back into a string.
// They are opposites — use them together frequently.


const csv       = "Noman,Rahim,Karim,Jamal,Sumon";
const sentence3 = "JavaScript is the language of the web";
const filePath2 = "C:/users/noman/documents/notes.txt";

// ---- split(separator) ----
// Splits the string at every occurrence of the separator.
// Returns an ARRAY of the pieces.

const names = csv.split(",");
console.log(names);
// ["Noman", "Rahim", "Karim", "Jamal", "Sumon"]

const words = sentence3.split(" ");
console.log(words);
// ["JavaScript", "is", "the", "language", "of", "the", "web"]
console.log(words.length);                     // 7

const pathParts = filePath2.split("/");
console.log(pathParts);
// ["C:", "users", "noman", "documents", "notes.txt"]

// Get the last segment of a path
console.log(pathParts[pathParts.length - 1]);   // "notes.txt"
console.log(pathParts.at(-1));                  // "notes.txt"

// Split into individual characters
const letters = "Hello".split("");
console.log(letters);                           // ["H", "e", "l", "l", "o"]

// Split with a limit (stops after N pieces)
console.log(csv.split(",", 3));                 // ["Noman", "Rahim", "Karim"]

// Split by empty string — char array
console.log("abc".split(""));                   // ["a", "b", "c"]

// Split with no separator — returns the whole string in an array
console.log("abc".split());                     // ["abc"]


// ---- join(separator) — the ARRAY method, paired with split ----
// Joins array items into a single string, inserting the separator between them.

const nameArray = ["Abdullah", "Al", "Noman"];
console.log(nameArray.join(" "));               // "Abdullah Al Noman"
console.log(nameArray.join("-"));               // "Abdullah-Al-Noman"
console.log(nameArray.join(""));                // "AbdullahAlNoman"
console.log(nameArray.join(", "));              // "Abdullah, Al, Noman"


// ---- Practical: split → transform → join (very common pattern) ----

// Capitalize every word in a sentence
function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

console.log(titleCase("software engineering at kuet"));
// "Software Engineering At Kuet"

// Reverse a string using split → reverse → join
function reverseString(s) {
  return s.split("").reverse().join("");
}

console.log(reverseString("Noman"));            // "namon"
console.log(reverseString("JavaScript"));       // "tpircSavaJ"

// Count word occurrences
function countWords(text) {
  const wordList = text.toLowerCase().split(" ");
  const freq = {};
  for (const w of wordList) {
    freq[w] = (freq[w] || 0) + 1;
  }
  return freq;
}

const sample = "the cat sat on the mat and the cat";
console.log(countWords(sample));
// { the: 3, cat: 2, sat: 1, on: 1, mat: 1, and: 1 }




// >>>>>>>>>>>>>>>>>>>>>>  2.8 Padding & Repeating  <<<<<<<<<<
// padStart and padEnd add characters to make a string reach a target length.
// repeat creates multiple copies of a string.
// All very useful for formatting output.


// ---- padStart(targetLength, padString) ----
// Adds padding to the LEFT until the string reaches targetLength.
// Default pad character is a space.

console.log("5".padStart(3, "0"));             // "005"
console.log("42".padStart(5, "0"));            // "00042"
console.log("hi".padStart(6));                 // "    hi"  — spaces by default

// Real use: format numbers with leading zeros (invoice IDs, roll numbers, time)
const rollNo = 7;
console.log(`KUET-CSE-${String(rollNo).padStart(4, "0")}`);
// "KUET-CSE-0007"

// Clock formatting
const hours   = 9;
const minutes = 5;
const seconds = 3;
const clock   = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
console.log(clock);                            // "09:05:03"

// Right-align text in a fixed-width column
const items = ["Noman", "Rahim", "Abdullah Al Noman"];
for (const item of items) {
  console.log(item.padStart(25, "."));
}
// "....................Noman"
// "....................Rahim"
// ".......Abdullah Al Noman"


// ---- padEnd(targetLength, padString) ----
// Adds padding to the RIGHT.

console.log("hi".padEnd(6));                   // "hi    "
console.log("Noman".padEnd(10, "."));          // "Noman....."
console.log("left".padEnd(10, "-"));           // "left------"

// Left-align text in a fixed-width column
const subjects = ["Math", "Physics", "Computer Science", "English"];
const scores   = [90, 85, 97, 78];

for (let i = 0; i < subjects.length; i++) {
  console.log(`${subjects[i].padEnd(20, " ")} ${scores[i]}`);
}
// "Math                 90"
// "Physics              85"
// "Computer Science     97"
// "English              78"


// ---- repeat(count) ----
// Returns the string repeated 'count' times.

console.log("Ha".repeat(3));                   // "HaHaHa"
console.log("-".repeat(40));                   // "----------------------------------------"
console.log("* ".repeat(5));                   // "* * * * * "

// Build a simple progress bar
function progressBar(percent, width = 20) {
  const filled  = Math.round((percent / 100) * width);
  const empty   = width - filled;
  return `[${"=".repeat(filled)}${" ".repeat(empty)}] ${percent}%`;
}

console.log(progressBar(0));                   // "[                    ] 0%"
console.log(progressBar(50));                  // "[==========          ] 50%"
console.log(progressBar(100));                 // "[====================] 100%"

// Indent lines with repeat
function indent(text, level) {
  return "  ".repeat(level) + text;
}

console.log(indent("Section", 0));             // "Section"
console.log(indent("Sub-section", 1));         // "  Sub-section"
console.log(indent("Detail", 2));              // "    Detail"




// >>>>>>>>>>>>>>>>>>>>>>  2.9 Character Codes  <<<<<<<<<<<<<
// Every character has a numeric code (Unicode / ASCII).
// These methods let you convert between characters and their codes.
// Useful for: encryption basics, sorting, validation, encoding.


const letter = "A";
const lower  = "a";
const noman  = "Noman";

// ---- charCodeAt(index) ----
// Returns the UTF-16 code (number) of the character at that index.

console.log(letter.charCodeAt(0));             // 65   — 'A' is code 65
console.log(lower.charCodeAt(0));              // 97   — 'a' is code 97
console.log("0".charCodeAt(0));                // 48   — '0' is code 48
console.log(" ".charCodeAt(0));                // 32   — space is code 32
console.log(noman.charCodeAt(0));              // 78   — 'N' is code 78

// Useful pattern: check if a character is uppercase
function isUpperCase(char) {
  const code = char.charCodeAt(0);
  return code >= 65 && code <= 90;   // A=65 Z=90
}

function isLowerCase(char) {
  const code = char.charCodeAt(0);
  return code >= 97 && code <= 122;  // a=97 z=122
}

function isDigit(char) {
  const code = char.charCodeAt(0);
  return code >= 48 && code <= 57;   // 0=48 9=57
}

console.log(isUpperCase("N"));       // true
console.log(isUpperCase("n"));       // false
console.log(isLowerCase("o"));       // true
console.log(isDigit("5"));           // true
console.log(isDigit("a"));           // false


// ---- codePointAt(index) ----
// Like charCodeAt, but handles characters beyond the basic unicode plane.
// (Emoji and rare characters have code points above 65535.)

console.log("A".codePointAt(0));               // 65
console.log("😊".codePointAt(0));              // 128522  — emoji code point


// ---- String.fromCharCode(code) ----
// The REVERSE of charCodeAt.
// Takes a numeric code and returns the character.

console.log(String.fromCharCode(65));          // "A"
console.log(String.fromCharCode(97));          // "a"
console.log(String.fromCharCode(48));          // "0"
console.log(String.fromCharCode(65, 66, 67));  // "ABC"  — multiple codes at once

// Build the alphabet
let alphabet2 = "";
for (let i = 65; i <= 90; i++) {
  alphabet2 += String.fromCharCode(i);
}
console.log(alphabet2);                        // "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Simple Caesar cipher (shift each letter by N positions)
function caesarEncrypt(text, shift) {
  return text
    .split("")
    .map(char => {
      const code = char.charCodeAt(0);
      if (code >= 65 && code <= 90) {       // uppercase
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      if (code >= 97 && code <= 122) {      // lowercase
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      return char;                           // non-letter stays unchanged
    })
    .join("");
}

function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, 26 - shift);   // reverse by shifting in the other direction
}

const original  = "Hello Noman";
const encrypted = caesarEncrypt(original, 3);
const decrypted = caesarDecrypt(encrypted, 3);

console.log(original);                         // "Hello Noman"
console.log(encrypted);                        // "Khoor Qrpdq"
console.log(decrypted);                        // "Hello Noman"




// >>>>>>>>>>>>>>>>>>>>>>  QUICK REFERENCE  <<<<<<<<<<<<<<<<<<<
//
//  Method                    What it does
//  ─────────────────────────────────────────────────────────────────────
//  str.length                Number of characters
//  str[i]  /  str.at(i)     Character at index i  (at() supports negatives)
//  str.toUpperCase()         All characters uppercase
//  str.toLowerCase()         All characters lowercase
//  str.trim()                Remove spaces from both ends
//  str.trimStart()           Remove spaces from left only
//  str.trimEnd()             Remove spaces from right only
//  str.includes(s)           Does str contain s? Returns true/false
//  str.startsWith(s)         Does str begin with s? Returns true/false
//  str.endsWith(s)           Does str end with s? Returns true/false
//  str.indexOf(s)            Position of first s in str, -1 if not found
//  str.lastIndexOf(s)        Position of last s in str, -1 if not found
//  str.slice(start, end)     Extract from start to end (supports negatives)
//  str.substring(start, end) Extract from start to end (no negatives)
//  str.charAt(i)             Character at index i (returns "" if out of range)
//  str.replace(a, b)         Replace first occurrence of a with b
//  str.replaceAll(a, b)      Replace every occurrence of a with b
//  str.split(sep)            Split into array at each sep
//  str.padStart(n, ch)       Pad left with ch until length is n
//  str.padEnd(n, ch)         Pad right with ch until length is n
//  str.repeat(n)             Repeat the string n times
//  str.charCodeAt(i)         Unicode code of character at i
//  str.codePointAt(i)        Full Unicode code point (handles emoji)
//  String.fromCharCode(n)    Character from numeric code
//  ─────────────────────────────────────────────────────────────────────
//  IMPORTANT: None of these methods modifies the original string.
//             They all return a NEW string.
