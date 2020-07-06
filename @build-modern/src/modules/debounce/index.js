export function debounce(time, fn) {
    let timer;
    return function () {
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(context, arguments), time || 400);
    };
}
