"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../constants.js");
const proto_js_1 = require("./proto.js");
const util_js_1 = require("../../../util.js");
const shared_js_1 = require("../../../../shared.js");
function generateMap(fm, it) {
    if (it == null)
        return;
    if (!util_js_1.isIterable(it))
        throw new Error("value:" + String(it) + " is not iterable");
    const len = it.length;
    for (let i = 0; i < len; i++) {
        const k = it[i];
        if (!k || k.length !== 2)
            throw new Error("invalid arg");
        fm.set(k[0], k[1]);
    }
}
/**
 * Map implementation
 *
 * This Implementation uses One single array to store keys and values in their own arrays
 * Key index - 0
 * Value index - 1
 *
 * we could have used 2 separate Arrays for storing keys and values in matching indices
 * @TODO do a benchmark
 */
const FakeMap = function FakeMap(iterable, forceUseCustomImplementation) {
    shared_js_1._classCallCheck(this, FakeMap);
    if (!forceUseCustomImplementation && constants_js_1.HAS_MAP)
        return new Map(iterable);
    this[constants_js_1.m] = [];
    generateMap(this, iterable);
    return this;
};
proto_js_1.default(FakeMap);
FakeMap[Symbol.species] = FakeMap;
exports.default = FakeMap;
