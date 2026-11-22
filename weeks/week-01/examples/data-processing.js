// Run: node weeks/week-01/examples/data-processing.js [file] [status]
import { readFile } from "node:fs/promises";

export function validateTasks(value) {
  if (!Array.isArray(value)) throw new TypeError("Expected a JSON array");
  const ids = new Set();
  return value.map((task, index) => {
    if (!task || typeof task !== "object" || Array.isArray(task)) {
      throw new TypeError(`Task at index ${index} must be an object`);
    }
    if (!Number.isInteger(task.id) || task.id <= 0 || ids.has(task.id)) {
      throw new TypeError(`Task at index ${index} has an invalid or duplicate ID`);
    }
    ids.add(task.id);
    if (typeof task.title !== "string" || !task.title.trim()) {
      throw new TypeError(`Task ${task.id} requires a non-empty title`);
    }
    if (!["open", "done"].includes(task.status)) {
      throw new TypeError(`Task ${task.id} has an unsupported status`);
    }
    if (!Number.isInteger(task.priority) || task.priority < 1 || task.priority > 3) {
      throw new TypeError(`Task ${task.id} priority must be 1, 2 or 3`);
    }
    return { id: task.id, title: task.title.trim(), status: task.status, priority: task.priority };
  });
}

export function summarizeTasks(tasks, status = "open") {
  if (!["open", "done", "all"].includes(status)) {
    throw new TypeError("Status must be open, done, or all");
  }
  const matching = status === "all" ? tasks : tasks.filter(task => task.status === status);
  const items = matching.map(({ id, title, priority }) => ({ id, title, priority }));
  const counts = tasks.reduce((out, task) => {
    out[task.status] += 1;
    return out;
  }, { open: 0, done: 0 });
  return { total: tasks.length, counts, items };
}

async function main() {
  const filename = process.argv[2] ?? new URL("./tasks.json", import.meta.url);
  const status = process.argv[3] ?? "open";
  try {
    const raw = await readFile(filename, "utf8");
    const tasks = validateTasks(JSON.parse(raw));
    console.log(JSON.stringify(summarizeTasks(tasks, status), null, 2));
  } catch (error) {
    console.error(`Unable to process tasks: ${error.message}`);
    process.exitCode = 1;
  }
}
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  await main();
}
