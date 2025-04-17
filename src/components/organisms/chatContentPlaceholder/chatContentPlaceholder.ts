import Block, { PropsRecord } from '../../../framework/block';
import template from './template';

export default class ChatContentPlaceholder extends Block {
    constructor() {
        super({
            text: 'Выберите чат, чтобы отправить сообщение',
            template,
        });
    }
}
