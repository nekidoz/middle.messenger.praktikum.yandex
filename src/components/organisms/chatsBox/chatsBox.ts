import Block, { PropsRecord } from '../../../framework/block';
import ChatContent from '../chatContent';
import ChatSidebar from '../chatsSidebar';
import template from './template';

export default class ChatsBox extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            sidebar: new ChatSidebar(props),
            content: new ChatContent(props),
            template,
        });
    }
}
