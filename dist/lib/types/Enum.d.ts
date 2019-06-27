import * as t from 'io-ts';
export declare class EnumType<E> extends t.Type<E> {
    readonly _tag: 'EnumType';
    constructor(name: string, is: EnumType<E>['is'], validate: EnumType<E>['validate'], encode: EnumType<E>['encode']);
}
export interface EnumC<E> extends EnumType<E> {
}
export declare function enumCodec<E extends string>(e: Object, name: string, defaultValue?: E): t.Type<E>;
