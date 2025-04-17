import Block, { PropsRecord } from '../../../framework/block';
import Menu from '../menu';
import template from './template';

export default class PageTemplate extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            menu: new Menu({
                change_page: props.change_page,
            }),
            template,
        });
    }
}
