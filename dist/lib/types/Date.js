import * as t from 'io-ts';
export class DateType extends t.Type {
    constructor() {
        super('Date', (u) => u instanceof Date, (u, c) => {
            if (this.is(u)) {
                return t.success(u);
            }
            else if (t.number.is(u) || t.string.is(u)) {
                const date = new Date(u);
                if (Number.isNaN(date.getTime())) {
                    return t.failure(u, c);
                }
                else {
                    return t.success(date);
                }
            }
            else {
                return t.failure(u, c);
            }
        }, t.identity);
        this._tag = 'DateType';
    }
}
export const DateT = new DateType();
//# sourceMappingURL=Date.js.map