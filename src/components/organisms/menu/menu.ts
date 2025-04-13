import Block, { PropsRecord } from '../../../framework/block';
import Link from '../../atoms/link';
import template from './template';

export default class Menu extends Block {
    constructor(props: PropsRecord = {}) {
        super({ 
            ...props,
            links: [
                new Link({
                    href: '#',
                    class: 'menu-page-menu-item',
                    datapage: 'login',
                    text: 'Вход',
                }),
                new Link({
                    href: '#',
                    class: 'menu-page-menu-item',
                    datapage: 'signup',
                    text: 'Регистрация',
                }),
                new Link({
                    href: '#',
                    class: 'menu-page-menu-item',
                    datapage: 'profile',
                    text: 'Профиль',
                }),
                new Link({
                    href: '#',
                    class: 'menu-page-menu-item',
                    datapage: 'chats',
                    text: 'Чаты',
                }),
                new Link({
                    href: '#',
                    class: 'menu-page-menu-item',
                    datapage: 'page404',
                    text: '404',
                }),
                new Link({
                    href: '#',
                    class: 'menu-page-menu-item',
                    datapage: 'page5xx',
                    text: '5xx',
                }),
            ], 
            template 
        });
    }
}
