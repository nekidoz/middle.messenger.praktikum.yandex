import Block, { PropsRecord } from '../../../framework/block';
import template from './template';

export default class Link extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            events: {
                click: (e: Event) => (props.change_page as (event: Event) => void)(e),
            },
            template,
        });
    }
}
