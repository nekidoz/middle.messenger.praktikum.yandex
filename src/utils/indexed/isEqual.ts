import Indexed from '../../types/indexed';

function isIndexed(value: unknown): value is Indexed {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | Indexed {
    return isIndexed(value) || isArray(value);
}

function isEqual(a: Indexed, b: Indexed): boolean {
    const aKeySet = new Set([...Object.keys(a)]);
    const bKeySet = new Set([...Object.keys(b)]);
    const allKeySet = new Set([...aKeySet, ...bKeySet]);
    if (aKeySet.size !== bKeySet.size || aKeySet.size !== allKeySet.size) {
        return false;
    }
    for (const key of aKeySet) {
        if (isArrayOrObject(a[key]) && isArrayOrObject(b[key])) {
            if (!isEqual(a[key] as Indexed, b[key] as Indexed)) {
                return false;
            }
        } else if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}

export default isEqual;
