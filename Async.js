// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//       JAVASCRIPT — SECTION 9: ASYNCHRONOUS JAVASCRIPT
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//
//   9.1  How JS handles async  (call stack, event loop, timers)
//   9.2  Promises              (create, .then/.catch, chaining, combinators)
//   9.3  Async / Await         (async fn, await, try/catch)
//   9.4  Fetch API             (GET, POST, PUT, DELETE, error handling)
//
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// >>>>>>>>>>>>>>>>>>>>>>  9.1 How JS Handles Async  <<<<<<<<<
// JavaScript runs on a single thread — it can only do one thing at a time.
// But it can START a slow task (like a network request or a timer),
// hand it off to the browser, and continue running other code.
// When that slow task finishes, its result gets queued and run later.
// This is what makes JS "asynchronous".
//
//   - Call stack & event loop
//   - setTimeout() / setInterval()
//   - Microtask queue vs callback queue


// ---- Call stack & event loop ----
// The call stack is where JS keeps track of what function is currently running.
// Functions are pushed on when called, and popped off when they return.
//
// The event loop watches two queues:
//   Microtask queue  → Promise callbacks (.then, .catch, async/await)
//   Callback queue   → Timer callbacks (setTimeout, setInterval, DOM events)
//
// Order of execution:
//   1. Run all synchronous code (the script itself)
//   2. Drain the entire microtask queue (all Promise callbacks)
//   3. Take ONE item from the callback queue and run it
//   4. Drain microtasks again
//   5. Repeat

console.log("1 — start");           // runs first (synchronous)

setTimeout(() => {
  console.log("3 — setTimeout");    // runs last (callback queue)
}, 0);

Promise.resolve().then(() => {
  console.log("2 — Promise.then");  // runs second (microtask queue)
});

console.log("1 — end");             // still synchronous, runs before anything async
// Output order: "1 — start", "1 — end", "2 — Promise.then", "3 — setTimeout"
// Even though setTimeout delay is 0ms, the Promise still goes first!


// ---- setTimeout() / setInterval() ----
// setTimeout  → runs a function ONCE after a delay (in milliseconds)
// setInterval → runs a function REPEATEDLY every X milliseconds

// setTimeout — run once after 2 seconds
setTimeout(() => {
  console.log("Ran after 2 seconds");
}, 2000);

// You can cancel a timeout before it fires using clearTimeout()
const timerId = setTimeout(() => {
  console.log("This will NEVER run");
}, 5000);
clearTimeout(timerId);             // cancels it before 5s passes

// setInterval — run every 1 second
let tickCount = 0;
const intervalId = setInterval(() => {
  tickCount++;
  console.log("Tick:", tickCount);
  if (tickCount === 3) {
    clearInterval(intervalId);     // stop after 3 ticks
    console.log("Interval stopped.");
  }
}, 1000);

// Practical use — delayed welcome message
setTimeout(() => {
  console.log("Welcome back, Noman! Session loaded.");
}, 1000);


// ---- Microtask queue vs callback queue ----
// Both queues hold code that is waiting to run after the current synchronous code.
// The key difference: microtasks (Promises) ALWAYS run before timer callbacks.

console.log("Sync: A");

setTimeout(() => console.log("Callback queue: B"), 0);

Promise.resolve()
  .then(() => console.log("Microtask queue: C"))
  .then(() => console.log("Microtask queue: D"));  // chained .then is also a microtask

console.log("Sync: E");

// Output:
// "Sync: A"
// "Sync: E"
// "Microtask queue: C"
// "Microtask queue: D"
// "Callback queue: B"   ← timer goes last, even at 0ms delay




// >>>>>>>>>>>>>>>>>>>>>>  9.2 Promises  <<<<<<<<<<<<<<<<<<<<
// A Promise is an object that represents the result of an async operation.
// It is in one of 3 states:
//   pending   → the work is still happening
//   fulfilled → the work finished successfully (resolve was called)
//   rejected  → the work failed (reject was called)
//
//   - Creating a Promise
//   - .then() / .catch() / .finally()
//   - Promise chaining
//   - Promise.all() / race() / allSettled()


// ---- Creating a Promise ----
// You create a Promise with new Promise() and pass it an executor function.
// The executor receives two callbacks: resolve (success) and reject (failure).
// Call resolve(value) when done, reject(error) when something went wrong.

const myFirstPromise = new Promise((resolve, reject) => {
  // simulate async work — imagine fetching data or reading a file
  let success = true;

  if (success) {
    resolve("Data loaded successfully!");
  } else {
    reject(new Error("Something went wrong while loading data."));
  }
});

// Simulate a delayed async task
function fetchScore(studentName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const scores = { Noman: 95, Rahim: 82, Karim: 67 };
      const score  = scores[studentName];

      if (score !== undefined) {
        resolve({ name: studentName, score });
      } else {
        reject(new Error(`Student "${studentName}" not found.`));
      }
    }, 1000);                      // simulates a 1 second delay
  });
}


// ---- .then() / .catch() / .finally() ----
// .then(fn)    → runs when the Promise resolves (success)
// .catch(fn)   → runs when the Promise rejects (failure)
// .finally(fn) → runs in both cases — like the finally block in try/catch

myFirstPromise
  .then(data => {
    console.log("Resolved:", data);   // "Resolved: Data loaded successfully!"
  })
  .catch(err => {
    console.log("Rejected:", err.message);
  })
  .finally(() => {
    console.log("Promise settled (done either way).");
  });

// Using fetchScore
fetchScore("Noman")
  .then(result => {
    console.log(`${result.name}'s score: ${result.score}`); // "Noman's score: 95"
  })
  .catch(err => {
    console.log("Error:", err.message);
  });

fetchScore("Unknown")
  .then(result => console.log(result))
  .catch(err => {
    console.log("Error:", err.message);  // "Student "Unknown" not found."
  });


// ---- Promise chaining ----
// Each .then() returns a new Promise, so you can chain multiple .then() calls.
// The return value of one .then() is passed as the input to the next one.
// This avoids deeply nested callbacks ("callback hell").

function getUser(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Noman" }), 500);
  });
}

function getOrders(user) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ user: user.name, orders: ["Laptop", "Mouse"] }), 500);
  });
}

function calculateTotal(orderData) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ ...orderData, total: 2 }), 300);
  });
}

// Chained — reads like a clean step-by-step flow
getUser(1)
  .then(user => {
    console.log("Got user:", user.name);  // "Got user: Noman"
    return getOrders(user);              // pass result to the next step
  })
  .then(orderData => {
    console.log("Orders:", orderData.orders); // ["Laptop", "Mouse"]
    return calculateTotal(orderData);
  })
  .then(final => {
    console.log("Total items ordered:", final.total); // 2
  })
  .catch(err => {
    // One .catch at the end handles errors from ANY step above
    console.log("Chain failed:", err.message);
  });


// ---- Promise.all() / Promise.race() / Promise.allSettled() ----
// These run multiple Promises at the same time (in parallel).

const p1 = new Promise(resolve => setTimeout(() => resolve("Result A"), 1000));
const p2 = new Promise(resolve => setTimeout(() => resolve("Result B"), 500));
const p3 = new Promise(resolve => setTimeout(() => resolve("Result C"), 800));

// Promise.all() — waits for ALL to succeed, returns array of all results
// If ANY one rejects, the whole thing rejects immediately
Promise.all([p1, p2, p3])
  .then(results => {
    console.log("All done:", results); // ["Result A", "Result B", "Result C"]
  })
  .catch(err => {
    console.log("One failed:", err.message);
  });

// Promise.race() — returns the FIRST one that settles (success or failure)
const fast = new Promise(resolve => setTimeout(() => resolve("Fast wins"), 200));
const slow = new Promise(resolve => setTimeout(() => resolve("Slow loses"), 800));

Promise.race([fast, slow])
  .then(winner => {
    console.log("Winner:", winner);    // "Winner: Fast wins"
  });

// Promise.allSettled() — waits for ALL to finish regardless of success or failure
// Returns an array of objects with { status, value } or { status, reason }
// Use this when you need all results even if some fail
const good = Promise.resolve("Good");
const bad  = Promise.reject(new Error("Failed"));
const also = Promise.resolve("Also good");

Promise.allSettled([good, bad, also])
  .then(results => {
    results.forEach(r => {
      if (r.status === "fulfilled") {
        console.log("fulfilled:", r.value);
      } else {
        console.log("rejected: ", r.reason.message);
      }
    });
  });
// "fulfilled: Good"
// "rejected:  Failed"
// "fulfilled: Also good"




// >>>>>>>>>>>>>>>>>>>>>>  9.3 Async / Await  <<<<<<<<<<<<<<<
// async/await is cleaner syntax built on top of Promises.
// It lets you write async code that LOOKS like normal synchronous code.
//
//   - async function
//   - await keyword
//   - Error handling with try/catch


// ---- async function ----
// Adding 'async' before a function makes it always return a Promise.
// Even if you return a plain value, JS wraps it in a resolved Promise.

async function sayHello() {
  return "Hello, Noman!";           // this is automatically wrapped in Promise.resolve()
}

sayHello().then(msg => console.log(msg)); // "Hello, Noman!"


// ---- await keyword ----
// 'await' pauses the async function until the Promise settles.
// It can only be used INSIDE an async function.
// The rest of the code outside continues running — only this function pauses.

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadStudentData() {
  console.log("Loading student data...");
  await delay(1000);                 // pause here for 1 second
  console.log("Data loaded!");

  const score = await fetchScore("Noman");  // wait for the promise to resolve
  console.log(`${score.name}: ${score.score}`); // "Noman: 95"
}

loadStudentData();

// Await makes chained steps much easier to read vs .then() chaining
async function getUserOrders() {
  const user      = await getUser(1);
  const orderData = await getOrders(user);
  const final     = await calculateTotal(orderData);
  console.log("Total items:", final.total); // 2
}

getUserOrders();


// ---- Error handling with try/catch ----
// When a Promise rejects inside an async function, you catch it with try/catch.
// This is the async/await equivalent of .catch().

async function loadScore(name) {
  try {
    const result = await fetchScore(name);
    console.log(`Score for ${result.name}: ${result.score}`);
  } catch (err) {
    console.log("Failed to load score:", err.message);
  } finally {
    console.log(`loadScore("${name}") finished.`);
  }
}

loadScore("Rahim");     // "Score for Rahim: 82"
loadScore("Nobody");    // "Failed to load score: Student "Nobody" not found."

// You can also handle errors at the call site
async function riskyTask() {
  const data = await Promise.reject(new Error("Task blew up!"));
  return data;
}

riskyTask().catch(err => console.log("Caught outside:", err.message));




// >>>>>>>>>>>>>>>>>>>>>>  9.4 Fetch API  <<<<<<<<<<<<<<<<<<<
// The Fetch API is the built-in way to make HTTP requests from the browser.
// fetch() always returns a Promise.
// The response is NOT the data directly — you need to call .json() on it first,
// which is also async and returns another Promise.
//
//   - fetch() with .then()
//   - fetch() with async/await
//   - Handling HTTP errors
//   - Sending POST / PUT / DELETE requests


// ---- fetch() with .then() ----
// The classic chained style — same as what you wrote in fetch.js

const API = "https://jsonplaceholder.typicode.com";

fetch(`${API}/todos/1`)
  .then(res  => res.json())          // parse the response body as JSON
  .then(data => {
    console.log("Todo (then):", data);
  })
  .catch(err => {
    console.log("Network error:", err.message);
  });


// ---- fetch() with async/await ----
// The cleaner, modern style — easier to read and extend

async function getTodo(id) {
  const res  = await fetch(`${API}/todos/${id}`);
  const data = await res.json();
  console.log("Todo (await):", data);
}

getTodo(2);

async function getUsers() {
  const res   = await fetch(`${API}/users`);
  const users = await res.json();
  console.log("Total users:", users.length);    // 10
  console.log("First user :", users[0].name);
}

getUsers();


// ---- Handling HTTP errors ----
// fetch() only rejects on actual network failure (no internet, DNS error, etc.)
// A 404 or 500 response does NOT cause a rejection — it still "succeeds" in fetch's view.
// You have to manually check res.ok or res.status to detect HTTP errors.

async function safeFetch(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      // res.ok is true for status 200-299, false for everything else
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Fetch failed:", err.message);
    return null;
  }
}

safeFetch(`${API}/posts/1`);                   // works fine
safeFetch(`${API}/posts/999999`);              // 404 — caught by our check


// ---- Sending POST / PUT / DELETE requests ----
// By default fetch() sends a GET request.
// For POST, PUT, DELETE you pass a second argument — an options object.

// POST — create a new resource
async function createPost(title, body) {
  const res = await fetch(`${API}/posts`, {
    method : "POST",
    headers: {
      "Content-Type": "application/json",       // tell the server we are sending JSON
    },
    body: JSON.stringify({ title, body, userId: 1 }), // convert JS object to JSON string
  });

  const newPost = await res.json();
  console.log("Created post:", newPost);
  // { id: 101, title: ..., body: ..., userId: 1 }
}

createPost("My First Post", "This is the body of the post.");

// PUT — replace an existing resource completely
async function updatePost(id, title, body) {
  const res = await fetch(`${API}/posts/${id}`, {
    method : "PUT",
    headers: { "Content-Type": "application/json" },
    body   : JSON.stringify({ id, title, body, userId: 1 }),
  });

  const updated = await res.json();
  console.log("Updated post:", updated);
}

updatePost(1, "Updated Title", "Updated body content.");

// PATCH — update only specific fields (partial update)
async function patchPost(id, changes) {
  const res = await fetch(`${API}/posts/${id}`, {
    method : "PATCH",
    headers: { "Content-Type": "application/json" },
    body   : JSON.stringify(changes),           // only send the fields you want to change
  });

  const patched = await res.json();
  console.log("Patched post:", patched);
}

patchPost(1, { title: "Only the title changed" });

// DELETE — remove a resource
async function deletePost(id) {
  const res = await fetch(`${API}/posts/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    console.log(`Post ${id} deleted successfully. Status: ${res.status}`); // 200
  } else {
    console.log("Delete failed. Status:", res.status);
  }
}

deletePost(1);

// Practical pattern — a reusable request helper
async function request(url, method = "GET", data = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.log(`[${method}] ${url} failed:`, err.message);
    return null;
  }
}

// Now you can use it cleanly for any HTTP method
request(`${API}/posts/1`);                                    // GET
request(`${API}/posts`, "POST", { title: "Test", userId: 1 }); // POST
request(`${API}/posts/1`, "DELETE");                           // DELETE
