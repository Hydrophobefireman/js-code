import { has, patchGlobalThis } from "../../util.js";
import keys from "../../Object/keys.js";
const e = {};
const gl = patchGlobalThis();
export function _getCryptoOrMathRandom() {
    const hasCrypto = has("crypto", gl);
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
export function initializeInternalKeyProp(obj, key) {
    if (key in obj)
        return;
    Object.defineProperty(obj, key, { value: {}, enumerable: false });
}
export function _patchObjectSealingMethods(key) {
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
export function isObjectOrThrow(i) {
    if (Object(i) !== i) {
        throw new Error("Invalid value");
    }
}
export function _patchPropertyDescriptorMethods(key) {
    if (has("getOwnPropertyDescriptors", Object)) {
        const oldOPD = Object.getOwnPropertyDescriptors;
        Object.getOwnPropertyDescriptors = function (o) {
            const prevDescriptors = oldOPD(o);
            const ret = {};
            keys(prevDescriptors).forEach(x => {
                if (x !== key)
                    ret[x] = prevDescriptors[x];
            });
            return ret;
        };
    }
    if (has("getOwnPropertyNames", Object)) {
        const oldOPN = Object.getOwnPropertyNames;
        Object.getOwnPropertyNames = function (o) {
            return oldOPN(o).filter(x => x !== key);
        };
    }
}
