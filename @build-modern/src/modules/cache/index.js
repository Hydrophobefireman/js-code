import FakeMap from "../es6/loose/Map/index";
const defaultOptions = {
    isAsync: false,
    resolver(args) {
        return String(args[0]);
    },
};
export function cache(func, options) {
    options = options || {};
    const resolver = options.resolver || defaultOptions.resolver;
    const cachedResults = new FakeMap();
    const isAsync = options.isAsync || defaultOptions.isAsync;
    function cached() {
        const argsArray = [].slice.call(arguments);
        const key = resolver(argsArray);
        const ret = cachedResults.get(key);
        if (ret)
            return ret;
        const result = func.apply(null, argsArray);
        if (!isAsync) {
            cachedResults.set(key, result);
            return result;
        }
        return result.then((value) => {
            cachedResults.set(key, value);
            return value;
        });
    }
    cached._Map = cachedResults;
    return cached;
}
