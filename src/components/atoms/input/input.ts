import Block, { PropsRecord } from '../../../framework/block';
import template from './template';

export default class Input extends Block {
    constructor(props: PropsRecord) {
        super({
            ...props,
            template
        });
    }
}
