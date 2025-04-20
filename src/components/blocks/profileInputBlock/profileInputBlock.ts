import Block, { PropsRecord } from '../../../framework/block';
import Input from '../../atoms/input';
import Text from '../../atoms/text';
import template from './template';
import Validate from '../../../utils/validate';

export default class ProfileInputBlock extends Block {
    isValid: boolean | null = null;

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
                events: {
                    'blur': ((e: Event) => {
                        const [result, message] = Validate.validate(props.id as string, (e.target as HTMLInputElement)?.value);
                        this.setProps({
                            'error': message,
                        });
                        this.isValid = result;
                    }),
                },
            }),
            errorComponent: new Text({
                class: `profile-error${props.error ? '' : ' hidden'}`,
                text: props.error,
            }),
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
