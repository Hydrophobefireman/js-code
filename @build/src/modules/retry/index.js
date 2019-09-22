"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function retry(fn, max, bind) {
    max = max || 3;
    return async function () {
        let tries = 0;
        while (tries < max) {
            try {
                return await fn.apply(bind, [].slice.call(arguments));
            }
            catch (e) {
                tries++;
            }
        }
        throw new Error("function " + (fn.name || "") + " failed " + max + " times");
    };
}
exports.default = retry;
