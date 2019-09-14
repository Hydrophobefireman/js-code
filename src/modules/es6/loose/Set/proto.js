import { s, _EqCheck as is, normalizeNegativeZero } from "../constants.js";
import symbolProps from "./_Symbol.js";
import assign from "../../../Object/assign.js";

export default function setPrototypeProps(FakeSet) {
  FakeSet.prototype.add = function set(k) {
    if (!this.has(k)) this[s].push(normalizeNegativeZero(k));
    return this;
  };
  FakeSet.prototype.has = function has(key) {
    for (const i of this[s]) {
      if (is(i, key)) return true;
    }
    return false;
  };
  FakeSet.prototype.delete = function del(k) {
    this[s] = this[s].filter(x => !is(x, k));
  };
  FakeSet.prototype.forEach = function forEach(cb, that) {
    for (const arr of this[s]) {
      const a = arr,
        c = this;
      that ? cb.call(that, a, a, c) : cb(a, a, c);
    }
  };

  FakeSet.prototype.clear = function clear() {
    return void (this[s].length = 0);
  };
  Object.defineProperty(FakeSet.prototype, "size", {
    enumerable: false,
    configurable: true,
    get: function() {
      return this[s].length;
    }
  });
  if (typeof Symbol !== "undefined") {
    FakeSet.prototype[Symbol.iterator] = symbolProps.values;
    FakeSet.prototype[Symbol.toStringTag] = "Set";
  }
  assign(FakeSet.prototype, symbolProps);
}
