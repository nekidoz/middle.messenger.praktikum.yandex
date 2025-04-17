import Chat from '../../../types/Chat';
import Block, { PropsRecord } from '../../../framework/block';
import ChatListItemBlock from '../../blocks/chatListItemBlock';
import template from './template';

export default class ChatList extends Block {
    constructor(props: PropsRecord = {}) {

        super({
            chats: (() => {
                const chats: ChatListItemBlock[] = [];
                (props.chats as Chat[]).forEach((chat) => chats.push(new ChatListItemBlock({
                    ...chat,
                    active: chat === props.active_chat,
                    events: {
                        'click': () => (props.activate_chat as (chat: Chat) => void)(chat),
                    }
                })));
                return chats;
            })(),
            template,
        });
    }
}
