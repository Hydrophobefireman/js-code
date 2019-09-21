"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = __importDefault(require("../WeakMap/index.js"));
const constants_js_1 = require("../constants.js");
const shared_js_1 = require("../../../../shared.js");
const util_js_1 = require("../../../util.js");
function generateSet(fs, it) {
    if (it == null || !fs.__map)
        return;
    if (!util_js_1.isIterable(it))
        throw new Error("value:" + String(it) + " is not iterable");
    for (const k of it) {
        fs.__map.set(k, k);
    }
}
/**
 * weak set - either use native or use a weakmap (native or pollyfilled..doesnt matter)
 *
 * @returns {WeakSet}
 * @param {Iterable} iterable
 * @param {boolean} forceUseCustomImplementations
 */
const FakeWeakSet = function FakeWeakSet(iterable, forceUseCustomImplementations) {
    if (!forceUseCustomImplementations && constants_js_1.HAS_WEAK)
        return new WeakSet(iterable);
    shared_js_1._classCallCheck(this, FakeWeakSet);
    this.__map = new index_js_1.default(null, forceUseCustomImplementations);
    generateSet(this, iterable);
};
FakeWeakSet.prototype = {
    [Symbol.toStringTag]: "WeakSet",
    add(k) {
        if (!this.__map)
            throw new Error("Invalid Initialization");
        if (this.__map.has(k))
            return this;
        this.__map.set(k, k);
        return this;
    },
    has(k) {
        if (!this.__map)
            throw new Error("Invalid Initialization");
        return this.__map.has(k);
    },
    delete(k) {
        if (!this.__map)
            throw new Error("Invalid Initialization");
        return this.__map.delete(k);
    }
};
exports.default = FakeWeakSet;
