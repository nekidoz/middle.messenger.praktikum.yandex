import Block, { PropsRecord } from '../../../framework/block';
import Input from '../../atoms/input';
import Link from '../../atoms/link';
import Form from '../../atoms/form';
import Div from '../../atoms/div';
import LoginSignupInputBlock from '../../blocks/loginSignupInputBlock';
import template from './template';
import InputBoxValidationMixin from '../../mixins/inputBoxValidationMixin';

export default class LoginBox extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            form: new Form({
                id: 'login-form',
                content: [
                    new LoginSignupInputBlock({
                        id: 'login',
                        type: 'text',
                        value: props.login,
                        caption: '* Логин',
                        placeholder: 'Логин',
                    }),
                    new LoginSignupInputBlock({
                        id: 'password',
                        type: 'password',
                        caption: '* Пароль',
                        placeholder: 'Пароль',
                    }),
                    new Div({
                        class: 'button-stack',
                        content: [
                            new Input({
                                id: 'btn-login',
                                class: 'regular-button',
                                type: 'submit',
                                value: 'Войти',
                            }),
                            new Link({
                                href: '#',
                                class: 'menu-page-menu-item',
                                datapage: 'signup',
                                text: 'Нет аккаунта?',
                                change_page: props.change_page,
                            }),
                        ],
                    }),
                ],
                events: {
                    submit: (e: SubmitEvent) => {
                        e.preventDefault();
                        if (this.validate()) {
                            (this._props.onSubmit as (event: SubmitEvent) => void)(e);
                        }
                    },
                },
            }),
            template,
        });
    }

    // The following is replaced with implementation from InputBoxValidationMixin
    validate(matchingFields: string[] = [], mismatchMessage: string = ''): boolean {
        this.logger.log(matchingFields, mismatchMessage);
        return true;
    }
}

Object.assign(LoginBox.prototype, InputBoxValidationMixin);
