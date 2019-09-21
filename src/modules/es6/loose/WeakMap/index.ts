import { HAS_WEAK } from "../constants.js";
import { isIterable } from "../../../util.js";
import {
  _getCryptoOrMathRandom,
  initializeInternalKeyProp,
  _patchObjectSealingMethods,
  isObjectOrThrow
} from "../Weak-shared.js";
import { _classCallCheck } from "../../../../shared.js";
const __WEAK__KEY =
  "@@WeakMap__" +
  +new Date() +
  Math.random().toString(16) +
  "-" +
  _getCryptoOrMathRandom();
interface patchedObj {
  [key: string]: {
    [id: number]: Array<any>;
  };
}
export const patchObjectSealingMethods = _patchObjectSealingMethods.bind(
  void 0,
  __WEAK__KEY
);
function generateMap(fm: FakeWeakMap<any, any>, it: Iterable<any> | undefined) {
  if (it == null) return;
  if (!isIterable(it))
    throw new Error("value:" + String(it) + " is not iterable");
  for (const k of it) {
    if (!k || k.length !== 2) throw new Error("invalid arg");
    fm.set(k[0], k[1]);
  }
}
interface FakeWeakMap<K extends object, V> {
  delete(key: K): boolean;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
  [Symbol.toStringTag]: string;
  _id: number;
}
interface FakeWeakMapConstructor {
  new <K extends object = object, V = any>(
    entries?: ReadonlyArray<[K, V]> | null,
    forceUseCustomImplementation?: boolean
  ): FakeWeakMap<K, V>;
  prototype: FakeWeakMap<object, any>;
}
let weakMapIds = 0;
/**
 * this implementation holds the value in the key itself instead of holding the key as
 * a reference.
 * however, we need to patch Object.{freeze,seal,preventExtensions}
 * or WeakMaps on previously frozen objects would not work
 *
 */
const FakeWeakMap = (function FakeWeakMap<K extends object, V>(
  this: FakeWeakMap<K, V>,
  iterable: Iterable<[K, V]>,
  forceUseCustomImplementation?: boolean
) {
  if (!forceUseCustomImplementation && HAS_WEAK) return new WeakMap(iterable);
  _classCallCheck(this, FakeWeakMap);
  patchObjectSealingMethods();
  this._id = ++weakMapIds;
  generateMap(this, iterable);
} as any) as FakeWeakMapConstructor;
function _getKeyValArr<K extends patchedObj>(key: K, id: number) {
  const c = key[__WEAK__KEY];
  return c ? c[id] : void 0;
}
function initSafeSetup<K extends patchedObj>(key: K) {
  isObjectOrThrow(key);
  initializeInternalKeyProp(key, __WEAK__KEY);
}
FakeWeakMap.prototype = {
  [Symbol.toStringTag]: "WeakMap",
  _id: 0,
  delete<K extends patchedObj>(key: K): boolean {
    initSafeSetup(key);
    const prevArr = _getKeyValArr(key, this._id);
    if (!prevArr) return false;
    delete key[__WEAK__KEY][this._id];
    return true;
  },
  set<K extends patchedObj, V>(key: K, val: V): FakeWeakMap<K, V> {
    initSafeSetup(key);
    const prevArr = _getKeyValArr(key, this._id);
    if (prevArr && prevArr[0] === this._id) {
      prevArr[1] = val;
    } else {
      key[__WEAK__KEY][this._id] = [this._id, val];
    }
    return this;
  },
  has<K extends patchedObj>(key: K): boolean {
    initSafeSetup(key);
    return !!_getKeyValArr(key, this._id);
  },
  get<K extends patchedObj>(key: K): any | undefined {
    initSafeSetup(key);
    const val = _getKeyValArr(key, this._id);
    if (val && val[0] === this._id) {
      return val[1];
    }
  }
};

export default FakeWeakMap;
