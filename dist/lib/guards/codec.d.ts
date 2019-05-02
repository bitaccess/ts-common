import * as t from 'io-ts';
export declare function isType<T extends t.Mixed>(codec: T, x: unknown): x is t.TypeOf<T>;
