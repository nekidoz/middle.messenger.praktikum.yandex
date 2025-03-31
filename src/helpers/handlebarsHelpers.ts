import Handlebars from 'handlebars';

Handlebars.registerHelper(
    'concat',
    (...args) => Array.prototype.slice.call(args, 0, -1).join(''),
);

Handlebars.registerHelper(
    'equals',
    (value1: unknown, value2: unknown) => value1 === value2,
);

Handlebars.registerHelper(
    'greater',
    (value1: number, value2: number) => value1 > value2,
);

Handlebars.registerHelper(
    'defined',
    (value: unknown) => value !== undefined,
);
