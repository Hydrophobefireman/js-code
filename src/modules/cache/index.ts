import FakeMap from "../es6/loose/Map/index";

interface CacheOptions {
  isAsync?: boolean;
  resolver?(...a: unknown[]): string | number | symbol;
}
const defaultOptions: CacheOptions = {
  isAsync: false,
  resolver(args: Array<unknown>) {
    return String(args[0]);
  },
};

interface UnknownFunction<T> {
  (...a: unknown[]): T;
}

export function cache<T>(
  func: UnknownFunction<T | Promise<T>>,
  options?: CacheOptions
): UnknownFunction<T | Promise<T>> {
  options = options || {};
  const resolver = options.resolver || defaultOptions.resolver;
  const cachedResults = new FakeMap<string | number | symbol, T>();

  const isAsync = options.isAsync || defaultOptions.isAsync;

  function cached(...a: unknown[]): T | Promise<T>;
  function cached(): T | Promise<T> {
    const argsArray = [].slice.call(arguments);
    const key = (resolver as any)(argsArray);

    const ret = cachedResults.get(key);
    if (ret) return ret;

    const result = func.apply(null, argsArray);
    if (!isAsync) {
      cachedResults.set(key, result as T);
      return result;
    }
    return (result as Promise<T>).then((value) => {
      cachedResults.set(key, value as T);
      return value;
    });
  }
  cached._Map = cachedResults;
  return cached;
}
