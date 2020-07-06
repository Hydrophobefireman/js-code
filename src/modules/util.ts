declare var ___this: { globalThis: Window };
export function patchGlobalThis(): typeof globalThis {
  /** no idea how to write this function in sane typescript */
  if (typeof globalThis === "object") return globalThis;
  Object.defineProperty(Object.prototype, "___this", {
    get: function () {
      return this;
    },
    configurable: true,
  });
  ___this.globalThis = (___this as any) as Window;
  const r: typeof globalThis = ___this as any;
  delete (Object.prototype as any).___this;
  return r;
}
const global = patchGlobalThis();

export const _Sym = global.Symbol || {};

export const has = (a: string | number | symbol, b: object) => a in b;

export const emptyObj = {};
export const emptyArr = [];

export const isIterable = (k: any) => k && !!k[_Sym.iterator];

export const _Object: ObjectConstructor = emptyObj.constructor as ObjectConstructor;

export const hasOwnProp = emptyObj.hasOwnProperty;

export function _generateDocFrag(
  args: (Node | (string | number | boolean | symbol))[]
) {
  const frag = document.createDocumentFragment();
  args.forEach((arg) =>
    frag.appendChild(
      arg instanceof Node ? arg : document.createTextNode(String(arg))
    )
  );
  return frag;
}

export const domContext =
  typeof window !== "undefined" &&
  ((window.navigator && !!window.navigator.userAgent) ||
    (window.document && !!document.createElement));

export const workerContext =
  typeof self !== "undefined" &&
  !!self.postMessage &&
  typeof ((global as any) as { importScripts: (src: string) => any })
    .importScripts === "function";
export const isBrowser = domContext || workerContext;
