import { ValidationError, Type } from 'io-ts';
import { Reporter } from 'io-ts/lib/Reporter';
export declare function getMessage(e: ValidationError): string;
export declare const SimpleReporter: Reporter<Array<string>>;
export declare function assertType<T>(typeCodec: Type<T>, value: unknown, description?: string, ErrorType?: {
    new (message: string): Error;
}): T;
