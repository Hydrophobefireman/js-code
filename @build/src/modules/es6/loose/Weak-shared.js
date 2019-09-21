"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_js_1 = require("../../util.js");
const e = {};
const gl = util_js_1.patchGlobalThis();
function _getCryptoOrMathRandom() {
    const hasCrypto = util_js_1.has("crypto", gl);
    let rv;
    if (hasCrypto) {
        rv = gl.crypto.getRandomValues;
        if (rv) {
            rv = rv.bind(crypto);
            return rv(new Uint8Array(10)).join("-");
        }
    }
    return String(Math.random());
}
exports._getCryptoOrMathRandom = _getCryptoOrMathRandom;
function initializeInternalKeyProp(obj, key) {
    if (key in obj)
        return;
    Object.defineProperty(obj, key, { value: {}, enumerable: false });
}
exports.initializeInternalKeyProp = initializeInternalKeyProp;
function _patchObjectSealingMethods(key) {
    function _patch(m) {
        const method = Object[m];
        if (method.__patched === e)
            return;
        let fn;
        fn = Object[m] = function FakeMethod(obj) {
            initializeInternalKeyProp(obj, key);
            return method(obj);
        };
        fn.__patched = e;
    }
    ["freeze", "seal", "preventExtensions"].forEach(i => _patch(i));
}
exports._patchObjectSealingMethods = _patchObjectSealingMethods;
function isObjectOrThrow(i) {
    if (Object(i) !== i) {
        throw new Error("Invalid value");
    }
}
exports.isObjectOrThrow = isObjectOrThrow;
