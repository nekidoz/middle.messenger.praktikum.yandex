import Handlebars from 'handlebars';

Handlebars.registerHelper('concat', function() {
    return Array.prototype.slice.call(arguments, 0, -1).join('');
});

Handlebars.registerHelper('equals', function(value1: unknown, value2: unknown) {
    return value1 === value2;
});

Handlebars.registerHelper('greater', function(value1: number, value2: number) {
    return value1 > value2;
});

Handlebars.registerHelper('defined', function(value: unknown) {
    return value !== undefined;
});
