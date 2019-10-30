type anyFunc = (a: any) => any;
type anyAsyncFunc = (a: any) => Promise<any>;
interface PipeInterface {
  readonly _buffer: Array<anyFunc>;
  readonly _batch: boolean;
  _value: any;
}
export class Pipe implements PipeInterface {
  readonly _buffer: Array<anyFunc>;
  _value: any;
  constructor(func: anyFunc, readonly _batch: boolean) {
    this._buffer = [func];
    this._value = null;
  }
  _commitBuffers() {
    let fn;
    while ((fn = this._buffer.shift())) {
      this._value = fn(this._value);
    }
  }
  through(nextFunc: anyFunc) {
    this._buffer.push(nextFunc);
    return this;
  }
  get(arg: any) {
    this._value = arg;
    if (!this._batch) this._commitBuffers();
    return this;
  }
  value() {
    if (this._batch) this._commitBuffers();
    return this._value;
  }
}

export class AsyncPipe extends Pipe {
  _buffer: Array<anyAsyncFunc>;
  constructor(func: anyAsyncFunc) {
    super(func, true);
    this._buffer = [func];
  }
  async _commitBuffers() {
    let fn: anyAsyncFunc;
    while ((fn = this._buffer.shift() as anyAsyncFunc)) {
      this._value = await fn(this._value);
    }
  }
  async value() {
    await this._commitBuffers();
    return this._value;
  }
}
