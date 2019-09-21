"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const warnings_js_1 = require("../warnings.js");
const util_js_1 = require("../util.js");
function Element_after(element) {
    if (!element)
        throw new Error("Cannot add elements to null");
    warnings_js_1.browserOnlyWarning._throw();
    const args = util_js_1.emptyArr.slice.call(arguments, 1);
    if (util_js_1.has("after", element)) {
        return element.after.apply(element, args);
    }
    const frag = util_js_1._generateDocFrag(args);
    const parent = element.parentNode;
    if (parent == null)
        throw new Error("Cannot append elements after orphan");
    parent.insertBefore(frag, element.nextSibling);
}
exports.default = Element_after;
