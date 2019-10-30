import { s, _EqCheck as is, normalizeNegativeZero } from "../constants.js";
import symbolProps from "./_Symbol.js";
import assign from "../../../Object/assign.js";
export default function setPrototypeProps(FakeSet) {
    FakeSet.prototype.add = function set(k) {
        if (!this.has(k))
            this[s].push(normalizeNegativeZero(k));
        return this;
    };
    FakeSet.prototype.has = function has(key) {
        const arr = this[s];
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            const x = arr[i];
            if (is(x, key))
                return true;
        }
        return false;
    };
    FakeSet.prototype.delete = function del(k) {
        let had = false;
        this[s] = this[s].filter(x => {
            const c = !is(x, k);
            if (!c)
                had = true;
            return c;
        });
        return had;
    };
    FakeSet.prototype.forEach = function forEach(cb, that) {
        const arr = this[s];
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            const val = arr[i];
            const a = val, c = this;
            that ? cb.call(that, a, a, c) : cb(a, a, c);
        }
    };
    FakeSet.prototype.clear = function clear() {
        return void (this[s].length = 0);
    };
    Object.defineProperty(FakeSet.prototype, "size", {
        enumerable: false,
        configurable: true,
        get: function () {
            return this[s].length;
        }
    });
    if (typeof Symbol !== "undefined") {
        FakeSet.prototype[Symbol.iterator] = symbolProps.values;
        FakeSet.prototype[Symbol.toStringTag] = "Set";
    }
    assign(FakeSet.prototype, symbolProps);
}
