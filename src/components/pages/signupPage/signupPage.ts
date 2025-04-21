import { PropsRecord } from '../../../framework/block';
import PageTemplate from '../../organisms/pageTemplate';
import SignupBox from '../../organisms/signupBox';

export default class SignupPage extends PageTemplate {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            mainComponent: new SignupBox(props),
        });
    }
}
