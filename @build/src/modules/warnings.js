"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
// import { isBrowser } from "./util.js";
exports.browserOnlyWarning = {
    warn(msg) {
        if (!util_1.isBrowser) {
            return console.warn(msg || "Some functionality may only work in a browser. Expect errors");
        }
    },
    _throw(msg) {
        if (!util_1.isBrowser)
            throw new Error(msg || "A web browser is required for this module to run!");
    }
};
