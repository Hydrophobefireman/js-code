import _WeakMap from "../WeakMap/index.js";
interface FakeWeakSet<T extends object> {
    add(value: T): this;
    delete(value: T): boolean;
    has(value: T): boolean;
    __map?: _WeakMap<T, T>;
    readonly [Symbol.toStringTag]: string;
}
interface FakeWeakSetConstructor {
    new <T extends object = object>(values?: ReadonlyArray<T> | null): FakeWeakSet<T>;
    [Symbol.species]: FakeWeakSetConstructor;
    prototype: FakeWeakSet<object>;
}
/**
 * weak set - either use native or use a weakmap (native or pollyfilled..doesnt matter)
 *
 * @returns {WeakSet}
 * @param {Iterable} iterable
 * @param {boolean} forceUseCustomImplementations
 */
declare const FakeWeakSet: FakeWeakSetConstructor;
export default FakeWeakSet;
