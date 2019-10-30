export default function retry<T>(
  fn: (...a: any[]) => T,
  max: number,
  bind: any
): () => Promise<T> {
  max = max || 3;
  return async function() {
    let tries = 0;
    while (tries < max) {
      try {
        return await Promise.resolve(fn.apply(bind, [].slice.call(arguments)));
      } catch (e) {
        tries++;
      }
    }
    throw new Error(
      "function " + (fn.name || "") + " failed " + max + " times"
    );
  };
}
