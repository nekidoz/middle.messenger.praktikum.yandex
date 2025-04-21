import Block, { PropsRecord } from '../../../framework/block';
import Button from '../../atoms/button';
import Input from '../../atoms/input';
import Spacer from '../../atoms/spacer';
import template from './template';

export default class ChatListHeader extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            profileLink: new Button({
                id: 'edit-profile',
                class: 'navigation-button',
                text: 'Профиль >',
                events: {
                    click: props.edit_profile,
                },
            }),
            chatSearchInput: new Input({
                id: 'chat-search',
                class: 'chat-list-search-input',
                value: props.chat_search_value,
                type: 'search',
                placeholder: '🔎 Поиск',
                events: {
                    keyup: (e: KeyboardEvent) => {
                        if (e.keyCode === 13) {
                            const target = e.target as HTMLInputElement;
                            (props.search_chats as (value: string) => void)(target?.value);
                        }
                    },
                },
            }),
            spacer: new Spacer({
                class: 'chat-list-item-separator',
            }),
            template,
        });
    }
}
