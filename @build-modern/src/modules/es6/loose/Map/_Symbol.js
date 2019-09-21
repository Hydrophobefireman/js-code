import { m } from "../constants.js";
let entries, values, keys;
if (typeof Symbol !== "undefined") {
    function mapEntriesIterator(map) {
        const _ = map[m];
        return _[Symbol.iterator]();
    }
    entries = function entries() {
        return mapEntriesIterator(this);
    };
    function mapKeyValIterator(map, isKey) {
        const _ = map[m];
        let i = 0;
        const len = _.length;
        const kv = isKey ? 0 : 1;
        const obj = {
            [Symbol.iterator]: function () {
                return this;
            },
            next: function () {
                if (i < len) {
                    return { value: _[i++][kv], done: false };
                }
                return { value: void 0, done: true };
            }
        };
        return obj;
    }
    values = function values() {
        return mapKeyValIterator(this, false);
    };
    keys = function keys() {
        return mapKeyValIterator(this, true);
    };
}
else {
    entries = keys = values = function () {
        console.warn("no symbol support");
    };
}
export default { keys, values, entries };
