import { HAS_SET, s } from "../constants.js";
import setup from "./proto.js";
import { isIterable } from "../../../util.js";
function generateSet(it) {
  if (it == null) return;
  if (!isIterable(it))
    throw new Error("value:" + String(it) + " is not iterable");
  const _m = this[s];
  for (k of it) {
    this.add(k);
  }
}
export default function compatSet(iterable) {
  if (HAS_SET) return new Set(iterable);
  this[s] = [];
  generateSet.call(this, iterable);
}
setup(compatSet);
 