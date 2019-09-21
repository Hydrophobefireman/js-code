import { s } from "../constants.js";
let entries: () => IterableIterator<[any, any]>,
  values: () => IterableIterator<any>,
  keys: () => IterableIterator<any>;
type FakeSet = import("./index").default<any>;
if (typeof Symbol !== "undefined") {
  entries = function entries(this: FakeSet): IterableIterator<any> {
    return setKeyValIterator(this, true);
  };
  function setKeyValIterator(set: FakeSet, isDup: boolean) {
    const _ = set[s];
    let i = 0;
    const len = _.length;
    const obj: IterableIterator<any> = {
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
    return obj;
  }
  values = function values(this: FakeSet) {
    return setKeyValIterator(this, false);
  };
  keys = function keys(this: FakeSet) {
    return setKeyValIterator(this, false);
  };
} else {
  entries = keys = values = function() {
    console.warn("no symbol support");
  } as never;
}
export default { keys, values, entries };
