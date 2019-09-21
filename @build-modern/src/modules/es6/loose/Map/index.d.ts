import { m } from "../constants.js";
interface FakeMap<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: FakeMap<K, V>) => void, thisArg?: any): void;
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
declare const FakeMap: FakeMapConstructor;
export default FakeMap;
