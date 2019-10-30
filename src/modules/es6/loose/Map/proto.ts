import { m, _EqCheck as is, normalizeNegativeZero } from "../constants.js";
import symbolProps from "./_Symbol.js";
import assign from "../../../Object/assign.js";
function __i_getMapArr(that: import("./index").default<any, any>, k: any) {
  const arr = that[m];
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    const x = arr[i];
    if (is(x[0], k)) return x;
  }
  return null;
}
export default function setPrototypeProps(
  FakeMap: import("./index").FakeMapConstructor
) {
  FakeMap.prototype.set = function set(k, v) {
    const prevArr = __i_getMapArr(this, k);
    if (prevArr) {
      prevArr[1] = v;
    } else {
      this[m].push([normalizeNegativeZero(k), v]);
    }
    return this;
  };
  FakeMap.prototype.has = function has(key) {
    return !!__i_getMapArr(this, key);
  };
  FakeMap.prototype.delete = function del(k) {
    let had: boolean = false;
    this[m] = this[m].filter(x => {
      const c = !is(x[0], k);
      if (!c) had = true;
      return c;
    });
    return had;
  };
  FakeMap.prototype.get = function get(key) {
    const arr = __i_getMapArr(this, key);
    return arr ? arr[1] : undefined;
  };
  FakeMap.prototype.forEach = function forEach(cb, that) {
    const arr = this[m];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      const val = arr[i];
      const a = val[1],
        b = val[0],
        c = this;
      that ? cb.call(that, a, b, c) : cb(a, b, c);
    }
  };

  FakeMap.prototype.clear = function clear() {
    return void (this[m].length = 0);
  };
  Object.defineProperty(FakeMap.prototype, "size", {
    enumerable: false,
    configurable: true,
    get: function(this: import("./index").default<any, any>) {
      return this[m].length;
    }
  });
  if (typeof Symbol !== "undefined") {
    FakeMap.prototype[Symbol.iterator] = symbolProps.entries;
    FakeMap.prototype[Symbol.toStringTag] = "Map";
  }
  assign(FakeMap.prototype, symbolProps);
}
