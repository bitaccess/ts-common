import { Logger } from './types';
export declare class DelegateLogger implements Logger {
    private readonly prefix?;
    logger: Logger | null;
    constructor(logger?: Logger | null | undefined, prefix?: string | undefined);
    private delegate;
    error: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    info: (...args: any[]) => void;
    log: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    trace: (...args: any[]) => void;
}
