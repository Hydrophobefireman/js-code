declare const _default: {
    <T = any>(entries: Iterable<readonly [string | number | symbol, T]>): {
        [x: string]: T;
        [x: number]: T;
    };
    (entries: Iterable<readonly any[]>): any;
};
export default _default;
