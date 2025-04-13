import Block, { PropsRecord } from '../../../framework/block';
import Menu from '../menu';
import template from './template';

export default class PageTemplate extends Block {
    constructor(props: PropsRecord = {}) {
        const propsAndChildren = { ...props };
        propsAndChildren.menu = new Menu();
        super({
            ...propsAndChildren,
            template,
        });
    }
}
