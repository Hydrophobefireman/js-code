import _WeakMap from "../WeakMap/index.js";
import { HAS_WEAK } from "../constants.js";
import { _classCallCheck } from "../../../../shared.js";

function generateSet(it) {
  if (it == null) return;
  if (!isIterable(it))
    throw new Error("value:" + String(it) + " is not iterable");
  for (k of it) {
    this.__map.set(k, k);
  }
}
/**
 * weak set - either use native or use a weakmap (native or pollyfilled..doesnt matter)
 *
 * @returns {WeakSet}
 * @param {Iterable} iterable
 * @param {boolean} forceUseCustomImplementations
 */
export default function FakeWeakSet(iterable, forceUseCustomImplementations) {
  if (!forceUseCustomImplementations && HAS_WEAK) return new WeakSet(iterable);
  _classCallCheck(this, FakeWeakSet);
  this.__map = new _WeakMap(null, forceUseCustomImplementations);
  generateSet.call(this, iterable);
}
FakeWeakSet.prototype = {
  add(k) {
    if (this.__map.has(k)) return;
    this.__map.set(k, k);
    return this;
  },
  has(k) {
    return this.__map.has(k);
  },
  delete(k) {
    return this.__map.delete(k);
  }
};
