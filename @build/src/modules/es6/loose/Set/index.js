"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../constants.js");
const proto_js_1 = __importDefault(require("./proto.js"));
const util_js_1 = require("../../../util.js");
const shared_js_1 = require("../../../../shared.js");
function generateSet(fs, it) {
    if (it == null)
        return;
    if (!util_js_1.isIterable(it))
        throw new Error("value:" + String(it) + " is not iterable");
    for (const k of it) {
        fs.add(k);
    }
}
const FakeSet = function FakeSet(iterable, forceUseCustomImplementation) {
    if (!forceUseCustomImplementation && constants_js_1.HAS_SET)
        return new Set(iterable);
    shared_js_1._classCallCheck(this, FakeSet);
    this[constants_js_1.s] = [];
    generateSet(this, iterable);
};
proto_js_1.default(FakeSet);
exports.default = FakeSet;
