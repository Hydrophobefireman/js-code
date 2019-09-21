import { s } from "../constants.js";
interface FakeSet<T> {
    add(value: T): this;
    clear(): void;
    delete(value: T): boolean;
    forEach(callbackfn: (value: T, value2: T, set: FakeSet<T>) => void, thisArg?: any): void;
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
}
declare const FakeSet: FakeSetConstructor;
export default FakeSet;
