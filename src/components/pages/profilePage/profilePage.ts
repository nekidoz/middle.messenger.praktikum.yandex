import { PropsRecord } from '../../../framework/block';
import PageTemplate from '../../organisms/pageTemplate';
import ProfileBox from '../../organisms/profileBox';

export default class ProfilePage extends PageTemplate {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            mainComponent: new ProfileBox(props),
        });
    }
}
