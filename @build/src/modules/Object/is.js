"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_js_1 = require("../util.js");
exports.default = "is" in util_js_1._Object
    ? util_js_1._Object.is
    : function is(x, y) {
        if (x === y) {
            return x !== 0 || 1 / x === 1 / y;
        }
        else {
            return x !== x && y !== y;
        }
    };
