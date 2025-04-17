import Block, { PropsRecord } from '../../../framework/block';
import Image from '../../atoms/image';
import Text from '../../atoms/text';
import Button from '../../atoms/button';
import Form from '../../atoms/form';
import Input from '../../atoms/input';
import template from './template';
import Chat from '../../../types/Chat';
import { PARTY_ME } from '../../../types/ChatMessage';

export default class ChatContentBlock extends Block {
    constructor(props: PropsRecord = {}) {
        const active_chat = props.active_chat as Chat;
        super({
            avatar: new Image({
                class: 'chat-content-avatar',
                source: '/avatar.png',
                caption: 'Аватар',
            }),
            party: new Text({
                class: 'chat-content-party',
                text: active_chat?.party,
            }),
            actionButton: new Button({
                id: 'chat-action',
                class: 'chat-content-action',
                text: '⋮',
                events: {
                    'click': props.do_chat_action,
                }
            }),
            dialog: (() => {
                const messages: Text[] = [];
                active_chat?.content.forEach((message) => messages.push(new Text({
                    text: message.message,
                    class: `chat-content-message ${message.party === PARTY_ME 
                        ? 'chat-content-message-self' 
                        : 'chat-content-message-party'}`,
                })));
                return messages;
            })(),
            attachButton: new Button({
                id: 'chat-attach',
                class: 'chat-content-action',
                text: '📎',
                events: {
                    'click': props.attach_to_chat,
                }
            }),
            messageForm: new Form({
                id: 'chat-message-form',
                class: 'chat-content-message-form',
                content: [
                    new Input({
                        id: 'message',
                        class: 'chat-content-message-input',
                        type: 'text',
                        placeholder: 'Сообщение',
                    }),
                    new Button({
                        id: 'chat-send',
                        class: 'chat-content-message-send',
                        type: 'submit',
                        text: '➔',
                    })
                ],
                events: {
                    'submit': props.send_message,
                }
            }),


            template,
        });
    }
}
