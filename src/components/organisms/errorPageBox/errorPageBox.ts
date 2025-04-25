import Block, { PropsRecord } from '../../../framework/block';
import Link from '../../atoms/link';
import Text from '../../atoms/text';
import template from './template';

export default class ErrorPageBox extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            errorManifest: new Text({
                class: 'error-page-text',
                text: props.error_code,
            }),
            error: props.error,
            backLink: new Link({
                href: '#',
                class: 'menu-page-menu-item',
                datapage: '/messenger',
                text: 'Назад к чатам',
                change_page: props.change_page,
            }),
            template,
        });
    }
}
