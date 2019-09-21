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
    for (const k of it) {
        if (!k || k.length !== 2)
            throw new Error("invalid arg");
        fm.set(k[0], k[1]);
    }
}
const FakeMap = function FakeMap(iterable, forceUseCustomImplementation) {
    if (!forceUseCustomImplementation && constants_js_1.HAS_MAP)
        return new Map(iterable);
    shared_js_1._classCallCheck(this, FakeMap);
    this[constants_js_1.m] = [];
    generateMap(this, iterable);
    return this;
};
proto_js_1.default(FakeMap);
FakeMap[Symbol.species] = FakeMap;
exports.default = FakeMap;
