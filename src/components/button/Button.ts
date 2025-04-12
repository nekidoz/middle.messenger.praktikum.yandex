import Block, { PropsRecord } from '../../framework/block';
// import Handlebars from 'handlebars';
import template from './template';
// import logger from '../../utils/logger';

export default class Button extends Block {
    constructor(props: PropsRecord) {
        // Создаём враппер DOM-элемент button
        super(props);
    }

    render() {
        // const { __id } = this._props;
        // if (__id) {
        //     logger.log(`Rendering ${__id}`);
        // }
        // // В данном случае render возвращает строкой разметку из шаблонизатора
        // const renderFunc = Handlebars.compile(template);
        // const renderString = renderFunc(this._props);
        // return renderString;
        return this.compile(template, this._props);
    }
}
