# Main Title 2: JavaScript Fundamentals — Variables, Values, and Data Types

**Goal:** Understand how JavaScript represents values and how explicit conversion prevents unreliable backend behavior.

**Recording setup:** open this file in VS Code with Markdown Preview Enhanced. Each JavaScript block can be run independently. The snippets also read normally on GitHub.

![JavaScript primitive and reference values at a glance](../images/javascript-values.svg)

## 2.1 Declaring Variables with const and let

Use `const` unless the variable must be reassigned. `let` allows reassignment. Neither makes an object immutable. Avoid `var` in new code: its function scope and hoisting behavior introduce unnecessary surprises.

~~~javascript {cmd="node"}
const school = "BeXpert";
let enrolled = 8;
enrolled += 1;
const course = { title: "Backend" };
course.title = "Node.js Backend";
console.log(school, enrolled, course.title);
~~~

**Why it matters for backend work:** Request data often changes as a program runs, but configuration and references usually should not be reassigned.

**Watch out:** `const` prevents rebinding, not changing nested properties. A variable declared with `let` or `const` cannot be accessed before its initialization.

**Try it:** Replace `let enrolled` with `const enrolled`. What error do you expect?

## 2.2 Understanding JavaScript Data Types and Values

Primitive values include string, number, boolean, bigint, undefined, null, and symbol. Objects (including arrays and functions) are reference values. JavaScript uses dynamic typing: variables can refer to different kinds of values over time.

~~~javascript {cmd="node"}
const values = ["abc", 42, true, 7n, undefined, null, Symbol("id"), {}, []];
for (const value of values) {
  console.log(String(value), "=>", typeof value);
}
console.log(Array.isArray([]));
~~~

**Why it matters for backend work:** APIs accept text over the network; even if an input is expected to be numeric, its value and type need validation at runtime.

**Watch out:** `typeof null` is "object" (a historical quirk); `typeof []` is also "object". Use `Array.isArray` to check arrays.

**Try it:** Predict `typeof NaN`, `typeof (() => {})`, and `typeof 10n`.

## 2.3 Working with Operators and Expressions

Operators combine values to create expressions. Arithmetic (`+ - * / % **`), assignment (`= +=`), and string concatenation appear everywhere. Evaluate both the value and the type of an expression.

~~~javascript {cmd="node"}
const price = 120;
const quantity = 3;
const subtotal = price * quantity;
const hasDiscount = quantity >= 3;
const total = hasDiscount ? subtotal * 0.9 : subtotal;
console.log({ subtotal, total, remainder: quantity % 2 });
console.log("Order " + 12);
~~~

**Why it matters for backend work:** Money calculations should not rely on unchecked floating-point rounding; production financial systems use minor units or decimal-safe approaches.

**Watch out:** `+` also concatenates strings; `100 + "5"` yields the string `"1005"`.

**Try it:** Why is `0.1 + 0.2 === 0.3` false?

## 2.4 Type Conversion and Type Coercion

Explicit conversion is a deliberate step (`Number`, `String`, `Boolean`). Coercion occurs implicitly during operations or comparisons. Treat external input as untrusted even when its numeric-looking text converts.

~~~javascript {cmd="node"}
const input = "25";
console.log(Number(input) + 5);
console.log(input + 5);
console.log(Number(""), Number("hello"));
console.log(Number.isNaN(Number("hello")));
console.log(Boolean("false"), Boolean(""));
~~~

**Why it matters for backend work:** Route parameters and form fields often start as strings. Validate converted values before using them in a query or calculation.

**Watch out:** `Number("")` is zero and `Boolean("false")` is true. Silent conversions can turn missing or invalid data into plausible numbers.

**Try it:** Design a condition that accepts only positive integer IDs from a text input.

## Recap

Before moving on, explain the output of the examples without running them. Then change one input and predict what happens before executing.
