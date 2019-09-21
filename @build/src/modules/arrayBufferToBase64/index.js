"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const warnings_js_1 = require("../warnings.js");
function arrayBufferToBase64(buffer) {
    warnings_js_1.browserOnlyWarning._throw();
    return new Promise((resolve, _) => {
        const blob = new Blob([buffer], {
            type: "application/octet-binary"
        });
        const reader = new FileReader();
        reader.onload = evt => {
            if (evt == null || evt.target == null)
                return null;
            const dataurl = evt.target.result;
            resolve(dataurl.substr(dataurl.indexOf(",") + 1));
        };
        reader.readAsDataURL(blob);
    });
}
exports.default = arrayBufferToBase64;
