import Block, { PropsRecord } from '../../../framework/block';
import Link from '../../atoms/link';
import template from './template';

export default class Menu extends Block {
    constructor(props: PropsRecord = {}) {
        const commonProps = {
            href: '#',
            class: 'menu-page-menu-item',
        };
        super({
            ...props,
            links: [
                new Link({
                    ...commonProps,
                    datapage: '/',
                    text: 'Вход',
                }),
                new Link({
                    ...commonProps,
                    datapage: '/sign-up',
                    text: 'Регистрация',
                }),
                new Link({
                    ...commonProps,
                    datapage: '/settings',
                    text: 'Профиль',
                }),
                new Link({
                    ...commonProps,
                    datapage: '/messenger',
                    text: 'Чаты',
                }),
                new Link({
                    ...commonProps,
                    datapage: '/notfound',
                    text: '404',
                }),
                new Link({
                    ...commonProps,
                    datapage: '/error',
                    text: '5xx',
                }),
            ],
            template,
        });
    }
}
