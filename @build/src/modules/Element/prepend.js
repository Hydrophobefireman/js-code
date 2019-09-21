"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const warnings_js_1 = require("../warnings.js");
const util_js_1 = require("../util.js");
function Element_prepend(element) {
    warnings_js_1.browserOnlyWarning._throw();
    if (!element)
        throw new Error("cannot prepend elements");
    const args = util_js_1.emptyArr.slice.call(arguments, 1);
    if (util_js_1.has("prepend", element)) {
        return element.prepend.apply(element, args);
    }
    const frag = util_js_1._generateDocFrag(args);
    element.insertBefore(frag, element.firstChild);
}
exports.default = Element_prepend;
