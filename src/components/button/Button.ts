import Block from '../../framework/block';
import Handlebars from 'handlebars';
import { template } from './template';

export default class Button extends Block {
    constructor(props: Record<string, string>) {
        // Создаём враппер DOM-элемент button
        super('button', props);
    }

    render(): string {
        // В данном случае render возвращает строкой разметку из шаблонизатора
        const renderFunc = Handlebars.compile(template);
        const renderString = renderFunc(this._props);
        console.log(renderString);
        return renderString;
    }
}