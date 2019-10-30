import _WeakMap from "../WeakMap/index.js";
import { HAS_WEAK } from "../constants.js";
import { _classCallCheck } from "../../../../shared.js";
import { isIterable } from "../../../util.js";

function generateSet(fs: FakeWeakSet<any>, it: Iterable<any> | undefined) {
  if (it == null || !fs.__map) return;
  if (!isIterable(it))
    throw new Error("value:" + String(it) + " is not iterable");
  const len = (it as Array<any>).length;
  for (let i = 0; i < len; i++) {
    const k = (it as Array<any>)[i];
    fs.__map.set(k, k);
  }
}

interface FakeWeakSet<T extends object> {
  add(value: T): this;
  delete(value: T): boolean;
  has(value: T): boolean;
  __map?: _WeakMap<T, T>;
  readonly [Symbol.toStringTag]: string;
}

interface FakeWeakSetConstructor {
  new <T extends object = object>(
    values?: ReadonlyArray<T> | null
  ): FakeWeakSet<T>;
  [Symbol.species]: FakeWeakSetConstructor;
  prototype: FakeWeakSet<object>;
}
/**
 * weak set - either use native or use a weakmap (native or pollyfilled..doesnt matter)
 *
 * @returns {WeakSet}
 * @param {Iterable} iterable
 * @param {boolean} forceUseCustomImplementations
 */
const FakeWeakSet = (function FakeWeakSet<T extends object>(
  this: FakeWeakSet<T>,
  iterable: Iterable<T>,
  forceUseCustomImplementations?: boolean
) {
  _classCallCheck(this, FakeWeakSet);
  if (!forceUseCustomImplementations && HAS_WEAK) return new WeakSet(iterable);
  this.__map = new _WeakMap(null, forceUseCustomImplementations);
  generateSet(this, iterable);
} as any) as FakeWeakSetConstructor;

FakeWeakSet[Symbol.species] = FakeWeakSet;
FakeWeakSet.prototype = {
  [Symbol.toStringTag]: "WeakSet",
  add<T extends object>(k: T): FakeWeakSet<T> {
    if (!this.__map) throw new Error("Invalid Initialization");
    if (this.__map.has(k)) return this as FakeWeakSet<T>;
    this.__map.set(k, k);
    return this as FakeWeakSet<T>;
  },
  has(k) {
    if (!this.__map) throw new Error("Invalid Initialization");
    return this.__map.has(k);
  },
  delete(k) {
    if (!this.__map) throw new Error("Invalid Initialization");
    return this.__map.delete(k);
  }
};

export default FakeWeakSet;
