import { PropsRecord } from "../../../framework/block";
import PageTemplate from "../../organisms/pageTemplate";
import LoginBox from "../../organisms/loginBox";

export default class LoginPage extends PageTemplate {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            mainComponent: new LoginBox({
                login: props.login,
            })
        })
    }
}
