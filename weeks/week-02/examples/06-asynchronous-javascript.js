/*
 BEXPERT — WEEK 2 / MAIN TITLE 6
 ASYNCHRONOUS JAVASCRIPT: ONE-FILE RECORDING DEMOS

 USAGE:
   1. Copy/open this file in VS Code.
   2. Every numbered demo is enclosed in a block comment.
   3. Remove the /* and *\/ around ONE demo at a time.
   4. Run: node weeks/week-02/examples/06-asynchronous-javascript.js
   5. Restore the comment delimiters before the next example.
   6. Most demos finish in less than one second. Wait for the output.

 All snippets use local variables inside { } or private functions.
 No external API, network access, secrets, or dependencies.
 Timer durations demonstrate waiting, not performance benchmarks.
*/

// ============================================================
// OPENING — Why backend developers care about waiting
// ============================================================

/*
{
  const student = "Hana";
  console.log("1. Student requested:", student);
  setTimeout(() => console.log("3. Simulated database result received"), 80);
  console.log("2. Server can continue other work");
  // Order: 1, 2, 3
}
*/


// ============================================================
// 6.1 SYNCHRONOUS VS ASYNCHRONOUS EXECUTION
// ============================================================

// 6.1.1 — Synchronous statements execute in sequence
/*
{
  console.log("A: start");
  console.log("B: work");
  console.log("C: finish");
  // A, B, C
}
*/

// 6.1.2 — Schedule a timer; do not stop current code
/*
{
  console.log("A: start");
  setTimeout(() => console.log("C: timer finished"), 0);
  console.log("B: continue");
  // A, B, C
}
*/

// 6.1.3 — A simulated slow operation doesn't require us to wait in place
/*
{
  console.log("Checking course availability...");
  setTimeout(() => {
    console.log("Availability result: 12 seats");
  }, 100);
  console.log("Logging the next incoming request...");
}
*/

// 6.1.4 — CPU-heavy synchronous work DOES block (short safe demo)
/*
{
  console.log("Starting a short busy computation");
  const start = Date.now();
  while (Date.now() - start < 80) {
    // Deliberate busy loop: blocks the JS thread for about 80ms.
    // NEVER do this for real server waiting.
  }
  console.log("Busy computation ended");
}
*/


// ============================================================
// 6.2 CALLBACKS AND ASYNCHRONOUS OPERATIONS
// ============================================================

// 6.2.1 — A callback can be synchronous
/*
{
  ["Hana", "Sami"].forEach(name => console.log("Now:", name));
  console.log("Array callbacks already finished");
}
*/

// 6.2.2 — A callback can be scheduled for later
/*
{
  console.log("Now: making request");
  setTimeout(() => console.log("Later: response ready"), 30);
  console.log("Now: continuing work");
}
*/

// 6.2.3 — An API-like callback with simulated latency
/*
{
  function loadStudent(id, onResult) {
    setTimeout(() => onResult({ id, name: "Hana" }), 50);
  }
  console.log("Requesting student");
  loadStudent(7, student => console.log("Received:", student.name));
  console.log("Doing something else");
}
*/

// 6.2.4 — Why nested dependent callbacks become hard to manage
/*
{
  function loadStudent(id, callback) {
    setTimeout(() => callback(null, { id, courseId: 3 }), 30);
  }
  function loadCourse(courseId, callback) {
    setTimeout(() => callback(null, { id: courseId, title: "Backend" }), 30);
  }
  loadStudent(7, (error, student) => {
    if (error) return console.log("Student error:", error.message);
    loadCourse(student.courseId, (courseError, course) => {
      if (courseError) return console.log("Course error:", courseError.message);
      console.log("Student", student.id, "enrolled in", course.title);
    });
  });
}
*/

// 6.2.5 — Mistake: invoking callback instead of passing it
/*
{
  function announce() { console.log("Announcement NOW"); }
  // This runs immediately:
  announce();

  // Correct: a function is passed and called by timer later.
  setTimeout(announce, 30);
  console.log("Timer scheduled");
}
*/


// ============================================================
// 6.3 PROMISES: PENDING, FULFILLED, REJECTED; THEN/CATCH/FINALLY
// ============================================================

// 6.3.1 — Promise resolves later
/*
{
  const coursePromise = new Promise(resolve => {
    setTimeout(() => resolve({ id: 3, title: "Backend" }), 50);
  });
  console.log("Promise created", coursePromise instanceof Promise);
  coursePromise
    .then(course => console.log("Fulfilled:", course.title))
    .catch(error => console.log("Rejected:", error.message))
    .finally(() => console.log("Finished"));
  console.log("Continued after attaching handlers");
}
*/

// 6.3.2 — Promise rejection and catch
/*
{
  Promise.reject(new Error("Profile unavailable"))
    .then(() => console.log("Not reached"))
    .catch(error => console.log("Caught:", error.message))
    .finally(() => console.log("Cleanup log"));
}
*/

// 6.3.3 — The result flows through a promise chain
/*
{
  Promise.resolve(5)
    .then(value => value * 2)
    .then(value => console.log("Final value:", value))
    .catch(error => console.error(error));
  console.log("Synchronous line");
  // Synchronous line, Final value: 10
}
*/

// 6.3.4 — Predict log order: sync -> promise microtask -> timer
/*
{
  console.log("A");
  setTimeout(() => console.log("timer"), 0);
  Promise.resolve().then(() => console.log("promise"));
  console.log("B");
  // A, B, promise, timer
}
*/


// ============================================================
// 6.4 ASYNC AND AWAIT
// ============================================================

// 6.4.1 — async function always returns a Promise
/*
{
  async function getNumber() { return 5; }
  const result = getNumber();
  console.log("Promise?", result instanceof Promise); // true
  result.then(value => console.log("Resolved value:", value)); // 5
}
*/

// 6.4.2 — await pauses only its own async function
/*
{
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  async function example() {
    console.log("Inside: before await");
    await wait(40);
    console.log("Inside: after await");
  }
  example();
  console.log("Outside: keeps running");
  // Inside before, Outside keeps running, Inside after
}
*/

// 6.4.3 — A simulated API with async/await
/*
{
  const getStudent = id => new Promise(resolve => {
    setTimeout(() => resolve({ id, name: "Hana" }), 50);
  });
  async function main() {
    const student = await getStudent(7);
    console.log("Student:", student);
  }
  main().catch(console.error);
  console.log("Main called; other work continues");
}
*/


// ============================================================
// 6.5 ERROR HANDLING WITH TRY/CATCH/FINALLY
// ============================================================

// 6.5.1 — Rejection becomes a thrown error at await
/*
{
  async function getProfile(id) {
    if (id !== 7) throw new Error("Profile unavailable");
    return { id, name: "Hana" };
  }
  async function main() {
    try {
      const result = await getProfile(99);
      console.log(result);
    } catch (error) {
      console.log("Could not load profile:", error.message);
    } finally {
      console.log("Lookup attempt complete");
    }
  }
  main().catch(console.error);
}
*/

// 6.5.2 — Handle errors INSIDE an async callback, not around scheduling
/*
{
  try {
    setTimeout(() => {
      try {
        throw new Error("Timer callback failed");
      } catch (error) {
        console.log("Handled inside callback:", error.message);
      }
    }, 0);
  } catch {
    console.log("This outer catch is not reached");
  }
}
*/

// 6.5.3 — A fallback for an expected failure
/*
{
  function getStudent(id) {
    return new Promise((resolve, reject) => setTimeout(() => {
      if (id !== 7) return reject(new Error("Not found"));
      resolve({ id, name: "Hana" });
    }, 40));
  }
  async function main() {
    try {
      console.log(await getStudent(999));
    } catch (error) {
      console.log("Using fallback: Guest (reason:", error.message + ")");
    }
  }
  main().catch(console.error);
}
*/


// ============================================================
// 6.6 SEQUENTIAL VS CONCURRENT AWAIT / PROMISE.ALL
// ============================================================

// 6.6.1 — Sequential operations: about 250ms (120 + 130)
/*
{
  const simulate = (name, ms) => new Promise(resolve =>
    setTimeout(() => resolve(name), ms));
  async function main() {
    const start = Date.now();
    const a = await simulate("Profile", 120);
    const b = await simulate("Progress", 130);
    console.log(a, b, "elapsed ~", Date.now() - start, "ms");
  }
  main().catch(console.error);
}
*/

// 6.6.2 — Concurrent operations: about 130ms (longest one)
/*
{
  const simulate = (name, ms) => new Promise(resolve =>
    setTimeout(() => resolve(name), ms));
  async function main() {
    const start = Date.now();
    const [profile, progress] = await Promise.all([
      simulate("Profile", 120),
      simulate("Progress", 130)
    ]);
    console.log(profile, progress, "elapsed ~", Date.now() - start, "ms");
  }
  main().catch(console.error);
}
*/

// 6.6.3 — Result order is input order, not completion order
/*
{
  const lookup = (label, ms) => new Promise(resolve =>
    setTimeout(() => {
      console.log("Finished:", label);
      resolve(label);
    }, ms));
  async function main() {
    const results = await Promise.all([
      lookup("Slow", 100),
      lookup("Fast", 20)
    ]);
    console.log("Results:", results); // [ 'Slow', 'Fast' ]
  }
  main().catch(console.error);
}
*/

// 6.6.4 — Promise.all rejects; other work is not cancelled
/*
{
  const lookup = (label, ms, fail = false) => new Promise((resolve, reject) =>
    setTimeout(() => {
      if (fail) reject(new Error(label + " failed"));
      else { console.log(label, "finished"); resolve(label); }
    }, ms));
  async function main() {
    try {
      await Promise.all([
        lookup("Profile", 25, true),
        lookup("Progress", 80)
      ]);
    } catch (error) {
      console.log("Caught:", error.message);
    }
  }
  main().catch(console.error);
  // Caught: Profile failed
  // Progress finished
}
*/


// ============================================================
// FINALE — A SIMULATED STUDENT DASHBOARD
// ============================================================

// F.1 — Combine all 6 topics without real HTTP or API keys
/*
{
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  function getStudent(id) {
    return wait(40).then(() => ({ id, name: "Hana", courseId: 3 }));
  }
  async function getCourse(courseId) {
    await wait(80);
    return { id: courseId, title: "Backend" };
  }
  async function getProgress(studentId) {
    await wait(110);
    return { studentId, completed: 8, total: 12 };
  }

  async function buildDashboard(id) {
    // Progress depends on student ID. Course and progress
    // can run together once the student record arrives.
    const student = await getStudent(id);
    const [course, progress] = await Promise.all([
      getCourse(student.courseId),
      getProgress(student.id)
    ]);
    return {
      student: student.name,
      course: course.title,
      progress: Math.round(100 * progress.completed / progress.total) + "%"
    };
  }

  console.log("Starting dashboard");
  buildDashboard(7)
    .then(data => console.log("Dashboard:", data))
    .catch(error => console.error("Dashboard error:", error.message))
    .finally(() => console.log("Dashboard request finished"));
  console.log("Server keeps doing other work");
}
*/

// END OF MAIN TITLE 6
