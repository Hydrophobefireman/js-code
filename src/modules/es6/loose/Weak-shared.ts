import { has, patchGlobalThis } from "../../util.js";
const e = {};
const gl = patchGlobalThis();
export function _getCryptoOrMathRandom(): string {
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

export function initializeInternalKeyProp(obj: object, key: string): void {
  if (key in obj) return;
  Object.defineProperty(obj, key, { value: {}, enumerable: false });
}
export type sealableMethod = "freeze" | "seal" | "preventExtensions";
export function _patchObjectSealingMethods(key: string) {
  function _patch(m: sealableMethod) {
    const method = Object[m];
    if ((method as any).__patched === e) return;
    let fn: <T>(obj: T[]) => <T>(obj: T[]) => any;
    fn = (Object[m] as any) = function FakeMethod<T>(obj: T[]) {
      initializeInternalKeyProp(obj, key);
      return (method as typeof fn)(obj);
    };
    (fn as any).__patched = e;
  }
  ["freeze", "seal", "preventExtensions"].forEach(i =>
    _patch(i as sealableMethod)
  );
}

export function isObjectOrThrow(i: object): void {
  if (Object(i) !== i) {
    throw new Error("Invalid value");
  }
}
