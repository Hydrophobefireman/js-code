"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../constants.js");
const _Symbol_js_1 = require("./_Symbol.js");
const assign_js_1 = require("../../../Object/assign.js");
function setPrototypeProps(FakeSet) {
    FakeSet.prototype.add = function set(k) {
        if (!this.has(k))
            this[constants_js_1.s].push(constants_js_1.normalizeNegativeZero(k));
        return this;
    };
    FakeSet.prototype.has = function has(key) {
        const arr = this[constants_js_1.s];
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            const x = arr[i];
            if (constants_js_1._EqCheck(x, key))
                return true;
        }
        return false;
    };
    FakeSet.prototype.delete = function del(k) {
        let had = false;
        this[constants_js_1.s] = this[constants_js_1.s].filter(x => {
            const c = !constants_js_1._EqCheck(x, k);
            if (!c)
                had = true;
            return c;
        });
        return had;
    };
    FakeSet.prototype.forEach = function forEach(cb, that) {
        const arr = this[constants_js_1.s];
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            const val = arr[i];
            const a = val, c = this;
            that ? cb.call(that, a, a, c) : cb(a, a, c);
        }
    };
    FakeSet.prototype.clear = function clear() {
        return void (this[constants_js_1.s].length = 0);
    };
    Object.defineProperty(FakeSet.prototype, "size", {
        enumerable: false,
        configurable: true,
        get: function () {
            return this[constants_js_1.s].length;
        }
    });
    if (typeof Symbol !== "undefined") {
        FakeSet.prototype[Symbol.iterator] = _Symbol_js_1.default.values;
        FakeSet.prototype[Symbol.toStringTag] = "Set";
    }
    assign_js_1.default(FakeSet.prototype, _Symbol_js_1.default);
}
exports.default = setPrototypeProps;
