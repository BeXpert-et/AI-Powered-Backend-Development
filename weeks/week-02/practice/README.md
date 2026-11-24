# Main Title 6 — Practice: Student Dashboard with Simulated Delays

Build a small Node.js script that simulates loading data for a student dashboard. **Do not call real HTTP APIs** and do not install dependencies.

## Scenario

A dashboard must display a student's name, course title and progress. The simulated data sources respond after short delays. The student ID must be loaded first, because the other lookups depend on it. Once the student is known, the course and progress lookups are independent.

## Requirements

1. Write \`wait(ms)\`, returning a Promise fulfilled after a timer.
2. Implement \`getStudent(id)\`, \`getCourse(courseId)\`, and \`getProgress(studentId)\` using Promises and delays of roughly 50–150 ms.
3. Use \`async\`/\`await\` to load the student first, then use \`Promise.all\` to load course and progress concurrently.
4. Return an object with exactly \`student\`, \`course\`, and \`progressPercent\`.
5. Demonstrate and handle one rejected lookup with \`try/catch\`; log an understandable message without printing an unhandled rejection.
6. Predict and demonstrate the log order of \`console.log\`, a resolved Promise callback, and a zero-delay timer.
7. Compare a sequential and concurrent approach with elapsed time printed using \`Date.now()\` or \`performance.now()\`. Explain why precise timings vary.

## Sample output

~~~text
Starting dashboard request
Other work can continue
Dashboard: { student: 'Hana', course: 'Backend', progressPercent: 75 }
Finished dashboard request
~~~

You may choose your own sample data. **Do not hard-code the final dashboard object**; it must be composed from the simulated functions.

## Questions to include in your README

- Why can't the course lookup start before you know the \`courseId\`?
- Why can course and progress lookups overlap after loading the student?
- Does \`Promise.all\` cancel other operations if one rejects?
- Why doesn't \`await\` freeze all of Node.js?

## Submission

Submit one JavaScript file and a README with run instructions, successful output, failure output, and a short explanation of the execution order. Be prepared to change one delay or failure condition during a student review.

**Hints:** Use \`new Promise((resolve, reject) => ...)\` and \`setTimeout\`; for a rejection demo, reject with \`new Error("...")\`. The instructor solution is kept private.
