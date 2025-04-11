import Block, { PropsRecord } from '../../../framework/block';
import Button from '../../button/Button';
import { Menu } from '../menu/Menu';
import template from './template';

class LoginSignupInputBlock extends Block {
    constructor(props: PropsRecord = {}) {
        const propsAndChildren = { ...props };
        propsAndChildren.button = new Button({
            className: 'regular-button',
            text: propsAndChildren.buttonText,
            settings: {
                withInternalID: true,
            },
        });
        propsAndChildren.list = ['First', 'Second', 'Third'];
        propsAndChildren.menu = new Menu();

        super('div', propsAndChildren);
    }

    render() {
        return this.compile(template);
    }

    componentDidUpdate(oldProps: PropsRecord, newProps: PropsRecord): boolean {
        if (oldProps.buttonText !== newProps.buttonText) {
            // moves here from propsAndChildren in constructor()
            this._children.button.setProps({ text: newProps.buttonText });
        }

        return true;
    }
}

export default LoginSignupInputBlock;
