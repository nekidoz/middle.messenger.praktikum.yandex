import Block, { PropsRecord } from '../../framework/block';
// import Handlebars from 'handlebars';
import template from './template';

export default class Button extends Block {
    constructor(props: PropsRecord) {
        // Создаём враппер DOM-элемент button
        super('button', props);
    }

    render() {
        // const { __id } = this._props;
        // if (__id) {
        //     console.log(`Rendering ${__id}`);
        // }
        // // В данном случае render возвращает строкой разметку из шаблонизатора
        // const renderFunc = Handlebars.compile(template);
        // const renderString = renderFunc(this._props);
        // return renderString;
        return this.compile(template, this._props);
    }
}
