import { HAS_WEAK } from "../constants.js";
import { isIterable } from "../../../util.js";
import {
  _getCryptoOrMathRandom,
  initializeInternalKeyProp,
  patchObjectSealingMethods,
  isObjectOrThrow
} from "../Weak-shared.js";
import { _classCallCheck } from "../../../../shared.js";
const __WEAK__KEY =
  "@@WeakMap__" +
  +new Date() +
  Math.random().toString(16) +
  "-" +
  _getCryptoOrMathRandom();
function generateMap(it) {
  if (it == null) return;
  if (!isIterable(it))
    throw new Error("value:" + String(it) + " is not iterable");
  for (k of it) {
    if (!k || k.length !== 2) throw new Error("invalid arg");
    this.set(k[0], k[1]);
  }
}

let weakMapIds = 0;
/**
 * this implementation holds the value in the key itself instead of holding the key as
 * a reference.
 * however, we need to patch Object.{freeze,seal,preventExtensions}
 * or WeakMaps on previously frozen objects would not work
 *
 *
 *
 * @param {Iterable} iterable
 * @param {boolean} forceUseCustomImplementation
 * @returns {WeakMap}
 */
export default function FakeWeakMap(iterable, forceUseCustomImplementation) {
  if (!forceUseCustomImplementation && HAS_WEAK) return new WeakMap(iterable);
  _classCallCheck(this, FakeWeakMap);
  patchObjectSealingMethods(__WEAK__KEY);
  this._id = ++weakMapIds;
  generateMap.call(this, iterable);
}
function _getKeyValArr(key, id) {
  const c = key[__WEAK__KEY];
  return c ? c[id] : void 0;
}
function initSafeSetup(key) {
  isObjectOrThrow(key);
  initializeInternalKeyProp(key, __WEAK__KEY);
}
FakeWeakMap.prototype = {
  get(key) {
    initSafeSetup(key);
    const val = _getKeyValArr(key, this._id);
    if (val && val[0] === this._id) {
      return val[1];
    }
  },
  has(key) {
    initSafeSetup(key);
    return !!_getKeyValArr(key, this._id);
  },
  set(key, val) {
    initSafeSetup(key);
    const prevArr = _getKeyValArr(key, this._id);
    if (prevArr && prevArr[0] === this._id) {
      prevArr[1] = val;
    } else {
      key[__WEAK__KEY][this._id] = [this._id, val];
    }
    return this;
  },
  delete(key) {
    initSafeSetup(key);
    const prevArr = _getKeyValArr(key, this._id);
    if (!prevArr) return false;
    delete key[__WEAK__KEY][this._id];
    return true;
  }
};
