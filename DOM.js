// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//           JAVASCRIPT — SECTION 10: DOM & BROWSER
//           Author: Abdullah Al Noman
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//   10.1  Selecting Elements   (getElementById, querySelector...)
//   10.2  Manipulating Elements (text, style, classList, create...)
//   10.3  Events               (listeners, event object, delegation)
//
// NOTE: DOM code runs in the BROWSER, not in Node.js.
//       Link this file to an HTML page to see it work.
//       Example HTML structure assumed throughout this file:
//
//   <body>
//     <h1 id="main-title">Hello World</h1>
//     <p id="intro" class="text">Welcome to my site.</p>
//     <ul id="student-list">
//       <li class="student">Noman</li>
//       <li class="student">Rahim</li>
//       <li class="student">Karim</li>
//     </ul>
//     <button id="btn">Click Me</button>
//     <input id="name-input" type="text" placeholder="Enter name" />
//     <form id="my-form">
//       <input type="text" name="username" />
//       <button type="submit">Submit</button>
//     </form>
//     <div id="box" class="card active">A box</div>
//     <div id="parent">
//       <button class="action-btn">Button 1</button>
//       <button class="action-btn">Button 2</button>
//       <button class="action-btn">Button 3</button>
//     </div>
//   </body>
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// >>>>>>>>>>>>>>>>>>>>>>  10.1 Selecting Elements  <<<<<<<<<<
// The DOM (Document Object Model) is a tree of every element on your page.
// JS can read and change any element by first finding (selecting) it.
// There are several ways to select elements — each has its use case.
//
//   - getElementById()
//   - querySelector() / querySelectorAll()
//   - getElementsByClassName() / getElementsByTagName()


// ---- getElementById() ----
// The fastest and most direct way to grab ONE element by its id attribute.
// Returns the element, or null if nothing with that id exists.

const title = document.getElementById("main-title");
console.log(title);              // <h1 id="main-title">Hello World</h1>
console.log(title.textContent);  // "Hello World"

const btn = document.getElementById("btn");
console.log(btn);                // <button id="btn">Click Me</button>

// If the id does not exist, you get null
const missing = document.getElementById("does-not-exist");
console.log(missing);            // null


// ---- querySelector() ----
// Selects the FIRST element that matches a CSS selector.
// You can use any CSS selector: tag, class, id, attribute, pseudo-class, etc.
// Returns the element, or null if nothing matches.

const intro     = document.querySelector("#intro");          // by id
const firstItem = document.querySelector(".student");        // by class (first match)
const heading   = document.querySelector("h1");              // by tag name
const input     = document.querySelector("input[type='text']"); // by attribute
const firstBtn  = document.querySelector("#parent .action-btn"); // nested selector

console.log(intro.textContent);  // "Welcome to my site."
console.log(firstItem.textContent); // "Noman"


// ---- querySelectorAll() ----
// Selects ALL elements that match the CSS selector.
// Returns a NodeList (similar to an array — you can loop over it).

const allStudents = document.querySelectorAll(".student");
console.log(allStudents.length); // 3

// Loop with forEach — NodeList supports forEach directly
allStudents.forEach((el, index) => {
  console.log(`Student ${index + 1}: ${el.textContent}`);
});
// "Student 1: Noman"
// "Student 2: Rahim"
// "Student 3: Karim"

// Loop with for...of
for (let student of allStudents) {
  console.log(student.textContent);
}

// Convert to a real array if you need array methods like .map() or .filter()
const studentArray = Array.from(allStudents);
const names = studentArray.map(el => el.textContent);
console.log(names);              // ["Noman", "Rahim", "Karim"]


// ---- getElementsByClassName() ----
// Selects all elements with a specific class name.
// Returns an HTMLCollection (live — updates automatically if the DOM changes).
// Less flexible than querySelectorAll — no complex CSS selectors.

const byClass = document.getElementsByClassName("student");
console.log(byClass.length);     // 3
console.log(byClass[0].textContent); // "Noman"

// Note: HTMLCollection does NOT support forEach directly — convert first
Array.from(byClass).forEach(el => console.log(el.textContent));


// ---- getElementsByTagName() ----
// Selects all elements with a specific HTML tag name.
// Also returns an HTMLCollection.

const allLis = document.getElementsByTagName("li");
console.log(allLis.length);      // 3

const allButtons = document.getElementsByTagName("button");
console.log(allButtons.length);  // 4 (btn + 3 action-btn + submit)




// >>>>>>>>>>>>>>>>>>>>>>  10.2 Manipulating Elements  <<<<<<<
// Once you have selected an element, you can read and change
// its text, HTML, styles, classes, attributes, and structure.
//
//   - innerText / innerHTML / textContent
//   - style property
//   - classList: add / remove / toggle / contains
//   - setAttribute() / getAttribute()
//   - createElement() / appendChild() / prepend()
//   - remove() / replaceWith()


// ---- innerText / innerHTML / textContent ----
// These three all deal with the content of an element, but differ importantly.
//
//   textContent → raw text only, ignores all HTML tags, fastest
//   innerText   → visible text only, respects CSS (hidden text is excluded)
//   innerHTML   → full HTML string including tags, can inject new elements

const introEl = document.querySelector("#intro");

// Read content
console.log(introEl.textContent); // "Welcome to my site."
console.log(introEl.innerText);   // "Welcome to my site."
console.log(introEl.innerHTML);   // "Welcome to my site."

// Write content
introEl.textContent = "Updated with textContent.";   // plain text — safe
introEl.innerText   = "Updated with innerText.";     // respects CSS visibility
introEl.innerHTML   = "Updated with <strong>innerHTML</strong>."; // renders the HTML tag

// Warning: never put user input directly into innerHTML — it can allow script injection
// Use textContent when the content is plain text from a user


// ---- style property ----
// Read or set individual CSS styles directly on an element.
// Property names use camelCase in JS (background-color → backgroundColor)

const titleEl = document.querySelector("#main-title");

titleEl.style.color           = "navy";
titleEl.style.fontSize        = "36px";
titleEl.style.backgroundColor = "#f0f0f0";
titleEl.style.padding         = "10px 20px";
titleEl.style.borderRadius    = "8px";

// Read a style that was set inline
console.log(titleEl.style.color); // "navy"

// Note: style only reads/writes INLINE styles
// To read computed CSS (from a stylesheet), use getComputedStyle()
const computed = window.getComputedStyle(titleEl);
console.log(computed.fontSize);   // whatever font-size is applied from any source


// ---- classList: add / remove / toggle / contains ----
// The cleanest way to manage CSS classes on an element.
// Much better than manipulating className as a string.

const box = document.querySelector("#box");

// Add a class
box.classList.add("highlight");
box.classList.add("rounded", "shadow");  // add multiple at once

// Remove a class
box.classList.remove("active");

// Toggle — adds the class if absent, removes it if present
box.classList.toggle("hidden");          // adds "hidden"
box.classList.toggle("hidden");          // removes "hidden"

// Check if a class exists
console.log(box.classList.contains("card"));      // true
console.log(box.classList.contains("active"));    // false (we removed it)

// Practical use — toggle a dark mode class on the body
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};


// ---- setAttribute() / getAttribute() / removeAttribute() ----
// Read or set any HTML attribute (id, class, href, src, type, disabled, etc.)

const nameInput = document.querySelector("#name-input");

// Get an attribute value
console.log(nameInput.getAttribute("type"));        // "text"
console.log(nameInput.getAttribute("placeholder")); // "Enter name"

// Set an attribute — adds it if it doesn't exist, updates if it does
nameInput.setAttribute("placeholder", "Type your full name...");
nameInput.setAttribute("maxlength", "50");
nameInput.setAttribute("disabled", "");              // disabled attribute

// Remove an attribute
nameInput.removeAttribute("disabled");               // enables the input again

// hasAttribute check
console.log(nameInput.hasAttribute("maxlength"));   // true
console.log(nameInput.hasAttribute("readonly"));    // false

// data-* attributes — store custom data on elements
// <div data-user-id="42" data-role="admin"> ... </div>
// const card = document.querySelector("[data-user-id]");
// console.log(card.dataset.userId);    // "42"   (data- prefix is stripped, camelCase)
// console.log(card.dataset.role);      // "admin"


// ---- createElement() / appendChild() / prepend() / insertAdjacentElement() ----
// Create brand new elements and insert them into the page.

const studentList = document.querySelector("#student-list");

// Create a new element
const newItem     = document.createElement("li");
newItem.textContent = "Sadia";
newItem.classList.add("student");

// appendChild — adds to the END of the parent
studentList.appendChild(newItem);

// prepend — adds to the BEGINNING of the parent
const firstItem2  = document.createElement("li");
firstItem2.textContent = "Abdullah";
firstItem2.classList.add("student");
studentList.prepend(firstItem2);

// insertAdjacentElement — precise position control
//   "beforebegin" → before the element itself
//   "afterbegin"  → first child inside the element
//   "beforeend"   → last child inside the element (same as appendChild)
//   "afterend"    → after the element itself
const anotherItem = document.createElement("li");
anotherItem.textContent = "Fatima";
anotherItem.classList.add("student");
studentList.insertAdjacentElement("beforeend", anotherItem);

// Build a complete element structure at once using innerHTML
const card = document.createElement("div");
card.classList.add("profile-card");
card.innerHTML = `
  <h2>Abdullah Al Noman</h2>
  <p>Department: Software Engineering</p>
  <p>CGPA: 3.94</p>
`;
document.body.appendChild(card);


// ---- remove() / replaceWith() ----
// Remove an element from the page, or swap it with another.

// remove() — deletes the element from the DOM entirely
const removeTarget = document.querySelector("#intro");
// removeTarget.remove();   // uncomment to delete the intro paragraph

// replaceWith() — replaces the element with something else
const newHeading = document.createElement("h2");
newHeading.textContent = "Replaced Heading";
// title.replaceWith(newHeading); // swap the h1 for this h2




// >>>>>>>>>>>>>>>>>>>>>>  10.3 Events  <<<<<<<<<<<<<<<<<<<<<<<
// Events are things that happen in the browser — a user clicks, types,
// submits a form, moves the mouse, or the page finishes loading.
// You can react to these events by attaching a listener function.
//
//   - addEventListener()
//   - Common events
//   - Event object (e.target, e.preventDefault)
//   - Event bubbling & capturing
//   - Event delegation


// ---- addEventListener() ----
// attach a function that runs when a specific event happens on an element.
// Syntax: element.addEventListener("eventName", callbackFunction)
// You can attach multiple listeners to the same element — they all run.

const clickBtn = document.querySelector("#btn");

clickBtn.addEventListener("click", function () {
  console.log("Button was clicked!");
});

// Using an arrow function
clickBtn.addEventListener("click", () => {
  clickBtn.textContent = "Clicked!";
  clickBtn.style.backgroundColor = "green";
});

// Remove a listener — you must pass the exact same function reference
function handleClick() {
  console.log("Removable handler ran.");
}
clickBtn.addEventListener("click", handleClick);
clickBtn.removeEventListener("click", handleClick); // now removed


// ---- Common events ----
// click        → user clicks an element
// dblclick     → user double-clicks
// input        → value inside an input changes (fires on every keystroke)
// change       → value changes and the input loses focus
// submit       → a form is submitted
// keydown      → a key is pressed down (fires repeatedly if held)
// keyup        → a key is released
// mouseover    → mouse enters an element
// mouseout     → mouse leaves an element
// load         → the page (or image) has fully loaded
// DOMContentLoaded → HTML is parsed and ready (before images/styles load)

// input event — react as the user types
const nameInputEl = document.querySelector("#name-input");
nameInputEl.addEventListener("input", (e) => {
  console.log("Current value:", e.target.value);
});

// keydown event — detect which key was pressed
nameInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("Enter pressed! Value:", e.target.value);
  }
  if (e.key === "Escape") {
    nameInputEl.value = "";          // clear the input on Escape
  }
});

// mouseover / mouseout
const boxEl = document.querySelector("#box");
boxEl.addEventListener("mouseover", () => {
  boxEl.style.backgroundColor = "lightblue";
});
boxEl.addEventListener("mouseout", () => {
  boxEl.style.backgroundColor = "";  // reset to original
});

// DOMContentLoaded — wait for the DOM to be ready before running JS
// This is especially useful when your script tag is in the <head>
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is fully loaded and ready.");
});

// load — fires when EVERYTHING is loaded (images, stylesheets, scripts)
window.addEventListener("load", () => {
  console.log("Full page loaded.");
});


// ---- Event object (e.target, e.preventDefault) ----
// Every event listener automatically receives an event object as its first argument.
// It contains details about what happened: which element, which key, mouse position, etc.
// By convention this parameter is named e or event.

clickBtn.addEventListener("click", (e) => {
  console.log("Event type  :", e.type);          // "click"
  console.log("Target el   :", e.target);        // the element that was clicked
  console.log("Target id   :", e.target.id);     // "btn"
  console.log("Target text :", e.target.textContent);
  console.log("Mouse X     :", e.clientX);       // horizontal position of the click
  console.log("Mouse Y     :", e.clientY);       // vertical position of the click
});

// e.preventDefault() — stops the browser's default behaviour
// Most commonly used on form submit and anchor links
const form = document.querySelector("#my-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();                // stops the page from reloading on submit
  const usernameInput = form.querySelector("input[name='username']");
  console.log("Form submitted! Username:", usernameInput.value);
});

// e.stopPropagation() — stops the event from bubbling up (see below)


// ---- Event bubbling & capturing ----
// When you click an element, the event does not stay on that element.
// It BUBBLES UP through the DOM tree — the parent, grandparent, etc. all hear it.
//
// Bubbling  (default) — event starts at the target and goes UP to document
// Capturing (optional) — event starts at document and goes DOWN to the target
//
// Visualise this HTML:
//   <div id="grandparent">
//     <div id="parent">
//       <button id="child">Click</button>
//     </div>
//   </div>

// All three listeners below will fire when the button is clicked,
// in the order: child → parent → grandparent (bubbling, bottom to top)

// document.querySelector("#child").addEventListener("click", () => {
//   console.log("child clicked");
// });
// document.querySelector("#parent-div").addEventListener("click", () => {
//   console.log("parent heard it");
// });
// document.querySelector("#grandparent").addEventListener("click", () => {
//   console.log("grandparent heard it");
// });

// To use CAPTURING mode instead, pass true as the third argument
// document.querySelector("#grandparent").addEventListener("click", () => {
//   console.log("grandparent (capture phase)");
// }, true);

// To stop bubbling — call e.stopPropagation() inside the child listener
// document.querySelector("#child").addEventListener("click", (e) => {
//   e.stopPropagation();   // parent and grandparent will NOT hear this event
//   console.log("child only");
// });


// ---- Event delegation ----
// Instead of attaching a listener to every single child element,
// attach ONE listener to the parent and check which child was clicked.
//
// Benefits:
//   - Works for elements added to the DOM AFTER the listener is set up
//   - Much more efficient when there are many child elements

const parent = document.querySelector("#parent");

// One listener on the parent handles clicks on any child button
parent.addEventListener("click", (e) => {
  // check that the clicked element is actually one of our action buttons
  if (e.target.classList.contains("action-btn")) {
    console.log("Clicked button text:", e.target.textContent);
    e.target.style.backgroundColor = "coral"; // highlight only the clicked one
  }
});

// Now even if we add a NEW button later, it is automatically covered
const newBtn = document.createElement("button");
newBtn.classList.add("action-btn");
newBtn.textContent = "Button 4 (added later)";
parent.appendChild(newBtn);
// Clicking "Button 4" will still trigger the parent listener — no extra code needed

// Practical pattern — a todo list where items are added and removed dynamically
const makeList = () => {
  const list = document.createElement("ul");
  list.id    = "todo-list";
  document.body.appendChild(list);

  // Add item
  const addItem = (text) => {
    const li  = document.createElement("li");
    const span = document.createElement("span");
    const del = document.createElement("button");
    span.textContent = text;
    del.textContent  = "Delete";
    del.dataset.role = "delete";
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  };

  // One delegated listener handles ALL delete buttons, even future ones
  list.addEventListener("click", (e) => {
    if (e.target.dataset.role === "delete") {
      e.target.closest("li").remove();
    }
  });

  addItem("Study JavaScript");
  addItem("Build a project");
  addItem("Push to GitHub");
};

makeList();
