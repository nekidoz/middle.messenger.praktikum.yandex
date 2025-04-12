import Block, { PropsRecord } from '../../framework/block';
import Button from '../../components/button/Button';
import Menu from '../../components/blocks/menu/Menu';

export default class LoginPage extends Block {
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

        super(propsAndChildren);
    }
}