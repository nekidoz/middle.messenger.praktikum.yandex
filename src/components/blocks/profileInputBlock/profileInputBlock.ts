import Block, { PropsRecord } from '../../../framework/block';
import Input from '../../atoms/input';
import Text from '../../atoms/text';
import Stub from '../../atoms/stub';
import template from './template';

export default class ProfileInputBlock extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            captionComponent: new Text({
                class: 'profile-caption',
                text: props.caption,
            }),
            inputComponent: new Input({
                class: 'profile-input',
                id: props.id,
                type: props.type,
                accept: props.accept,
                placeholder: props.placeholder,
                value: props.value,
            }),
            errorComponent: props.error 
                ? new Text({
                    class: 'profile-error',
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
