# Lesson 1.2 — JavaScript essentials for backend development

**Recording objective:** Refresh only the JavaScript syntax needed to read and build APIs. Prior programming knowledge is assumed.

## 1. Data arrives in objects

A backend frequently receives a JSON object representing a user, product, or request. Start with a regular JavaScript object:

```javascript {cmd="node"}
const user = { id: 7, name: "Aster", active: true };
console.log(user.name);
console.log(user["active"]);
```

**Explain:** property access, primitive values, and why `user.email` is `undefined` when missing. Ask: *What changes if `user` itself is undefined?*

## 2. Functions encode business rules

```javascript {cmd="node"}
function canAccessCourse(user) {
  return Boolean(user && user.active);
}
console.log(canAccessCourse({ name: "Aster", active: true }));
console.log(canAccessCourse({ name: "Kebede", active: false }));
```

Explain return values rather than printing inside every function. Why is that easier to test?

## 3. Destructuring and defaults

```javascript {cmd="node"}
const request = { name: "Book", price: 150 };
const { name, price, currency = "ETB" } = request;
console.log(name, price, currency);
```

**Important:** defaults apply when the property is missing or `undefined`, not when it is `null`. Destructuring an undefined value throws.

## 4. Arrow functions and object copying

```javascript {cmd="node"}
const double = number => number * 2;
const original = { id: 1, status: "open" };
const updated = { ...original, status: "done" };
console.log(double(4), original.status, updated.status);
```

A spread copy is shallow. This matters with nested objects and when several parts of the application hold the same references.

## 5. Optional chaining and nullish coalescing

```javascript {cmd="node"}
const response = { customer: { name: "Saba" }, quantity: 0 };
console.log(response.customer?.name ?? "Guest");
console.log(response.quantity ?? 1); // 0 is preserved
console.log(response.missing?.name ?? "Unknown");
```

Compare `??` with `||`: falsy values such as `0` must not accidentally become defaults.

## 6. JSON is a data format, not a JavaScript object

```javascript {cmd="node"}
const raw = '{"task":"Review PR","done":false}';
const parsed = JSON.parse(raw);
console.log(parsed.task);
console.log(JSON.stringify({ ok: true, data: parsed }));
```

**Demonstrate a failure:** run `JSON.parse("{bad json}")` inside a `try/catch`. Explain how an API should respond to malformed client data.

## Complete example

Open [`examples/js-essentials.js`](../examples/js-essentials.js). Run:

```bash
node weeks/week-01/examples/js-essentials.js
```

Walk through how the reusable `normalizeUser` function applies these concepts together. Stop before editing the example and ask students to predict its result.

## Check understanding

1. What happens when you destructure from `undefined`?
2. How is `??` different from `||` when a value is zero?
3. Why is passing values into a function more useful than reading global variables?
4. Why might a shallow copy fail to protect nested objects?

**Next:** Array processing and transforming incoming records.
