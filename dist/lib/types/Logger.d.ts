import * as t from 'io-ts';
export declare const Logger: t.TypeC<{
    error: t.FunctionC;
    warn: t.FunctionC;
    info: t.FunctionC;
    log: t.FunctionC;
    debug: t.FunctionC;
    trace: t.FunctionC;
}>;
export declare type LoggerFn = (...args: any[]) => void;
export interface Logger extends t.TypeOf<typeof Logger> {
    error: LoggerFn;
    warn: LoggerFn;
    info: LoggerFn;
    log: LoggerFn;
    debug: LoggerFn;
    trace: LoggerFn;
}
