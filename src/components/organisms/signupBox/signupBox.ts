import Block, { PropsRecord } from '../../../framework/block';
import Input from '../../atoms/input';
import Link from '../../atoms/link';
import Form from '../../atoms/form';
import Div from '../../atoms/div';
import LoginSignupInputBlock from '../../blocks/loginSignupInputBlock';
import template from './template';
import InputBoxValidationMixin from '../../mixins/inputBoxValidationMixin';

export default class SignupBox extends Block {
    constructor(props: PropsRecord = {}) {
        super({
            ...props,
            form: new Form({
                id: "signup-form",
                content: [
                    new LoginSignupInputBlock({
                        id: 'email',
                        type: 'email',
                        value: props.email,
                        caption: '* Почта',
                        placeholder: 'Почта',
                    }),
                    new LoginSignupInputBlock({
                        id: 'login',
                        type: 'text',
                        value: props.login,
                        caption: '* Логин',
                        placeholder: 'Логин',
                    }),
                    new LoginSignupInputBlock({
                        id: 'first_name',
                        type: 'text',
                        value: props.first_name,
                        caption: '* Имя',
                        placeholder: 'Имя',
                    }),
                    new LoginSignupInputBlock({
                        id: 'second_name',
                        type: 'text',
                        value: props.second_name,
                        caption: 'Фамилия',
                        placeholder: 'Фамилия',
                    }),
                    new LoginSignupInputBlock({
                        id: 'phone',
                        type: 'tel',
                        value: props.phone,
                        caption: 'Телефон',
                        placeholder: 'Телефон',
                    }),
                    new LoginSignupInputBlock({
                        id: 'password',
                        type: 'password',
                        caption: '* Пароль',
                        placeholder: 'Пароль',
                    }),
                    new LoginSignupInputBlock({
                        id: 'repeat_password',
                        type: 'password',
                        caption: '* Пароль (еще раз)',
                        placeholder: 'Пароль (еще раз)',
                    }),
                    new Div({
                        class: "button-stack",
                        content: [
                            new Input({
                                id: 'btn-signup',
                                class: 'regular-button',
                                type: 'submit',
                                value: 'Зарегистрироваться',
                            }),
                            new Link({
                                href: '#',
                                class: 'menu-page-menu-item',
                                datapage: 'login',
                                text: 'Уже есть аккаунт?',
                                change_page: props.change_page,
                            }),
                        ]
                    })
                ],
                events: {
                    'submit': (e: SubmitEvent) => {
                        e.preventDefault();
                        if (this.validate(['password', 'repeat_password'], 'Пароль неверно введен повторно')) {
                            (this._props.onSubmit as (e: SubmitEvent) => void)(e);
                        }
                    },
                }
            }),
            template,
        });
    }

        // The following is replaced with implementation from InputBoxValidationMixin
        validate(matchingFields: string[] = [], mismatchMessage: string = ''): boolean {
            console.log(matchingFields, mismatchMessage);
            return true;
        }    
}

Object.assign(SignupBox.prototype, InputBoxValidationMixin);
