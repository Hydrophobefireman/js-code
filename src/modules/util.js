/**
 * @returns {globalThis}
 */
export function patchGlobalThis() {
  if (typeof globalThis === "object") return globalThis;
  Object.defineProperty(Object.prototype, "___this", {
    get: function() {
      return this;
    },
    configurable: true
  });
  ___this.globalThis = ___this;
  const r = ___this;
  delete Object.prototype.___this;
  return r;
}
patchGlobalThis();
const _Sym = globalThis.Symbol || {};

/**
 *
 * @param {string|number|symbol} a
 * @param {object} b
 * @returns {boolean}
 */
export const has = (a, b) => a in b;

export const emptyObj = {};
export const emptyArr = [];

/**
 *
 * @param {any} k
 */
export const isIterable = k => k && !!k[_Sym.iterator];
export const _Object = emptyObj.constructor;
export const hasOwnProp = emptyObj.hasOwnProperty;

export function _generateDocFrag(args) {
  const frag = document.createDocumentFragment();
  args.forEach(arg =>
    frag.appendChild(
      arg instanceof Node ? arg : document.createTextNode(String(arg))
    )
  );
  return frag;
}
export function checkAndPatch(o, prop, opt) {
  if (prop in o) {
    const val = o[prop];
    const patch = opt.patch,
      name = opt.name;
    if (opt.bind) {
      patch[name] = val.bind(opt.bind);
    } else {
      patch[name] = val;
    }

    return true;
  }
  return false;
}
export const isBrowser =
  typeof window !== "undefined" &&
  ((window.navigator && !!window.navigator.userAgent) ||
    (window.document && !!document.createElement));

export const defer =
  typeof Promise == "function"
    ? Promise.prototype.then.bind(Promise.resolve())
    : setTimeout;
