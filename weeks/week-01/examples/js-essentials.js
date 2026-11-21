// Week 1: combine objects, functions, destructuring, defaults and JSON.
function normalizeUser(input) {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    throw new TypeError("User must be an object");
  }
  const { id, name, active = false } = input;
  if (!Number.isInteger(id) || id <= 0 || typeof name !== "string" || !name.trim()) {
    throw new TypeError("User needs a positive integer id and non-empty name");
  }
  return { id, name: name.trim(), active: Boolean(active) };
}

const raw = '[{"id":1,"name":"  Hana  ","active":true},{"id":2,"name":"Sami"}]';
const users = JSON.parse(raw).map(normalizeUser);
const visible = users.filter(user => user.active);
console.log(JSON.stringify({ count: visible.length, users: visible }, null, 2));

export { normalizeUser };
