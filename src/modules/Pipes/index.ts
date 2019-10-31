type anyFunc = (a: any) => any;
type anyAsyncFunc = (a: any) => Promise<any>;
interface PipeInterface {
  readonly _buffer: Array<anyFunc>;
  readonly _batch: boolean;
  _value: any;
  readonly reusable: boolean;
}
function _clone<T>(arr: Array<T>): Array<T> {
  const len = arr.length;
  const ret: Array<T> = Array(len);
  for (let i = 0; i < len; i++) {
    ret[i] = arr[i];
  }
  return ret;
}
export class Pipe implements PipeInterface {
  readonly _buffer: Array<anyFunc>;
  _value: any;
  constructor(
    func: anyFunc,
    readonly _batch: boolean,
    public readonly reusable: boolean
  ) {
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
  constructor(func: anyAsyncFunc, public readonly reusable: boolean) {
    super(func, true, reusable);
    this._buffer = [func];
  }
  async _commitBuffers() {
    let fn: anyAsyncFunc;
    const buf = this.reusable ? _clone(this._buffer) : this._buffer;
    while ((fn = buf.shift() as anyAsyncFunc)) {
      this._value = await fn(this._value);
    }
  }
  async value() {
    await this._commitBuffers();
    return this._value;
  }
}
