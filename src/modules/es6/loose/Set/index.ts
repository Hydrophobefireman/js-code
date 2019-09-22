import { HAS_SET, s } from "../constants.js";
import setup from "./proto.js";
import { isIterable } from "../../../util.js";
import { _classCallCheck } from "../../../../shared.js";
function generateSet(fs: FakeSet<any>, it: Iterable<any> | undefined) {
  if (it == null) return;
  if (!isIterable(it))
    throw new Error("value:" + String(it) + " is not iterable");
  for (const k of it) {
    fs.add(k);
  }
}
interface FakeSet<T> {
  add(value: T): this;
  clear(): void;
  delete(value: T): boolean;
  forEach(
    callbackfn: (value: T, value2: T, set: FakeSet<T>) => void,
    thisArg?: any
  ): void;
  has(value: T): boolean;
  readonly size: number;
  [s]: Array<T>;
  [Symbol.toStringTag]: string;
  [Symbol.iterator](): IterableIterator<T>;
  entries(): IterableIterator<[T, T]>;
  keys(): IterableIterator<T>;
  values(): IterableIterator<T>;
}

export interface FakeSetConstructor {
  new <T = any>(values?: ReadonlyArray<T> | null): FakeSet<T>;
  readonly prototype: FakeSet<any>;
  [Symbol.species]: FakeSetConstructor;
}

const FakeSet = (function FakeSet<T>(
  this: FakeSet<T>,
  iterable?: Iterable<T>,
  forceUseCustomImplementation?: boolean
) {
  if (!forceUseCustomImplementation && HAS_SET) return new Set(iterable);
  _classCallCheck(this, FakeSet);
  this[s] = [];
  generateSet(this, iterable);
} as any) as FakeSetConstructor;
setup(FakeSet);
FakeSet[Symbol.species] = FakeSet;
export default FakeSet;
