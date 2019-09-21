"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const warnings_js_1 = require("../warnings.js");
const util_js_1 = require("../util.js");
function Element_append(element) {
    warnings_js_1.browserOnlyWarning._throw();
    if (!element)
        throw new Error("cannot append elements");
    const args = util_js_1.emptyArr.slice.call(arguments, 1);
    if (util_js_1.has("append", element)) {
        element.append.apply(element, args);
    }
    const frag = util_js_1._generateDocFrag(args);
    element.appendChild(frag);
}
exports.default = Element_append;
