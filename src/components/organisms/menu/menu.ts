import Block, { PropsRecord } from '../../../framework/block';
import Link from '../../atoms/link';
import template from './template';

export default class Menu extends Block {
    constructor(props: PropsRecord = {}) {
        const commonProps = {
            href: '#',
            class: 'menu-page-menu-item',
            change_page: props.change_page,
        }
        super({ 
            ...props,
            links: [
                new Link({
                    ...commonProps,
                    datapage: 'login',
                    text: 'Вход',
                }),
                new Link({
                    ...commonProps,
                    datapage: 'signup',
                    text: 'Регистрация',
                }),
                new Link({
                    ...commonProps,
                    datapage: 'profile',
                    text: 'Профиль',
                }),
                new Link({
                    ...commonProps,
                    datapage: 'chats',
                    text: 'Чаты',
                }),
                new Link({
                    ...commonProps,
                    datapage: 'page404',
                    text: '404',
                }),
                new Link({
                    ...commonProps,
                    datapage: 'page5xx',
                    text: '5xx',
                }),
            ], 
            template 
        });
    }
}
