import Block, { PropsRecord } from '../../../framework/block';
import template from './template';

export default class Spacer extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            template
        });
    }
}
