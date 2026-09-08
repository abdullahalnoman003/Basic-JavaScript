<div align="center">

# 🟨 Basic JavaScript

### A hands-on, section-by-section journey through JavaScript - from variables and data types to the DOM, fetch, and async patterns.

[![Language](https://img.shields.io/badge/Language-JavaScript%20(ES6%2B)-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Runtime](https://img.shields.io/badge/Runtime-Node.js%20%7C%20Browser-339933?style=for-the-badge&logo=node.js&logoColor=white)]()
[![Type](https://img.shields.io/badge/Type-Educational%20Repository-2ea44f?style=for-the-badge)]()
[![Status](https://img.shields.io/badge/Status-Active-2ea44f?style=for-the-badge)]()

---

[📜 Overview](#-overview) • [📚 Modules](#-modules) • [🛠 Technologies](#-technologies) • [📦 Getting Started](#-getting-started) • [🚀 Usage](#-usage) • [🗂 Project Structure](#-project-structure) • [🤝 Contributing](#-contributing) • [👨‍🎓 Author](#-author)

</div>

---

## 📜 Overview

**Basic JavaScript** is a carefully organized, comment-rich collection of scripts that walks through JavaScript - **concept by concept**. Every file is written like a mini textbook: numbered sections, runnable examples, and in-depth explanations that make the "why" just as clear as the "how".

It's designed for:

- 🧑‍🎓 **Students** who want a structured, example-driven introduction to JavaScript
- 🚀 **Self-learners** strengthening their fundamentals before frameworks
- 🔁 **Developers** brushing up on ES6+, async patterns, and DOM APIs

> 💡 Every file reflects each major area of the language - ordered in progressively advanced sections (Sections 1 → 10).

---

## 📚 Modules

| # | File | Focus |
| --- | --- | --- |
| 1 | `Basics.js` | Variables (`let`/`const`/`var`), primitives vs references, scope, hoisting, type coercion |
| 2 | `Strings.js` | String methods, template literals, splitting, searching, and formatting |
| 3 | `Numbers.js` | Math object, conversions, rounding, and numeric edge cases |
| 4 | `Control.js` | Conditionals, truthiness, loops, `switch`, and control-flow logic |
| 5 | `Arrays.js` | Array methods in depth - iteration, mutation, destructuring, and functional patterns |
| 6 | `Objects.js` | Object literals, property access, methods, destructuring, and `this` |
| 7 | `Functions.js` | Declarations vs expressions, arrow functions, closures, higher-order functions, and `this` binding |
| 8 | `Errors.js` | `try/catch/finally`, throwing errors, and debugging techniques |
| 9 | `Async.js` | Event loop, call stack, Promises, `.then/.catch`, `async/await`, and the Fetch API |
| 10 | `DOM.js` | Selecting & manipulating elements, events (bubbling/capturing/delegation), and dynamic updates |
| - | `fetch.js` | Practical network requests with the Fetch API (`GET` examples using JSONPlaceholder) |
| - | `JSON.js` | JSON vs JS objects, `parse`/`stringify`, and shape validation |
| - | `Converter.js` | Mini example - a temperature converter function (`°C → °F`) |
| - | `index.js` | "Hello World" entry point for your very first runs |

---

## 🛠 Technologies

| Tool | Purpose |
| --- | --- |
| **JavaScript (ES6+)** | The language - modern syntax, Promises, destructuring, arrow functions |
| **Node.js** | Run the core-logic scripts directly from the terminal |
| **Browser APIs** | DOM manipulation & `fetch` (needs a browser environment) |
| **HTML** | `index.html` scaffolds a browser page for the DOM/Fetch demos |

---

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) - v18+ recommended
- A modern web browser (Chrome, Edge, Firefox, etc.)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/abdullahalnoman003/Basic-JavaScript.git
cd Basic-JavaScript

# 2. No dependencies to install - just run the files!
```

---

## 🚀 Usage

### 🟩 Run core-logic scripts with Node.js

```bash
# Run any section file directly
node Basics.js
node Async.js
node arrays.js
```

### 🌐 Run browser/demo scripts (DOM & Fetch)

```bash
# 1. Open index.html in your browser
#    OR serve it with a local static server:
python -m http.server 8000
# then visit http://localhost:8000
```

> ⚠️ **DOM & `fetch` code only runs in the browser** - Node.js has no `document` object.

### 🔗 Link a script to an HTML page

```html
<!DOCTYPE html>
<html>
<body>
  <!-- your markup here -->
  <script src="DOM.js"></script>
</body>
</html>
```

---

## 🗂 Project Structure

```
Basic-JavaScript/
├── index.html          # Browser scaffold for DOM/Fetch demos
├── index.js            # "Hello World" entry point
├── Basics.js           # §1 Fundamentals
├── Strings.js          # §2 Working with strings
├── Numbers.js          # §3 Numbers & math
├── Control.js          # §4 Logic & control flow
├── Arrays.js           # §5 Arrays (in depth)
├── Objects.js          # §6 Objects (in depth)
├── Functions.js        # §7 Functions (in depth)
├── Errors.js           # §8 Error handling & debugging
├── Async.js            # §9 Asynchronous JavaScript
├── DOM.js              # §10 DOM & browser
├── fetch.js            # Fetch API examples (JSONPlaceholder)
├── JSON.js             # JSON deep-dive
└── Converter.js        # Mini utility example (°C → °F)
```

---

## 🤝 Contributing

Have an idea for a new section or a cleaner explanation? Contributions are very welcome!

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b section/my-new-topic`)
3. ✅ Add your section file following the existing comment-style conventions
4. 🔀 Submit a Pull Request

---

## 📄 License

This is an open, educational resource for **learning purposes**. Use it freely in your own studies and projects.

---

## 👨‍🎓 Author

<div align="center">

### Abdullah Al Noman

JavaScript mentor & lifelong learner

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdullahalnoman003)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/abdullahalnoman003)

⭐ Found this helpful? Star it to help other learners find it!

</div>