declare type anyFunc = (a: any) => any;
declare type anyAsyncFunc = (a: any) => Promise<any>;
interface PipeInterface {
    readonly _buffer: Array<anyFunc>;
    readonly _batch: boolean;
    _value: any;
}
export declare class Pipe implements PipeInterface {
    readonly _batch: boolean;
    readonly _buffer: Array<anyFunc>;
    _value: any;
    constructor(func: anyFunc, _batch: boolean);
    _commitBuffers(): void;
    through(nextFunc: anyFunc): this;
    get(arg: any): this;
    value(): any;
}
export declare class AsyncPipe extends Pipe {
    _buffer: Array<anyAsyncFunc>;
    constructor(func: anyAsyncFunc);
    _commitBuffers(): Promise<void>;
    value(): Promise<any>;
}
export {};
