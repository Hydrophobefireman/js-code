declare type anyFunc = (a: any) => any;
declare type anyAsyncFunc = (a: any) => Promise<any>;
interface PipeInterface {
    readonly _buffer: Array<anyFunc>;
    readonly _batch: boolean;
    _value: any;
    readonly reusable: boolean;
}
export declare class Pipe implements PipeInterface {
    readonly _batch: boolean;
    readonly reusable: boolean;
    readonly _buffer: Array<anyFunc>;
    _value: any;
    constructor(func: anyFunc, _batch: boolean, reusable: boolean);
    _commitBuffers(): void;
    through(nextFunc: anyFunc): this;
    get(arg: any): this;
    value(): any;
}
export declare class AsyncPipe extends Pipe {
    readonly reusable: boolean;
    _buffer: Array<anyAsyncFunc>;
    constructor(func: anyAsyncFunc, reusable: boolean);
    _commitBuffers(): Promise<void>;
    value(): Promise<any>;
}
export {};
