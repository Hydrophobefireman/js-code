"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const warnings_js_1 = require("../warnings.js");
async function base64ToArrayBuffer(b64) {
    warnings_js_1.browserOnlyWarning._throw();
    const data = await fetch(`data:,${b64}`);
    return await data.arrayBuffer();
}
exports.default = base64ToArrayBuffer;
