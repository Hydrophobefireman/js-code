function wait(m: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, m));
}
export default function retry<T>(
  fn: (...a: any[]) => T,
  max: number = 3,
  waitInMS?: number,
  bind?: any
): () => Promise<T> {
  return async function() {
    let tries = 0;
    while (tries < max) {
      try {
        return await Promise.resolve(fn.apply(bind, [].slice.call(arguments)));
      } catch (e) {
        tries++;
        if (waitInMS) await wait(waitInMS);
      }
    }
    throw new Error(
      "function " + (fn.name || "") + " failed " + max + " times"
    );
  };
}
