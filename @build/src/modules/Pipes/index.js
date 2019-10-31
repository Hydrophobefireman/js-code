"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _clone(arr) {
    const len = arr.length;
    const ret = Array(len);
    for (let i = 0; i < len; i++) {
        ret[i] = arr[i];
    }
    return ret;
}
class Pipe {
    constructor(func, _batch, reusable) {
        this._batch = _batch;
        this.reusable = reusable;
        this._buffer = [func];
        this._value = null;
    }
    _commitBuffers() {
        let fn;
        const buf = this.reusable ? _clone(this._buffer) : this._buffer;
        while ((fn = buf.shift())) {
            this._value = fn(this._value);
        }
    }
    through(nextFunc) {
        this._buffer.push(nextFunc);
        return this;
    }
    get(arg) {
        this._value = arg;
        if (!this._batch)
            this._commitBuffers();
        return this;
    }
    value() {
        if (this._batch)
            this._commitBuffers();
        return this._value;
    }
}
exports.Pipe = Pipe;
class AsyncPipe extends Pipe {
    constructor(func, reusable) {
        super(func, true, reusable);
        this.reusable = reusable;
        this._buffer = [func];
    }
    async _commitBuffers() {
        let fn;
        const buf = this.reusable ? _clone(this._buffer) : this._buffer;
        while ((fn = buf.shift())) {
            this._value = await fn(this._value);
        }
    }
    async value() {
        await this._commitBuffers();
        return this._value;
    }
}
exports.AsyncPipe = AsyncPipe;
