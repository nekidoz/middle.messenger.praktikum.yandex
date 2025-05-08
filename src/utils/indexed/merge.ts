// The essence if this function is to mutate its argument
/* eslint-disable no-param-reassign */

import Indexed from '../../types/indexed';

/**
 * Merges second atgument's attribute tree into first argument.
 * Mutates first argument.
 * Returns mutated first argument.
 */
export default function merge(lhs: Indexed, rhs: Indexed): Indexed {
    const lhsKeys = Object.keys(lhs);
    const rhsKeys = Object.keys(rhs);
    for (let count = 0; count < lhsKeys.length; count++) {
        if (rhs[lhsKeys[count]]) {
            if (typeof lhs[lhsKeys[count]] === 'object' && Object.keys(lhs[lhsKeys[count]] as Object)) {
                if (typeof rhs[lhsKeys[count]] === 'object' && Object.keys(rhs[lhsKeys[count]] as Object)) {
                    merge(lhs[lhsKeys[count]] as Indexed, rhs[lhsKeys[count]] as Indexed);
                }
            } else {
                lhs[lhsKeys[count]] = rhs[lhsKeys[count]];
            }
            delete rhsKeys[count];
        }
    }
    for (let count = 0; count < rhsKeys.length && rhsKeys[count]; count++) {
        lhs[rhsKeys[count]] = rhs[rhsKeys[count]];
    }
    return lhs;
}
