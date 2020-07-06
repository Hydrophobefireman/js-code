"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function debounce(time, fn) {
    let timer;
    return function () {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(context, arguments), time || 400);
    };
}
exports.debounce = debounce;
