"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wait(m) {
    return new Promise(resolve => setTimeout(resolve, m));
}
function retry(fn, max = 3, waitInMS, bind) {
    return async function () {
        let tries = 0;
        while (tries < max) {
            try {
                return await Promise.resolve(fn.apply(bind, [].slice.call(arguments)));
            }
            catch (e) {
                tries++;
                if (waitInMS)
                    await wait(waitInMS);
            }
        }
        throw new Error("function " + (fn.name || "") + " failed " + max + " times");
    };
}
exports.default = retry;
