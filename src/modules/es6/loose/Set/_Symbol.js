import { s } from "../constants.js";
let entries, values, keys;
if (typeof Symbol !== "undefined") {
  function setEntriesIterator(set) {
    const _ = set[s];
    const c = _[Symbol.iterator];
    return c.call(_);
  }
  entries = function entries() {
    return setKeyValIterator(this, true);
  };
  function setKeyValIterator(set, isDup) {
    const _ = set[s];
    let i = 0;
    const len = _.length;
    return {
      [Symbol.toStringTag]: "Set Iterator",
      [Symbol.iterator]: function() {
        return this;
      },
      next: function() {
        if (i < len) {
          const v = _[i++];
          return { value: isDup ? [v, v] : v, done: false };
        }
        return { value: void 0, done: true };
      }
    };
  }
  values = function values() {
    return setKeyValIterator(this, false);
  };
  keys = function keys() {
    return setKeyValIterator(this, false);
  };
} else {
  entries = keys = values = function() {
    console.warn("no symbol support");
  };
}
export default { keys, values, entries };
