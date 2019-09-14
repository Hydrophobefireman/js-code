import { has, patchGlobalThis } from "../../util";
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
  return Math.random();
}

export function initializeInternalKeyProp(obj, key) {
  if (key in obj) return;
  Object.defineProperty(obj, key, { value: {}, enumerable: false });
}

export function patchObjectSealingMethods(key) {
  /**
   *
   * @param {"seal"|"freeze"|"preventExtensions"} m
   */
  function _patch(m) {
    const method = Object[m];
    Object[m] = function FakeMethod(obj) {
      initializeInternalKeyProp(obj, key);
      return method(obj);
    };
  }
  ["freeze", "seal", "preventExtensions"].forEach(_patch);
}

export function isObjectOrThrow(i) {
  if (Object(i) !== i) {
    throw new Error("Invalid value");
  }
}