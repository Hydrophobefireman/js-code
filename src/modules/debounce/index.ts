export function debounce<T>(time: number, fn: (...a: unknown[]) => T) {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: unknown) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(
      () => fn.apply(context, (arguments as unknown) as unknown[]),
      time || 400
    );
  };
}
