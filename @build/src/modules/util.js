"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function patchGlobalThis() {
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
exports.patchGlobalThis = patchGlobalThis;
const global = patchGlobalThis();
exports._Sym = global.Symbol || {};
exports.has = (a, b) => a in b;
exports.emptyObj = {};
exports.emptyArr = [];
exports.isIterable = (k) => k && !!k[exports._Sym.iterator];
exports._Object = exports.emptyObj.constructor;
exports.hasOwnProp = exports.emptyObj.hasOwnProperty;
function _generateDocFrag(args) {
    const frag = document.createDocumentFragment();
    args.forEach((arg) => frag.appendChild(arg instanceof Node ? arg : document.createTextNode(String(arg))));
    return frag;
}
exports._generateDocFrag = _generateDocFrag;
exports.domContext = typeof window !== "undefined" &&
    ((window.navigator && !!window.navigator.userAgent) ||
        (window.document && !!document.createElement));
exports.workerContext = typeof self !== "undefined" &&
    !!self.postMessage &&
    typeof global
        .importScripts === "function";
exports.isBrowser = exports.domContext || exports.workerContext;
