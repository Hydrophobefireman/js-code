"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_js_1 = require("../constants.js");
const _Symbol_js_1 = require("./_Symbol.js");
const assign_js_1 = require("../../../Object/assign.js");
function __i_getMapArr(that, k) {
    const arr = that[constants_js_1.m];
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const x = arr[i];
        if (constants_js_1._EqCheck(x[0], k))
            return x;
    }
    return null;
}
function setPrototypeProps(FakeMap) {
    FakeMap.prototype.set = function set(k, v) {
        const prevArr = __i_getMapArr(this, k);
        if (prevArr) {
            prevArr[1] = v;
        }
        else {
            this[constants_js_1.m].push([constants_js_1.normalizeNegativeZero(k), v]);
        }
        return this;
    };
    FakeMap.prototype.has = function has(key) {
        return !!__i_getMapArr(this, key);
    };
    FakeMap.prototype.delete = function del(k) {
        let had = false;
        this[constants_js_1.m] = this[constants_js_1.m].filter(x => {
            const c = !constants_js_1._EqCheck(x[0], k);
            if (!c)
                had = true;
            return c;
        });
        return had;
    };
    FakeMap.prototype.get = function get(key) {
        const arr = __i_getMapArr(this, key);
        return arr ? arr[1] : undefined;
    };
    FakeMap.prototype.forEach = function forEach(cb, that) {
        const arr = this[constants_js_1.m];
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            const val = arr[i];
            const a = val[1], b = val[0], c = this;
            that ? cb.call(that, a, b, c) : cb(a, b, c);
        }
    };
    FakeMap.prototype.clear = function clear() {
        return void (this[constants_js_1.m].length = 0);
    };
    Object.defineProperty(FakeMap.prototype, "size", {
        enumerable: false,
        configurable: true,
        get: function () {
            return this[constants_js_1.m].length;
        }
    });
    if (typeof Symbol !== "undefined") {
        FakeMap.prototype[Symbol.iterator] = _Symbol_js_1.default.entries;
        FakeMap.prototype[Symbol.toStringTag] = "Map";
    }
    assign_js_1.default(FakeMap.prototype, _Symbol_js_1.default);
}
exports.default = setPrototypeProps;
