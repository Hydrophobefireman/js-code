"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_js_1 = require("../util.js");
exports.default = "assign" in util_js_1._Object
    ? util_js_1._Object.assign
    : function Object_assign(target) {
        for (let i = 1; i < arguments.length; i++) {
            const source = arguments[i];
            for (const key in source) {
                if (util_js_1.hasOwnProp.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
