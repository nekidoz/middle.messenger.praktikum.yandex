import Block, { PropsRecord } from '../../../framework/block';
import Input from '../../atoms/input/input';
import Text from '../../atoms/text/text';
import template from './template';

export default class LoginSignupInputBlock extends Block {
    constructor(props: PropsRecord = {}) {
        const propsAndChildren = { ...props };
        propsAndChildren.captionComponent = new Text({
            class: 'login-signup-caption',
            text: propsAndChildren.caption,
        });
        propsAndChildren.inputComponent = new Input({
            class: 'login-signup-input',
            id: propsAndChildren.id,
            type: propsAndChildren.type,
            accept: propsAndChildren.accept,
            placeholder: propsAndChildren.caption,
            value: propsAndChildren.value,
        })
        propsAndChildren.errorComponent = new Text({
            class: 'login-signup-error',
            text: propsAndChildren.error,
        });

        super({
            ...propsAndChildren,
            template,
        });
    }

    override render(): HTMLElement {
        // Error message line is displayed if there's error
        const element = this._children?.errorComponent?.element;
        if (element) {
            element.style.display = this._props.error ? 'inline' : 'none';
        }
        return super.render();
    }

    componentDidUpdate(oldProps: PropsRecord, newProps: PropsRecord): boolean {
        if (oldProps.error !== newProps.error) {
            this._children.errorComponent.setProps({ text: newProps.error });
        }
        return true;
    }
}
