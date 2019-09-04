import keys from "../Object/keys.js";
export default function objToCSSString(a) {
  if ("string" == typeof a) return a;
  const b = [];
  for (const c of keys(a)) b.push(`${c}:${a[c]}`);
  return b.join(";");
}
