// The essence if this function is to mutate its argument
/* eslint-disable no-param-reassign */

import Indexed from '../../types/indexed';

function isIndexed(value: unknown): boolean {
    return typeof value === 'object' && value !== null && Object.keys(value as Object).length > 0;
}

/**
 * Merges second atgument's attribute tree into first argument.
 * Mutates first argument.
 * Returns mutated first argument.
 */
export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
    const lhsKeys = Object.keys(lhs);
    // console.log('lhs keys', lhsKeys);
    const rhsKeys = Object.keys(rhs);
    // console.log('rhs keys', rhsKeys);
    for (let count = 0; count < lhsKeys.length; count++) {
        // console.log(`key ${lhsKeys[count]}: left ${lhs[lhsKeys[count]]}, right ${rhs[lhsKeys[count]]}`);
        const rightKeyIndex = rhsKeys.findIndex((value) => value === lhsKeys[count]);
        if (rightKeyIndex !== -1) {
            // console.log('Right object has this key');
            if (rhs[lhsKeys[count]]) {
                // console.log('Right value not null');
                if (isIndexed(lhs[lhsKeys[count]])) {
                    // console.log('left is Indexed');
                    if (isIndexed(rhs[lhsKeys[count]])) {
                        // console.log('right is Indexed - merge');
                        merge(lhs[lhsKeys[count]] as Indexed, rhs[lhsKeys[count]] as Indexed);
                    }
                } else {
                    // console.log('Left is plain value - overwrite with right');
                    lhs[lhsKeys[count]] = rhs[lhsKeys[count]];
                }
            }
            // right element processed - delete its key
            delete rhsKeys[rightKeyIndex];
        }
    }
    // console.log(`adding ${rhsKeys.length} unique rhs keys`);
    for (let count = 0; count < rhsKeys.length; count++) {
        if (rhsKeys[count] && !lhs[rhsKeys[count]]) {
            // console.log('adding unique rhs key', rhsKeys[count]);
            lhs[rhsKeys[count]] = rhs[rhsKeys[count]];
        }
    }
    return lhs;
}
