import { UnionType, IntersectionType } from 'io-ts';
import { stringify } from './string';
function isCodec(actual, expected) {
    return actual instanceof expected || actual._tag === expected.name;
}
function getContextPath(context) {
    return context
        .filter(({ type }, i) => {
        if (i === 0)
            return true;
        const previousType = context[i - 1].type;
        return !(isCodec(previousType, UnionType) || isCodec(previousType, IntersectionType));
    })
        .map(({ key, type }) => (key ? key : type.name))
        .join('.');
}
function stringifyNested(types, delim) {
    return types.map((type) => type.name).join(delim);
}
function getContextTypeName(context) {
    if (context.length <= 0) {
        return '';
    }
    if (context.length > 1) {
        const parent = context[context.length - 2].type;
        if (isCodec(parent, UnionType)) {
            return stringifyNested(parent.types, ' | ');
        }
        else if (isCodec(parent, IntersectionType)) {
            return stringifyNested(parent.types, ' & ');
        }
    }
    return context[context.length - 1].type.name;
}
export function getMessage(e) {
    const expectedType = getContextTypeName(e.context);
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