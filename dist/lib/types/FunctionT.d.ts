import * as t from 'io-ts';
declare class FunctionType<Fn extends Function> extends t.Type<Fn> {
    readonly _tag: 'FunctionType';
    constructor(name?: string);
}
export interface FunctionC<Fn extends Function> extends FunctionType<Fn> {
}
export declare function functionT<Fn extends Function>(name?: string): FunctionC<Fn>;
export {};
