import * as t from 'io-ts';
export declare function instanceofCodec<T>(con: {
    new (): T;
}): t.Type<T>;
export declare function partialRecord<KS extends t.KeyofType<any>, T extends t.Any>(k: KS, type: T, name?: string): t.PartialC<Record<keyof KS['keys'], T>>;
export declare function autoImplement<T extends object>(): new (values?: T | (() => T) | undefined) => T;
export declare const nullable: <T extends t.Mixed>(codec: T) => t.UnionC<[T, t.NullC]>;
export declare const optional: <T extends t.Mixed>(codec: T) => t.UnionC<[T, t.UndefinedC]>;
export declare function requiredOptionalCodec<A extends t.Props, B extends t.Props>(required: A, optional: B, name: string): t.IntersectionC<[t.TypeC<A>, t.PartialC<B>]>;
export declare function extendCodec<P extends t.Mixed>(parent: P, required: {}, name: string): P;
export declare function extendCodec<P extends t.Mixed, R extends t.Props>(parent: P, required: R, name: string): t.IntersectionC<[P, t.TypeC<R>]>;
export declare function extendCodec<P extends t.Mixed>(parent: P, required: {}, optional: {}, name: string): P;
export declare function extendCodec<P extends t.Mixed, O extends t.Props>(parent: P, required: {}, optional: O, name: string): t.IntersectionC<[P, t.PartialC<O>]>;
export declare function extendCodec<P extends t.Mixed, R extends t.Props>(parent: P, required: R, optional: {}, name: string): t.IntersectionC<[P, t.TypeC<R>]>;
export declare function extendCodec<P extends t.Mixed, R extends t.Props, O extends t.Props>(parent: P, required: R, optional: O, name: string): t.IntersectionC<[P, t.TypeC<R>, t.PartialC<O>]>;
