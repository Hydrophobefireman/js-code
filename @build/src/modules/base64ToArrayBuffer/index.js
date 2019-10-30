"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const warnings_js_1 = require("../warnings.js");
/**
 * base64 string to Array Buffer using Fetch API
 *
 * Only works in Browser environment
 *
 * @param b64 {string} string to get as ArrayBuffer
 */
function base64ToArrayBuffer(b64) {
    warnings_js_1.browserOnlyWarning._throw();
    const data = fetch("data:," + b64);
    return data.then(x => x.arrayBuffer());
}
exports.default = base64ToArrayBuffer;
