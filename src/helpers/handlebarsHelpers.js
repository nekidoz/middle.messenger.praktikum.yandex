import Handlebars from 'handlebars';

Handlebars.registerHelper('concat', function() {
    return Array.prototype.slice.call(arguments, 0, -1).join('');
});

Handlebars.registerHelper('greater', function(value1, value2) {
    return value1 > value2;
});
