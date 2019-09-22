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
async function base64ToArrayBuffer(b64) {
    warnings_js_1.browserOnlyWarning._throw();
    const data = await fetch(`data:,${b64}`);
    return await data.arrayBuffer();
}
exports.default = base64ToArrayBuffer;
