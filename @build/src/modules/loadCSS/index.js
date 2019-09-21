"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const warnings_js_1 = require("../warnings.js");
const assign_js_1 = __importDefault(require("../Object/assign.js"));
const append_js_1 = __importDefault(require("../Element/append.js"));
function loadCSS(url) {
    warnings_js_1.browserOnlyWarning._throw();
    const link = assign_js_1.default(document.createElement("link"), {
        rel: "stylesheet",
        href: url
    });
    return new Promise((res, rej) => {
        const opt = { once: true };
        link.addEventListener("load", () => res(), opt);
        link.addEventListener("error", () => rej(), opt);
        append_js_1.default(document.head, link);
    });
}
exports.default = loadCSS;
