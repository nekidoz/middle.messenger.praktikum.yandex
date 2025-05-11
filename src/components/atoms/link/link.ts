import Block, { PropsRecord } from '../../../framework/block';
import Router from '../../../framework/router/router';
import template from './template';

export default class Link extends Block {
    constructor(props: PropsRecord = {}) {
        const router = new Router();
        // default click handler goes to page specified
        const linkProps = { ...props };
        if (!(linkProps.events as PropsRecord)?.click) {
            linkProps.events = {
                click: (e: Event) => {
                    e.preventDefault();
                    router.go(this._props.datapage as string);
                },
            };
        }
        super({
            ...linkProps,
            template,
        });
    }
}
