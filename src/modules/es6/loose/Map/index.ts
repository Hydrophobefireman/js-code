import { HAS_MAP, m } from "../constants.js";
import setup from "./proto.js";
import { isIterable } from "../../../util.js";
import { _classCallCheck } from "../../../../shared.js";
function generateMap(fm: FakeMap<any, any>, it: Iterable<any> | undefined) {
  if (it == null) return;
  if (!isIterable(it))
    throw new Error("value:" + String(it) + " is not iterable");
  for (const k of it) {
    if (!k || k.length !== 2) throw new Error("invalid arg");
    fm.set(k[0], k[1]);
  }
}
interface FakeMap<K, V> {
  clear(): void;
  delete(key: K): boolean;
  forEach(
    callbackfn: (value: V, key: K, map: FakeMap<K, V>) => void,
    thisArg?: any
  ): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): this;
  readonly size: number;
  [m]: Array<[K, V]>;
  [Symbol.toStringTag]: string;
  [Symbol.iterator](): IterableIterator<[K, V]>;
  values(): IterableIterator<V>;
  keys(): IterableIterator<K>;
  entries(): IterableIterator<[K, V]>;
}

export interface FakeMapConstructor {
  new (): FakeMap<any, any>;
  new <K, V>(entries?: ReadonlyArray<readonly [K, V]> | null): FakeMap<K, V>;
  readonly prototype: FakeMap<any, any>;
  [Symbol.species]: FakeMapConstructor;
}

/**
 * Map implementation
 *
 * This Implementation uses One single array to store keys and values in their own arrays
 * Key index - 0
 * Value index - 1
 * 
 * we could have used 2 separate Arrays for storing keys and values in matching indices
 * @TODO do a benchmark
 */
const FakeMap = (function FakeMap<K, V>(
  this: FakeMap<K, V>,
  iterable?: Iterable<[K, V]>,
  forceUseCustomImplementation?: boolean
): FakeMap<K, V> | Map<K, V> {
  if (!forceUseCustomImplementation && HAS_MAP)
    return new Map(iterable as Iterable<[K, V]>);
  _classCallCheck(this, FakeMap);
  this[m] = [];
  generateMap(this, iterable);
  return this;
} as any) as FakeMapConstructor;
setup(FakeMap);
FakeMap[Symbol.species] = FakeMap;
export default FakeMap;
