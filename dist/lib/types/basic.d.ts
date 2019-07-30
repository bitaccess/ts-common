import * as t from 'io-ts';
export declare type Predicate<T> = (x: T) => boolean;
export declare type Defined<T> = T extends undefined ? never : T;
export declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
};
export declare type Enum = (string | number)[] | Object;
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export declare const Numeric: t.UnionC<[t.StringC, t.NumberC, import("./BigNumber").BigNumberC]>;
export declare type Numeric = t.TypeOf<typeof Numeric>;
