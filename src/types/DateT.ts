import * as t from 'io-ts'

export class DateType extends t.Type<Date> {
  readonly _tag: 'DateType' = 'DateType'
  constructor() {
    super(
      'Date',
      (u): u is Date => u instanceof Date,
      (u, c) => {
        if (this.is(u)) {
          return t.success(u)
        } else if (t.number.is(u) || t.string.is(u)) {
          const date = new Date(u)
          if (Number.isNaN(date.getTime())) {
            return t.failure(u, c)
          } else {
            return t.success(date)
          }
        } else {
          return t.failure(u, c)
        }
      },
      t.identity,
    )
  }
}

export interface DateC extends DateType {}
export const DateT: DateC = new DateType()
