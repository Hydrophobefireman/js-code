export function patchGlobalThis() {
    /** no idea how to write this function in sane typescript */
    if (typeof globalThis === "object")
        return globalThis;
    Object.defineProperty(Object.prototype, "___this", {
        get: function () {
            return this;
        },
        configurable: true,
    });
    ___this.globalThis = ___this;
    const r = ___this;
    delete Object.prototype.___this;
    return r;
}
const global = patchGlobalThis();
export const _Sym = global.Symbol || {};
export const has = (a, b) => a in b;
export const emptyObj = {};
export const emptyArr = [];
export const isIterable = (k) => k && !!k[_Sym.iterator];
export const _Object = emptyObj.constructor;
export const hasOwnProp = emptyObj.hasOwnProperty;
export function _generateDocFrag(args) {
    const frag = document.createDocumentFragment();
    args.forEach((arg) => frag.appendChild(arg instanceof Node ? arg : document.createTextNode(String(arg))));
    return frag;
}
export const domContext = typeof window !== "undefined" &&
    ((window.navigator && !!window.navigator.userAgent) ||
        (window.document && !!document.createElement));
export const workerContext = typeof self !== "undefined" &&
    !!self.postMessage &&
    typeof global
        .importScripts === "function";
export const isBrowser = domContext || workerContext;
