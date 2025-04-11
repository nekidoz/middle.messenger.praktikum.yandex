import Block from '../../../framework/block';
import { Link } from '../../link/Link';

export class Menu extends Block {
    constructor() {
        super('nav', {
            LinkLogin: new Link({
                href: '#',
                class: 'menu-page-menu-item',
                datapage: 'login',
                text: 'Login',
                onClick: (event: Event) => {
                    console.log('CLICK');
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            LinkSignup: new Link({
                href: '#',
                datapage: 'signup',
                text: 'Signup',
            }),
        });
    }

    override render() {
        const template = `<nav class="menu-page-menu">
            {{{ LinkLogin }}}
            {{{ LinkSignup }}}
        </nav>`;
        return this.compile(template, this._props);
    }
}