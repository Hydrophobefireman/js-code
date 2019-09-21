"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../constants.js");
let entries, values, keys;
if (typeof Symbol !== "undefined") {
    entries = function entries() {
        return setKeyValIterator(this, true);
    };
    function setKeyValIterator(set, isDup) {
        const _ = set[constants_js_1.s];
        let i = 0;
        const len = _.length;
        const obj = {
            [Symbol.iterator]: function () {
                return this;
            },
            next: function () {
                if (i < len) {
                    const v = _[i++];
                    return { value: isDup ? [v, v] : v, done: false };
                }
                return { value: void 0, done: true };
            }
        };
        return obj;
    }
    values = function values() {
        return setKeyValIterator(this, false);
    };
    keys = function keys() {
        return setKeyValIterator(this, false);
    };
}
else {
    entries = keys = values = function () {
        console.warn("no symbol support");
    };
}
exports.default = { keys, values, entries };
