interface CacheOptions {
    isAsync?: boolean;
    resolver?(...a: unknown[]): string | number | symbol;
}
interface UnknownFunction<T> {
    (...a: unknown[]): T;
}
export declare function cache<T>(func: UnknownFunction<T | Promise<T>>, options?: CacheOptions): UnknownFunction<T | Promise<T>>;
export {};
