# Main Title 3: Comparison, Logic, and Control Flow

**Goal:** Express clear conditions, make predictable decisions, and repeat work safely.

**Recording setup:** open this file in VS Code with Markdown Preview Enhanced. Each JavaScript block can be run independently. The snippets also read normally on GitHub.

## 3.1 Comparing Values with JavaScript Comparison Operators

Use strict equality (`===`, `!==`) to avoid implicit type changes. Relational operators (`>`, `<`, `>=`, `<=`) compare values; make sure the inputs have the expected types.

~~~javascript {cmd="node"}
const dbId = 5;
const routeId = "5";
console.log(dbId == routeId);  // coercion
console.log(dbId === routeId); // different types
console.log(dbId === Number(routeId));
console.log(9 > 4, "10" > "2");
~~~

**Why it matters for backend work:** A route ID from a URL usually arrives as text; validate it before matching against a numeric database ID.

**Watch out:** String comparison is lexicographic; `"10" > "2"` is false.

**Try it:** What validation belongs between reading the route ID and comparing it?

## 3.2 Combining Conditions with Logical Operators

`&&` requires both conditions, `||` accepts either, and `!` negates. These operators short-circuit and return operands rather than automatically converting every result to a boolean.

~~~javascript {cmd="node"}
const user = { active: true, role: "teacher" };
const canGrade = user.active && user.role === "teacher";
console.log(canGrade);
console.log(false && missingFunction()); // not executed
console.log("fallback" || "other");
console.log(!user.active);
~~~

**Why it matters for backend work:** Access rules combine authentication, ownership, role, and resource state. Always define the policy in plain language first.

**Watch out:** `||` uses any falsy value as a fallback, including zero. Use `??` when only null and undefined should trigger a default.

**Try it:** Write a condition requiring a logged-in user AND ownership of a task.

## 3.3 Understanding Truthy and Falsy Values

In conditions, values are converted to booleans. Falsy values include `false`, `0`, `-0`, `0n`, empty string, `null`, `undefined`, and `NaN`. Arrays and objects are truthy—even when empty.

~~~javascript {cmd="node"}
for (const item of [0, "", null, undefined, NaN, [], {}, "0"]) {
  console.log(String(item), Boolean(item));
}
const pageSize = 0;
console.log(pageSize || 10); // 10
console.log(pageSize ?? 10); // 0
~~~

**Why it matters for backend work:** Truthy checks are convenient for optional values but unsafe when zero, false, or an empty collection is a legitimate input.

**Watch out:** An empty array is truthy; use `array.length === 0` if you want to detect no results.

**Try it:** Why might `if (request.body.age)` incorrectly reject a valid value?

## 3.4 Making Decisions with if, else, switch, and Ternary Operators

Use `if/else` for arbitrary conditions, `switch` for matching one expression against several cases, and the ternary operator for a concise value choice. Avoid nesting conditionals when early returns express the rule more clearly.

~~~javascript {cmd="node"}
function classifyStatus(status) {
  if (status === 401) return "Login required";
  if (status === 403) return "Access denied";
  switch (status) {
    case 200: return "OK";
    case 404: return "Not found";
    default: return "Other";
  }
}
const isReady = true;
console.log(classifyStatus(403), isReady ? "send" : "hold");
~~~

**Why it matters for backend work:** HTTP handlers frequently branch on validation results or permissions and choose a response status.

**Watch out:** A `switch` falls through to the next case if you omit `break` or `return` where required.

**Try it:** What does your function return for 500, and is that useful to a client?

## 3.5 Repeating Operations with for, while, and for...of Loops

A `for` loop is convenient when you need an index. `for...of` iterates values. `while` repeats while its condition remains true; ensure it can stop. Prefer array methods when their intent is clearer than manual loops.

~~~javascript {cmd="node"}
const pages = ["intro", "courses", "contact"];
for (let index = 0; index < pages.length; index++) console.log(index, pages[index]);
for (const page of pages) console.log("route:", page);
let retries = 0;
while (retries < 2) {
  retries++;
  console.log("attempt", retries);
}
~~~

**Why it matters for backend work:** Loops help process files, records, or paginated responses. In production, bound retries to avoid infinite loops or repeated service calls.

**Watch out:** `for...in` gives object keys, not array values; don't confuse it with `for...of`.

**Try it:** How would you stop a loop early after finding the first matching record?

## Recap

Before moving on, explain the output of the examples without running them. Then change one input and predict what happens before executing.
