import { HAS_WEAK } from "../constants.js";
import { isIterable } from "../../../util.js";
import { _getCryptoOrMathRandom, initializeInternalKeyProp, _patchObjectSealingMethods, isObjectOrThrow, _patchPropertyDescriptorMethods } from "../Weak-shared.js";
import { _classCallCheck } from "../../../../shared.js";
const __WEAK__KEY = "@@WeakMap__" +
    +new Date() +
    Math.random().toString(16) +
    "-" +
    _getCryptoOrMathRandom();
export const patchObjectSealingMethods = _patchObjectSealingMethods.bind(void 0, __WEAK__KEY);
export const patchPropertyDescriptorMethods = _patchPropertyDescriptorMethods.bind(void 0, __WEAK__KEY);
function generateMap(fm, it) {
    if (it == null)
        return;
    if (!isIterable(it))
        throw new Error("value:" + String(it) + " is not iterable");
    const len = it.length;
    for (let i = 0; i < len; i++) {
        const k = it[i];
        if (!k || k.length !== 2)
            throw new Error("invalid arg");
        fm.set(k[0], k[1]);
    }
}
let weakMapIds = 0;
/**
 * this implementation holds the value in the key itself instead of holding the key as
 * a reference.
 * however, we need to patch Object.{freeze,seal,preventExtensions}
 * or WeakMaps on previously frozen objects would not work
 *
 */
const FakeWeakMap = function FakeWeakMap(iterable, forceUseCustomImplementation) {
    if (!forceUseCustomImplementation && HAS_WEAK)
        return new WeakMap(iterable);
    _classCallCheck(this, FakeWeakMap);
    patchObjectSealingMethods();
    patchPropertyDescriptorMethods();
    this._id = ++weakMapIds;
    generateMap(this, iterable);
};
function _getKeyValArr(key, id) {
    const c = key[__WEAK__KEY];
    return c ? c[id] : void 0;
}
FakeWeakMap[Symbol.species] = FakeWeakMap;
function initSafeSetup(key) {
    isObjectOrThrow(key);
    initializeInternalKeyProp(key, __WEAK__KEY);
}
FakeWeakMap.prototype = {
    [Symbol.toStringTag]: "WeakMap",
    _id: 0,
    delete(key) {
        initSafeSetup(key);
        const prevArr = _getKeyValArr(key, this._id);
        if (!prevArr)
            return false;
        delete key[__WEAK__KEY][this._id];
        return true;
    },
    set(key, val) {
        initSafeSetup(key);
        const prevArr = _getKeyValArr(key, this._id);
        if (prevArr && prevArr[0] === this._id) {
            prevArr[1] = val;
        }
        else {
            key[__WEAK__KEY][this._id] = [this._id, val];
        }
        return this;
    },
    has(key) {
        initSafeSetup(key);
        return !!_getKeyValArr(key, this._id);
    },
    get(key) {
        initSafeSetup(key);
        const val = _getKeyValArr(key, this._id);
        if (val && val[0] === this._id) {
            return val[1];
        }
    }
};
export default FakeWeakMap;
