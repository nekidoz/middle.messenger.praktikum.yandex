import { PropsRecord } from "../../../framework/block";
import PageTemplate from "../../organisms/pageTemplate";
import ChatsBox from "../../organisms/chatsBox";

export default class ChatsPage extends PageTemplate {
    constructor(props: PropsRecord = {}) {
        super({
            mainComponent: new ChatsBox(props),
        })
    }
}
