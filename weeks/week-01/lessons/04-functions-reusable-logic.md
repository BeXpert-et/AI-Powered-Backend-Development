# 4: Functions and Reusable JavaScript Logic

**Goal:** Build small testable units of logic and understand how callbacks and scope affect behavior.

![Function scope and closure retaining a private counter](../images/scope-closure.svg)

## 4.1 Creating Functions with Declarations and Expressions

Functions package a task behind a meaningful name. A function declaration can be called before its declaration in the same scope. A function expression is assigned to a variable and follows that binding's initialization rules.

~~~javascript {cmd="node"}
console.log(toLabel("api"));
function toLabel(text) { return text.toUpperCase(); }
const formatId = function (id) { return "TASK-" + id; };
console.log(formatId(12));
~~~

**Backend connection:** Small named functions make validation, transformation, and business rules testable without starting a web server.

**Common mistake:** Calling a function expression declared with `const` before initialization throws an error.

**Practice:** Refactor a repeated line of formatting logic into a reusable function.

### Why reusable functions matter

Without functions, the same validation or formatting rule may be copied into several places. Once extracted into a function, it has a name, clearly defined inputs, and one implementation to change.

```javascript {cmd="node"}
function formatCourse(name) {
  return name.trim().toUpperCase();
}
const courses = [" backend ", " ai fundamentals "];
console.log(courses.map(formatCourse));
```

Function declarations are generally available throughout their enclosing scope. A function expression assigned to `const` becomes usable after the declaration is evaluated. Prefer understandable names such as `validateEnrollment` over generic names such as `doStuff`.

## 4.2 Function Parameters, Arguments, Default Values, and return

Parameters name the inputs; arguments are actual passed values. Defaults are applied for missing or undefined arguments. `return` produces a value and stops execution; logging alone does not return a result.

~~~javascript {cmd="node"}
function calculateTotal(price, quantity = 1) {
  if (typeof price !== "number" || price < 0) throw new TypeError("Invalid price");
  if (!Number.isInteger(quantity) || quantity < 1) throw new TypeError("Invalid quantity");
  return price * quantity;
}
console.log(calculateTotal(75));
console.log(calculateTotal(75, 3));
~~~

**Backend connection:** A function with explicit inputs and outputs can be tested, reused, and connected to a route later.

**Common mistake:** A default argument does not replace `null`; `calculateTotal(75, null)` still passes null.

**Practice:** Why does `console.log` inside a function not replace `return`?

### Parameters, arguments, and return values

In `function greet(name)`, `name` is the **parameter**. In `greet("Hana")`, `"Hana"` is the **argument**. A function's `return` value can be used in another expression, tested, or passed to another function.

```javascript {cmd="node"}
function addTax(price, rate = 0.15) {
  return price + price * rate;
}
const total = addTax(100);
console.log(total);      // 115
console.log(addTax(100, 0)); // 100
```

If there is no `return`, a function ordinarily returns `undefined`. Defaults apply when an argument is omitted or explicitly `undefined`, not when it's `null`. Validate function inputs when they can come from outside the application.

## 4.3 Arrow Functions and Their Differences

Arrow functions offer concise syntax and lexical `this`. They do not have their own `arguments` or `this`, and cannot be constructors. Use regular methods or declarations when receiver-bound `this` is required.

~~~javascript {cmd="node"}
const double = n => n * 2;
const makeTask = (title, done = false) => ({ title, done });
console.log(double(6), makeTask("Review PR"));
const counter = {
  value: 2,
  increment() { this.value += 1; return this.value; }
};
console.log(counter.increment());
~~~

**Backend connection:** Arrow functions are common for callbacks and transformations; method syntax is clearer when the method uses the object as `this`.

**Common mistake:** `const task = () => { title: "Test" }` does not return an object literal; wrap the object in parentheses.

**Practice:** Why should an object method using `this` usually not be an arrow function?

### Concise syntax versus behavior

Arrow functions are useful when passing a short function as an argument. A single expression may be returned without writing `return`. Curly braces create a function body, in which an explicit `return` is needed.

```javascript {cmd="node"}
const square = n => n * n;
const squareWithBody = n => { return n * n; };
const createTask = title => ({ title, done: false });
console.log(square(3), squareWithBody(3), createTask("Review"));
```

The **`this` difference** is more than a style choice. Regular methods receive a context based on how they're called, while arrows capture `this` from their surrounding scope. This becomes important when writing object methods and event handlers.

## 4.4 Understanding Scope and How Variables Are Accessed

Scope determines where a name can be used. `let` and `const` are block-scoped; nested functions can read names in outer lexical scopes. A closure retains access to those names after the outer function finishes.

~~~javascript {cmd="node"}
function makeCounter() {
  let count = 0;
  return function increment() { count += 1; return count; };
}
const first = makeCounter();
const second = makeCounter();
console.log(first(), first(), second());
if (true) { const hidden = "block"; console.log(hidden); }
~~~

**Backend connection:** Closures appear in middleware factories, configuration helpers, and callbacks. Avoid accidental shared mutable state when handling many requests.

**Common mistake:** `hidden` above is not visible outside its block. Keeping mutable state at module scope can accidentally mix requests.

**Practice:** Predict the third call to `first()` and explain why `second()` starts at 1.

### Lexical scope and closures

A function can read variables from the scope where it was **defined**. When that function is returned or passed elsewhere, it may continue to use those variables. This behavior is called a **closure**.

```javascript {cmd="node"}
function makePrefixer(prefix) {
  return text => prefix + text;
}
const courseLabel = makePrefixer("COURSE: ");
console.log(courseLabel("Backend"));
console.log(courseLabel("AI"));
```

Closures are useful for creating configurable utilities and middleware. Be thoughtful about mutable shared state: a variable at module level can be accessed by many requests in a running server.

## 4.5 Callback Functions: Passing Functions as Arguments

A callback is a function passed to another function to be invoked later or during an operation. Not every callback is asynchronous; array methods call their callbacks synchronously.

~~~javascript {cmd="node"}
function processItems(items, transform) {
  const results = [];
  for (const item of items) results.push(transform(item));
  return results;
}
const titles = processItems(["login", "grades"], name => name.toUpperCase());
console.log(titles);
setTimeout(() => console.log("timer callback"), 0);
console.log("after scheduling");
~~~

**Backend connection:** Callbacks connect route handlers, array processing, timers, and later asynchronous JavaScript lessons.

**Common mistake:** Passing `transform()` executes immediately; passing `transform` lets the receiving function call it.

**Practice:** Which callback runs synchronously here, and which one runs after the current synchronous code?

### A callback is a function value

Passing a function lets the receiving function choose *when* to execute it. A callback can execute immediately, during a loop, or after an event. Being a callback does not automatically make it asynchronous.

```javascript {cmd="node"}
function applyToEach(items, action) {
  for (const item of items) action(item);
}
applyToEach(["Hana", "Sami"], name => console.log("Hello", name));
console.log("Completed synchronous processing");
```

Later, Node.js uses callbacks, promises, and events around asynchronous operations. For now, focus on the distinction between `process` (a function value) and `process()` (a call that executes it).

## Review and practice

1. Revisit an example from this chapter. Predict its output, run it, and explain any difference.
2. Change one input or condition and test what changes.
3. Identify one situation in a backend API where the concept would be useful.

**Further reading:** [MDN JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) · [Node.js learning](https://nodejs.org/en/learn)
