import Indexed from '../../types/indexed';
import merge from './merge';

export default function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== 'string' || path.trim() === '') {
        throw new Error('path must be string');
    }
    if (typeof object !== 'object' || object === null) {
        return object;
    }
    const rhs = path
        .split('.')
        .reduceRight<Indexed>((acc, curr) => ({ [curr]: acc }), value as any);
    return merge(object as Indexed, rhs);
}
