import Block, { PropsRecord } from '../../../framework/block';
import ChatListHeader from '../chatListHeader';
import ChatList from '../chatList';
import template from './template';

export default class ChatSidebar extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            chatListHeader: new ChatListHeader({
                chat_search_value: props.chat_search_value,
                edit_profile: props.edit_profile,
                search_chats: props.search_chats,
            }),
            chatList: new ChatList({
                chats: props.chats,
                active_chat: props.active_chat,
                activate_chat: props.activate_chat,
            }),
            template,
        });
    }
}
