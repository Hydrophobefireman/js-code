import _WeakMap from "../WeakMap/index.js";
import { HAS_WEAK } from "../constants.js";
import { _classCallCheck } from "../../../../shared.js";
import { isIterable } from "../../../util.js";
function generateSet(fs, it) {
    if (it == null || !fs.__map)
        return;
    if (!isIterable(it))
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
    if (!forceUseCustomImplementations && HAS_WEAK)
        return new WeakSet(iterable);
    _classCallCheck(this, FakeWeakSet);
    this.__map = new _WeakMap(null, forceUseCustomImplementations);
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
export default FakeWeakSet;
