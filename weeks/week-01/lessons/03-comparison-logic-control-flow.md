# 3: Comparison, Logic, and Control Flow

**Goal:** Express clear conditions, make predictable decisions, and repeat work safely.

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

**Backend connection:** A route ID from a URL usually arrives as text; validate it before matching against a numeric database ID.

**Common mistake:** String comparison is lexicographic; `"10" > "2"` is false.

**Practice:** What validation belongs between reading the route ID and comparing it?

### Equality and relational comparisons

Prefer `===` and `!==` for ordinary application logic: they do not perform the broad conversions that `==` and `!=` do. When you compare two objects, strict equality checks whether both variables refer to the **same object**, not whether their properties look identical.

```javascript {cmd="node"}
console.log(0 === false); // false
console.log("5" === 5); // false
console.log({ id: 1 } === { id: 1 }); // false
const task = { id: 1 };
console.log(task === task); // true
```

**Related backend scenario:** A URL parameter usually starts as a string. Parse and validate it before comparing it with IDs stored as numbers.

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

**Backend connection:** Access rules combine authentication, ownership, role, and resource state. Always define the policy in plain language first.

**Common mistake:** `||` uses any falsy value as a fallback, including zero. Use `??` when only null and undefined should trigger a default.

**Practice:** Write a condition requiring a logged-in user AND ownership of a task.

### Short-circuiting in practice

JavaScript evaluates `A && B` only as far as needed: if `A` is falsy, it does not evaluate `B`. The `||` operator similarly stops after a truthy value. This lets you guard optional data—but it doesn't replace a readable permission policy.

```javascript {cmd="node"}
const loggedIn = true;
const ownerId = 9;
const userId = 9;
const isAllowed = loggedIn && ownerId === userId;
console.log(isAllowed); // true
console.log(0 || 20);    // 20
console.log(0 ?? 20);    // 0
```

For access control, distinguish **authentication** (who is making the request) from **authorization** (whether that person may perform an action).

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

**Backend connection:** Truthy checks are convenient for optional values but unsafe when zero, false, or an empty collection is a legitimate input.

**Common mistake:** An empty array is truthy; use `array.length === 0` if you want to detect no results.

**Practice:** Why might `if (request.body.age)` incorrectly reject a valid value?

### Check for presence, not just truthiness

The following values are falsy: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Empty arrays and objects are **truthy**, despite containing no items or properties.

```javascript {cmd="node"}
const settings = { maxRetries: 0 };
console.log(settings.maxRetries || 3);  // 3 — loses the intended zero
console.log(settings.maxRetries ?? 3);  // 0 — preserves zero
console.log(Boolean([]), Boolean({})); // true true
```

This distinction matters for quantities, page numbers, boolean flags, and optional fields. Choose the check that matches the business rule: `value === undefined`, `value == null` (intentional null-or-undefined check), or a type/range check.

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

**Backend connection:** HTTP handlers frequently branch on validation results or permissions and choose a response status.

**Common mistake:** A `switch` falls through to the next case if you omit `break` or `return` where required.

**Practice:** What does your function return for 500, and is that useful to a client?

### Choosing a readable branch

Use `if/else` for ranges or multiple conditions, `switch` when comparing one value against several cases, and a ternary when both outcomes are short expressions.

```javascript {cmd="node"}
function accessMessage(user) {
  if (!user) return "Sign in";
  if (!user.active) return "Account inactive";
  return user.role === "admin" ? "Admin dashboard" : "Student dashboard";
}
console.log(accessMessage(null));
console.log(accessMessage({ active: true, role: "student" }));
```

An **early return** keeps failure cases visible and avoids unnecessary nested conditions. For a backend API, that makes validation and authorization easier to audit.

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

**Backend connection:** Loops help process files, records, or paginated responses. In production, bound retries to avoid infinite loops or repeated service calls.

**Common mistake:** `for...in` gives object keys, not array values; don't confuse it with `for...of`.

**Practice:** How would you stop a loop early after finding the first matching record?

### Loop choices and stopping conditions

Choose a loop based on what you need to control. A counted `for` loop exposes the index, `for...of` emphasizes values, and `while` is suitable when a condition controls the repetition.

```javascript {cmd="node"}
const records = [{ id: 1 }, { id: 2 }, { id: 3 }];
let found;
for (const record of records) {
  if (record.id === 2) { found = record; break; }
}
console.log(found);
```

`break` exits a loop; `continue` skips to the next iteration. For retry loops, use a maximum attempt count and an explicit strategy for failure. Unbounded retries can worsen an outage.

## Review and practice

1. Revisit an example from this chapter. Predict its output, run it, and explain any difference.
2. Change one input or condition and test what changes.
3. Identify one situation in a backend API where the concept would be useful.

**Further reading:** [MDN JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) · [Node.js learning](https://nodejs.org/en/learn)
