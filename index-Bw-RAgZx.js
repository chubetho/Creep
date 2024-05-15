function h(a) {
  const s = `${JSON.stringify(a)}`, n = `0000000${(s.split("").reduce((t, i, e) => Math.imul(31, t) + s.charCodeAt(e) | 0, 2166136261) >>> 0).toString(16)}`;
  return n.substring(n.length - 8);
}
const l = String.fromCharCode(Math.random() * 26 + 97) + Math.random().toString(36).slice(-7);
async function o(a, s = "SHA-256") {
  const r = `${JSON.stringify(a)}`, n = new TextEncoder().encode(r);
  return crypto.subtle.digest(s, n).then((t) => Array.from(new Uint8Array(t)).map((c) => `00${c.toString(16)}`.slice(-2)).join(""));
}
async function u() {
  const a = await import("./index-5QSK0dqo.js"), s = Object.values(a).map((t) => t()), r = await Promise.allSettled(s), n = await Promise.all(
    r.filter((t) => t.status === "fulfilled").map((t) => o(t.value))
  );
  return await o(n);
}
export {
  u as g,
  h,
  l as i
};
