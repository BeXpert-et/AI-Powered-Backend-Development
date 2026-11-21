import test from "node:test";
import assert from "node:assert/strict";
import { validateTasks, summarizeTasks } from "./data-processing.js";

const sample = [
  { id: 1, title: "Start", status: "open", priority: 1 },
  { id: 2, title: "Done", status: "done", priority: 2 }
];

test("summarizes selected tasks without changing original data", () => {
  const tasks = validateTasks(sample);
  assert.deepEqual(summarizeTasks(tasks, "open").counts, { open: 1, done: 1 });
  assert.equal(summarizeTasks(tasks, "open").items.length, 1);
  assert.equal(tasks.length, 2);
});
test("rejects duplicate ids", () => {
  assert.throws(() => validateTasks([sample[0], sample[0]]), /duplicate/);
});
test("rejects invalid status filter", () => {
  assert.throws(() => summarizeTasks(sample, "broken"), /Status/);
});
