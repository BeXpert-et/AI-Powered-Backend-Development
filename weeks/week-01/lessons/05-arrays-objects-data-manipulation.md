# 5: Arrays, Objects, and Data Manipulation

**Goal:** Safely prepare data for APIs by selecting, validating, transforming, and serializing records.

![Example dataset flowing through filter map and reduce](../images/array-transformations.svg)

## 5.1 Creating, Accessing, and Updating Arrays

Arrays are ordered collections. Access by zero-based index; use `push`, `pop`, or index assignment when mutation is intentional. Distinguish mutation from creating a new array.

~~~javascript {cmd="node"}
const topics = ["HTTP", "Git"];
topics.push("JavaScript");
console.log(topics[0], topics.at(-1), topics.length);
const copy = [...topics, "Node.js"];
console.log(topics, copy);
~~~

**Backend connection:** Backend services frequently receive arrays of records. Mutating shared data can lead to surprising bugs.

**Common mistake:** `const` does not freeze the array; `push` changes its contents.

**Practice:** Which operation created a new array rather than modifying the original?

### Arrays are indexed collections

Array indices begin at zero. Methods such as `push` and `splice` modify an existing array; `slice`, `map`, and `filter` produce new arrays.

```javascript {cmd="node"}
const names = ["Aster", "Sami", "Hana"];
console.log(names[0], names.at(-1)); // Aster Hana
const withoutFirst = names.slice(1);
console.log(withoutFirst); // [ "Sami", "Hana" ]
console.log(names.length); // 3; original unchanged
```

A new outer array does not guarantee independent nested objects. That becomes important when a record contains an object such as `profile` or `address`.

## 5.2 Processing Arrays with map, filter, find, forEach, and reduce

Choose the method based on your intended result: `map` transforms, `filter` selects, `find` returns the first match, `forEach` performs an action, `reduce` accumulates a result. These methods work with callbacks.

~~~javascript {cmd="node"}
const tasks = [
  { id: 1, title: "Plan", done: true, hours: 2 },
  { id: 2, title: "Code", done: false, hours: 4 },
  { id: 3, title: "Test", done: false, hours: 3 }
];
console.log(tasks.filter(t => !t.done).map(t => t.title));
console.log(tasks.find(t => t.id === 2));
console.log(tasks.reduce((sum, t) => sum + t.hours, 0));
tasks.forEach(t => console.log(t.id));
~~~

**Backend connection:** Transforming database results into public API responses often uses map/filter, but security filtering should also be enforced by the data-access layer.

**Common mistake:** `forEach` returns undefined; `find` may return undefined; `map` preserves array length.

**Practice:** What would change if you replace `filter` with `map` for the unfinished tasks?

### The method depends on the question

| Method | Question | Returns |
|---|---|---|
| `map` | What should each element become? | New array of equal length |
| `filter` | Which elements should remain? | New array |
| `find` | What's the first matching element? | One value or `undefined` |
| `forEach` | What action should run for every element? | `undefined` |
| `reduce` | What single result should I accumulate? | Accumulated result |

```javascript {cmd="node"}
const grades = [{ name: "Hana", score: 90 }, { name: "Sami", score: 55 }];
const passedNames = grades.filter(g => g.score >= 60).map(g => g.name);
const total = grades.reduce((sum, g) => sum + g.score, 0);
console.log({ passedNames, average: total / grades.length });
```

This is a common backend pipeline: choose relevant rows, derive an output shape, and aggregate when needed. Data filtering for authorization must be enforced securely by the backend; JavaScript array filtering alone is not a general access-control solution.

## 5.3 Creating and Working with Objects and Nested Objects

Objects hold named properties, and nested structures model related data. Property access can use dot or bracket notation. Objects are passed and assigned by reference.

~~~javascript {cmd="node"}
const student = { id: 3, name: "Sami", profile: { city: "Addis Ababa" } };
console.log(student.profile.city);
student["active"] = true;
const alias = student;
alias.name = "Updated";
console.log(student.name, Object.keys(student));
~~~

**Backend connection:** Objects represent request bodies and database records. Understand when a function mutates its input.

**Common mistake:** `const alias = student` does not copy the object; both references point to the same object.

**Practice:** How would you safely read profile.city if profile might be absent?

### Dot notation, bracket notation, and references

Use dot notation for a known field, such as `student.name`. Bracket notation helps when a property name is held in a variable.

```javascript {cmd="node"}
const enrollment = { student: { name: "Saba" }, status: "active" };
const field = "status";
console.log(enrollment[field], enrollment.student.name);
const sameEnrollment = enrollment;
sameEnrollment.status = "completed";
console.log(enrollment.status); // completed
```

Both variables refer to the same object. Use this knowledge when designing transformations: returning a new object may be safer than mutating an input record that other code still needs.

## 5.4 Destructuring, Spread, Rest, and Optional Chaining

Destructuring extracts properties or array elements; spread expands elements or copies enumerable object properties; rest collects remaining values. Optional chaining safely stops when a base value is null or undefined.

~~~javascript {cmd="node"}
const input = { id: 2, name: "Hana", passwordHash: "secret", profile: { city: "Jimma" } };
const { passwordHash, ...publicUser } = input;
const updated = { ...publicUser, name: "Hana T." };
console.log(updated, input.profile?.city, input.address?.city ?? "Not provided");
const [first, ...others] = [10, 20, 30];
console.log(first, others);
~~~

**Backend connection:** Selecting public fields reduces accidental leaks. Destructuring can improve clarity but it does not replace validation.

**Common mistake:** Spread is shallow: nested objects are still shared references. In security-sensitive code, explicitly allowlist fields instead of assuming omitting one secret is enough.

**Practice:** What happens if you mutate `updated.profile.city`?

### Selecting fields in API responses

Destructuring extracts values. The rest operator `...rest` gathers unselected properties; spread `...obj` copies enumerable properties into a new object. Optional chaining avoids errors when a nested value is null or undefined.

```javascript {cmd="node"}
const user = { id: 1, name: "Hana", passwordHash: "not-for-clients", profile: null };
const { id, name } = user;
const publicUser = { id, name }; // explicit allowlist
console.log(publicUser, user.profile?.city ?? "Unknown city");
```

Use **explicit allowlists** for sensitive API response fields. Excluding one known secret with rest syntax can accidentally expose other private fields added later.

Spread copies are **shallow**, so a nested object can still be shared between the original and the copy.

## 5.5 Working with Strings and JSON Data

Strings provide input normalization (`trim`, `toLowerCase`, `includes`, `slice`). JSON is a text format that transports arrays and objects. `JSON.parse` throws for malformed data, and `JSON.stringify` does not preserve every JavaScript value.

~~~javascript {cmd="node"}
const rawName = "  ASTER  ";
const cleanName = rawName.trim().toLowerCase();
const payload = JSON.stringify({ name: cleanName, active: true });
console.log(payload, JSON.parse(payload).name);
try { JSON.parse("{invalid}"); }
catch (error) { console.log("Invalid JSON:", error instanceof SyntaxError); }
~~~

**Backend connection:** Most JSON APIs receive structured data; even valid JSON needs application-level schema validation.

**Common mistake:** `JSON.stringify({a: undefined})` omits that property; JSON does not support functions or BigInt.

**Practice:** Why are JSON syntax validation and business-rule validation separate checks?

### Strings, JSON, and error handling

String methods help normalize user input. `JSON.stringify` turns supported JavaScript data into JSON text, while `JSON.parse` turns valid JSON text into JavaScript values.

```javascript {cmd="node"}
const raw = ' { "name": "  Hana  ", "progress": 80 } ';
try {
  const data = JSON.parse(raw);
  if (typeof data.name !== "string" || typeof data.progress !== "number") {
    throw new Error("Invalid enrollment fields");
  }
  console.log({ name: data.name.trim(), progress: data.progress });
} catch (error) {
  console.log("Cannot process record:", error.message);
}
```

**Two different checks are needed:** (1) is the text valid JSON? and (2) is the parsed structure valid for this application? For example, `{"progress":"complete"}` is valid JSON but does not contain a numeric progress value.

## Review and practice

1. Revisit an example from this chapter. Predict its output, run it, and explain any difference.
2. Change one input or condition and test what changes.
3. Identify one situation in a backend API where the concept would be useful.

**Further reading:** [MDN JavaScript guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) · [Node.js learning](https://nodejs.org/en/learn)
