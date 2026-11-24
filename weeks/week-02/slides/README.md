# Main Title 6 — Concept presentation

**Editable Canva deck:** [BeXpert — Asynchronous JavaScript](https://www.canva.com/d/13rsTcmPavByqvx)

**Format:** 16 slides for one combined 45–60-minute recording, mixed with VS Code demonstrations. The slide deck follows the BeXpert cream/navy/yellow teaching style. Slide 5 contains an embedded MP4 animation illustrating a simulated client–server request and result flow.

### How to present the lesson

1. Start with the problem: a server waiting for a student record.
2. Contrast synchronous work with scheduling asynchronous completion.
3. Explain callbacks with an on-screen execution-order prediction.
4. Show how a Promise settles into fulfilled or rejected.
5. Compare the synchronous call stack with a Promise microtask and a timer callback.
6. Explain why `await` suspends its async function but not the entire Node.js process.
7. Demonstrate error handling with `try/catch/finally`.
8. Compare sequential waits and overlapping waits with `Promise.all`.
9. End by constructing the simulated student dashboard in the [one-file JavaScript demo](../examples/06-asynchronous-javascript.js).

The slide sequence supports step-by-step explanation even without extra transitions. You can adjust animations in Canva and add the approved BeXpert logo as needed.

**Note:** The simulated video visualizes an asynchronous workflow; it is not a trace of a real HTTP request or of Node's internal scheduler.
