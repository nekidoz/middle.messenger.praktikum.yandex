import Block, { PropsRecord } from '../../../framework/block';
import ChatContentBlock from '../chatContentBlock';
import ChatContentPlaceholder from '../chatContentPlaceholder';
import template from './template';

export default class ChatContent extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            chatContentBlock: props.active_chat 
                ? new ChatContentBlock(props)
                : new ChatContentPlaceholder(),
            template,
        });
    }
}
