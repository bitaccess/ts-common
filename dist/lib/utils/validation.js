import { UnionType, IntersectionType } from 'io-ts';
import { stringify } from './string';
function getContextPath(context) {
    return context
        .filter(({ type }, i) => {
        if (i === 0)
            return true;
        const previousType = context[i - 1].type;
        return !(previousType instanceof UnionType || previousType instanceof IntersectionType);
    })
        .map(({ key, type }) => (key ? key : type.name))
        .join('.');
}
export function getMessage(e) {
    const expectedType = e.context.length > 0 ? e.context[e.context.length - 1].type.name : '';
    const contextPath = getContextPath(e.context);
    const expectedMessage = expectedType !== contextPath ? `${expectedType} for ${contextPath}` : expectedType;
    return e.message !== undefined ? e.message : `Expected type ${expectedMessage}, but got: ${stringify(e.value)}`;
}
export const SimpleReporter = {
    report: validation => validation.fold(es => es.map(getMessage), () => ['No errors!']),
};
export function assertType(typeCodec, value, description = 'type', ErrorType = TypeError) {
    const validation = typeCodec.decode(value);
    if (validation.isLeft()) {
        throw new ErrorType(`Invalid ${description} - ${SimpleReporter.report(validation)[0]}`);
    }
    return validation.value;
}
//# sourceMappingURL=validation.js.map