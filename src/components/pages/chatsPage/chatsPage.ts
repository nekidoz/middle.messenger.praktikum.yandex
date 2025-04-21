import { PropsRecord } from '../../../framework/block';
import PageTemplate from '../../organisms/pageTemplate';
import ChatsBox from '../../organisms/chatsBox';

export default class ChatsPage extends PageTemplate {
    constructor(props: PropsRecord = {}) {
        super({
            change_page: props.change_page,
            mainComponent: new ChatsBox(props),
        });
    }
}
