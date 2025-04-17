import { PropsRecord } from "../../../framework/block";
import PageTemplate from "../../organisms/pageTemplate";
import ErrorPageBox from "../../organisms/errorPageBox";

export default class Code5xxPage extends PageTemplate {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            mainComponent: new ErrorPageBox({
                error_code: '500',
                error: 'Мы уже фиксим',
                change_page: props.change_page,
            }),
        })
    }
}
