"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_js_1 = require("../util.js");
exports.default = "keys" in util_js_1._Object
    ? util_js_1._Object.keys
    : function Object_keys(a) {
        const arr = [];
        for (const i in a)
            util_js_1.hasOwnProp.call(a, i) && arr.push(i);
        return arr;
    };
