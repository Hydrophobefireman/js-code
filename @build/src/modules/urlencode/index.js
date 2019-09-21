"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_js_1 = require("../util.js");
const keys_js_1 = require("../Object/keys.js");
util_js_1.patchGlobalThis();
function urlencode(a) {
    if (globalThis.URLSearchParams) {
        return new URLSearchParams(a).toString();
    }
    else {
        return `${keys_js_1.default(a)
            .map((b) => `${encodeURIComponent(b)}=${encodeURIComponent(a[b])}`)
            .join("&")}`;
    }
}
exports.default = urlencode;
