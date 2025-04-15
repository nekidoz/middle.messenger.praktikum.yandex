import Block, { PropsRecord } from '../../../framework/block';
import ChatListHeader from '../chatListHeader';
import template from './template';

export default class ChatsBox extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            sidebar: new ChatListHeader({
                chat_search_value: props.chat_search_value,
            }),
            template,
        });
    }
}
