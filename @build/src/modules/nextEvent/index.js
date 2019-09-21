"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function nextEvent(obj, event) {
    return new Promise(res => obj.addEventListener(event, res, { once: true }));
}
exports.default = nextEvent;
