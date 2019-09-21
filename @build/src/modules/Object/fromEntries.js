"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_js_1 = require("../util.js");
exports.default = "fromEntries" in util_js_1._Object
    ? util_js_1._Object.fromEntries
    : function Object_fromEntries(entries) {
        const ret = {};
        entries.forEach((k) => (ret[k[0]] = k[1]));
        return ret;
    };
