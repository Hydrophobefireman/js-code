import { m } from "../constants.js";
let entries: () => IterableIterator<[any, any]>;
let values: () => IterableIterator<any>;
let keys: () => IterableIterator<any>;
type FakeMap = import("./index").default<any, any>;
if (typeof Symbol !== "undefined") {
  function mapEntriesIterator(map: FakeMap): IterableIterator<[any, any]> {
    const _ = map[m];
    return _[Symbol.iterator]();
  }
  entries = function entries(this: FakeMap) {
    return mapEntriesIterator(this);
  };
  function mapKeyValIterator(map: FakeMap, isKey: boolean) {
    const _ = map[m];
    let i = 0;
    const len = _.length;
    const kv = isKey ? 0 : 1;
    const obj: IterableIterator<[any, any]> = {
      [Symbol.iterator]: function() {
        return this;
      },
      next: function() {
        if (i < len) {
          return { value: _[i++][kv], done: false };
        }
        return { value: void 0, done: true };
      }
    };
    return obj;
  }
  values = function values(this: FakeMap) {
    return mapKeyValIterator(this, false);
  };
  keys = function keys(this: FakeMap) {
    return mapKeyValIterator(this, true);
  };
} else {
  entries = keys = values = function() {
    console.warn("no symbol support");
  } as never;
}
export default { keys, values, entries };
