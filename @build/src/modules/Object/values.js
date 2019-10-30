"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys_js_1 = require("./keys.js");
const util_js_1 = require("../util.js");
exports.default = "values" in util_js_1._Object
    ? util_js_1._Object.values
    : function Object_values(a) {
        const arr = [];
        const keyArr = keys_js_1.default(a);
        keyArr.forEach(i => arr.push(a[i]));
        return arr;
    };
