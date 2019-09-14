import { m, _EqCheck as is, normalizeNegativeZero } from "../constants";
import symbolProps from "./_Symbol.js";
import assign from "../../../Object/assign.js";
function __i_getMapArr(k) {
  for (const i of this[m]) {
    if (is(i[0], k)) return i;
  }
  return null;
}
export default function setPrototypeProps(FakeMap) {
  FakeMap.prototype.set = function set(k, v) {
    const prevArr = __i_getMapArr.call(this, k);
    if (prevArr) {
      prevArr[1] = v;
    } else {
      this[m].push([normalizeNegativeZero(k), v]);
    }
    return this;
  };
  FakeMap.prototype.has = function has(key) {
    return !!__i_getMapArr.call(this, key);
  };
  FakeMap.prototype.delete = function del(k) {
    this[m] = this[m].filter(x => !is(x[0], k));
  };
  FakeMap.prototype.get = function get(key) {
    const arr = __i_getMapArr.call(this, key);
    return arr ? arr[1] : undefined;
  };
  FakeMap.prototype.forEach = function forEach(cb, that) {
    for (const arr of this[m]) {
      const a = arr[1],
        b = arr[0],
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
    get: function() {
      return this[m].length;
    }
  });
  if (typeof Symbol !== "undefined") {
    FakeMap.prototype[Symbol.iterator] = symbolProps.entries;
    FakeMap.prototype[Symbol.toStringTag] = "Map";
  }
  assign(FakeMap.prototype, symbolProps);
}
