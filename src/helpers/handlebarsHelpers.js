import Handlebars from 'handlebars';

Handlebars.registerHelper('concat', function() {
    return Array.prototype.slice.call(arguments, 0, -1).join('');
});

Handlebars.registerHelper('equals', function(value1, value2) {
    return value1 === value2;
});

Handlebars.registerHelper('greater', function(value1, value2) {
    return value1 > value2;
});

Handlebars.registerHelper('defined', function(value) {
    return value !== undefined;
});
