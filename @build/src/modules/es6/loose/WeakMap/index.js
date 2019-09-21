"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../constants.js");
const util_js_1 = require("../../../util.js");
const Weak_shared_js_1 = require("../Weak-shared.js");
const shared_js_1 = require("../../../../shared.js");
const __WEAK__KEY = "@@WeakMap__" +
    +new Date() +
    Math.random().toString(16) +
    "-" +
    Weak_shared_js_1._getCryptoOrMathRandom();
exports.patchObjectSealingMethods = Weak_shared_js_1._patchObjectSealingMethods.bind(void 0, __WEAK__KEY);
function generateMap(fm, it) {
    if (it == null)
        return;
    if (!util_js_1.isIterable(it))
        throw new Error("value:" + String(it) + " is not iterable");
    for (const k of it) {
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
    if (!forceUseCustomImplementation && constants_js_1.HAS_WEAK)
        return new WeakMap(iterable);
    shared_js_1._classCallCheck(this, FakeWeakMap);
    exports.patchObjectSealingMethods();
    this._id = ++weakMapIds;
    generateMap(this, iterable);
};
function _getKeyValArr(key, id) {
    const c = key[__WEAK__KEY];
    return c ? c[id] : void 0;
}
function initSafeSetup(key) {
    Weak_shared_js_1.isObjectOrThrow(key);
    Weak_shared_js_1.initializeInternalKeyProp(key, __WEAK__KEY);
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
exports.default = FakeWeakMap;
