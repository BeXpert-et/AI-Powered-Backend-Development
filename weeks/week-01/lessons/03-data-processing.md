# Lesson 1.3 — Processing data with JavaScript

**Recording objective:** Turn raw records into validated, filtered results using reusable functions.

## Sample input

Imagine task records retrieved from a JSON file or an API. Later, the same transformations can be applied to database results.

## 1. `filter` selects records

```javascript {cmd="node"}
const tasks = [
  { id: 1, title: "API design", done: true },
  { id: 2, title: "Write tests", done: false },
  { id: 3, title: "Deploy", done: false }
];
console.log(tasks.filter(task => !task.done));
```

Explain the callback's boolean result. `filter` returns a new array and does not change the original array.

## 2. `map` transforms shape

```javascript {cmd="node"}
const users = [{ id: 1, name: "Hana", passwordHash: "private" }];
const publicUsers = users.map(({ id, name }) => ({ id, name }));
console.log(publicUsers);
```

Explain selecting explicit public fields instead of returning an entire user record.

## 3. `find` returns one record or `undefined`

```javascript {cmd="node"}
const tasks = [{ id: 10, title: "Build API" }];
const task = tasks.find(item => item.id === 99);
console.log(task ?? "Not found");
```

Distinguish a missing item from an empty array of results.

## 4. `reduce` calculates totals

```javascript {cmd="node"}
const payments = [{ amount: 100 }, { amount: 45 }, { amount: 55 }];
const total = payments.reduce((sum, payment) => sum + payment.amount, 0);
console.log(total);
```

Explain the accumulator and why we supplied the initial value `0`.

## 5. Validate data before transforming it

```javascript {cmd="node"}
const input = [{ amount: 100 }, { amount: "invalid" }];
const valid = input.filter(item =>
  typeof item.amount === "number" && Number.isFinite(item.amount)
);
console.log(valid);
```

Discuss how silent filtering differs from rejecting bad input. For a payment system, invalid records may require an explicit error instead.

## 6. Combine operations in a real program

Read [`examples/data-processing.js`](../examples/data-processing.js), which loads [`examples/tasks.json`](../examples/tasks.json). It:

1. Parses the input and checks the expected array shape.
2. Validates task IDs, titles, statuses and priorities.
3. Filters open tasks and maps them into concise output.
4. Computes counts by status.
5. Handles missing files and invalid JSON without a noisy stack trace.

Run from the repository root:

```bash
node weeks/week-01/examples/data-processing.js
```

Then try:

```bash
node weeks/week-01/examples/data-processing.js weeks/week-01/examples/tasks.json open
```

## Review questions

- What if the JSON root is an object rather than an array?
- What if `id` is duplicated?
- Why should external values be validated before using them?
- Which logic belongs in independent functions, and what can be tested without file access?

**Next:** The HTTP lesson explains how similar data travels between a client and a backend.
