export class Pipe {
    constructor(func, _batch) {
        this._batch = _batch;
        this._buffer = [func];
        this._value = null;
    }
    _commitBuffers() {
        let fn;
        while ((fn = this._buffer.shift())) {
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
export class AsyncPipe extends Pipe {
    constructor(func) {
        super(func, true);
        this._buffer = [func];
    }
    async _commitBuffers() {
        let fn;
        while ((fn = this._buffer.shift())) {
            this._value = await fn(this._value);
        }
    }
    async value() {
        await this._commitBuffers();
        return this._value;
    }
}
