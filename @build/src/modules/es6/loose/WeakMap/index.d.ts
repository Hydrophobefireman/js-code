export declare const patchObjectSealingMethods: () => void;
export declare const patchPropertyDescriptorMethods: () => void;
interface FakeWeakMap<K extends object, V> {
    delete(key: K): boolean;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value: V): this;
    [Symbol.toStringTag]: string;
    _id: number;
}
interface FakeWeakMapConstructor {
    new <K extends object = object, V = any>(entries?: ReadonlyArray<[K, V]> | null, forceUseCustomImplementation?: boolean): FakeWeakMap<K, V>;
    [Symbol.species]: FakeWeakMapConstructor;
    prototype: FakeWeakMap<object, any>;
}
/**
 * this implementation holds the value in the key itself instead of holding the key as
 * a reference.
 * however, we need to patch Object.{freeze,seal,preventExtensions}
 * or WeakMaps on previously frozen objects would not work
 *
 */
declare const FakeWeakMap: FakeWeakMapConstructor;
export default FakeWeakMap;
