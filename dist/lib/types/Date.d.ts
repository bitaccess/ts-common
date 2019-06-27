import * as t from 'io-ts';
export declare class DateType extends t.Type<Date> {
    readonly _tag: 'DateType';
    constructor();
}
export interface DateC extends DateType {
}
export declare const DateT: DateC;
