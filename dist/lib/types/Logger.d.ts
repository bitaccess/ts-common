import * as t from 'io-ts';
export declare type LoggerFn = (...args: any[]) => void;
export interface Logger {
    error: LoggerFn;
    warn: LoggerFn;
    info: LoggerFn;
    log: LoggerFn;
    debug: LoggerFn;
    trace: LoggerFn;
}
declare class LoggerType extends t.Type<Logger> {
    readonly _tag: 'LoggerType';
    constructor();
}
export interface LoggerC extends LoggerType {
}
export declare const Logger: LoggerC;
export {};
