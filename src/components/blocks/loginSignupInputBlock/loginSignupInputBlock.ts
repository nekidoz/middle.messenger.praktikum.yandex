import Block, { PropsRecord } from '../../../framework/block';
import Input from '../../atoms/input';
import Text from '../../atoms/text';
import Stub from '../../atoms/stub';
import template from './template';

export default class LoginSignupInputBlock extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            captionComponent: new Text({
                class: 'login-signup-caption',
                text: props.caption,
            }),
            inputComponent: new Input({
                class: 'login-signup-input',
                id: props.id,
                type: props.type,
                accept: props.accept,
                placeholder: props.placeholder,
                value: props.value,
            }),
            errorComponent: props.error 
                ? new Text({
                    class: 'login-signup-error',
                    text: props.error,
                })
                : new Stub(),
            template,
        });
    }

    componentDidUpdate(oldProps: PropsRecord, newProps: PropsRecord): boolean {
        if (oldProps.error !== newProps.error) {
            this._children.errorComponent.setProps({ text: newProps.error });
        }
        return true;
    }
}
