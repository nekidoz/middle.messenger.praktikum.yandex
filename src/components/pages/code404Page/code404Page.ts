import { PropsRecord } from "../../../framework/block";
import PageTemplate from "../../organisms/pageTemplate";
import ErrorPageBox from "../../organisms/errorPageBox";

export default class Code404Page extends PageTemplate {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            mainComponent: new ErrorPageBox({
                error_code: '404',
                error: 'Не туда попали',
                change_page: props.change_page,
            }),
        })
    }
}
