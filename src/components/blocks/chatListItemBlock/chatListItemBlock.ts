import Block, { PropsRecord } from '../../../framework/block';
import Image from '../../atoms/image';
import Spacer from '../../atoms/spacer';
import Text from '../../atoms/text';
import template from './template';

export default class ChatListItemBlock extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            class: props.active ? 'chat-list-item chat-list-item-active' : 'chat-list-item',
            id: props.chatId,
            avatar: new Image({
                class: 'chat-list-item-avatar',
                source: '/avatar.png',
                caption: 'Аватар',
            }),
            party: new Text({
                class: 'chat-list-item-party',
                text: props.party,
            }),
            date: new Text({
                class: 'chat-list-item-date',
                text: props.date,
            }),
            preview: new Text({
                class: 'chat-list-item-preview',
                text: props.preview,
            }),
            newMessages: props.newMessages 
                ? new Text({
                    class: 'chat-list-item-new-messages',
                    text: props.newMessages as number > 99 ? '99+' : props.newMessages,
                })
                : null,
            spacer: new Spacer({
                class: 'chat-list-item-separator',
            }),
            events: props.events,
            template,
        });
    }
}
