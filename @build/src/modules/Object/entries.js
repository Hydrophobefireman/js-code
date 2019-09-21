"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const keys_js_1 = require("./keys.js");
const util_js_1 = require("../util.js");
exports.default = "entries" in util_js_1._Object
    ? util_js_1._Object.entries
    : function Object_entries(a) {
        const keys = keys_js_1.default(a);
        let kLen = keys.length;
        const ret = Array(kLen);
        while (kLen--) {
            const p = keys[kLen];
            ret[kLen] = [p, a[p]];
        }
        return ret;
    };
