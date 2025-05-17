import Block, { PropsRecord } from '../../../framework/block';
import Input from '../../atoms/input';
import Link from '../../atoms/link';
import Form from '../../atoms/form';
import Div from '../../atoms/div';
import LoginSignupInputBlock from '../../blocks/loginSignupInputBlock';
import template from './template';
import InputBoxValidationMixin from '../../mixins/inputBoxValidationMixin';
import { connect } from '../../../framework/store';
import Indexed from '../../../types/indexed';
import profileController from '../../../controllers/profileController';
import { ProfileRequest } from '../../../api/profileApi';

class SignupBox extends Block {
    private email;

    private login;

    private firstName;

    private secondName;

    private phone;

    // private password;

    // private repeatPassword;

    constructor(props: PropsRecord = {}) {
        const email = new LoginSignupInputBlock({
            id: 'email',
            type: 'email',
            value: props.email,
            caption: '* Почта',
            placeholder: 'Почта',
        });
        const login = new LoginSignupInputBlock({
            id: 'login',
            type: 'text',
            value: props.login,
            caption: '* Логин',
            placeholder: 'Логин',
        });
        const firstName = new LoginSignupInputBlock({
            id: 'first_name',
            type: 'text',
            value: props.first_name,
            caption: '* Имя',
            placeholder: 'Имя',
        });
        const secondName = new LoginSignupInputBlock({
            id: 'second_name',
            type: 'text',
            value: props.second_name,
            caption: '* Фамилия',
            placeholder: 'Фамилия',
        });
        const phone = new LoginSignupInputBlock({
            id: 'phone',
            type: 'tel',
            value: props.phone,
            caption: '* Телефон',
            placeholder: 'Телефон',
        });
        const password = new LoginSignupInputBlock({
            id: 'password',
            type: 'password',
            caption: '* Пароль',
            placeholder: 'Пароль',
        });
        const repeatPassword = new LoginSignupInputBlock({
            id: 'repeat_password',
            type: 'password',
            caption: '* Пароль (еще раз)',
            placeholder: 'Пароль (еще раз)',
        });
        super({
            ...props,
            form: new Form({
                id: 'signup-form',
                content: [
                    email,
                    login,
                    firstName,
                    secondName,
                    phone,
                    password,
                    repeatPassword,
                    new Div({
                        class: 'button-stack',
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
                                datapage: '/',
                                text: 'Уже есть аккаунт?',
                            }),
                        ],
                    }),
                ],
                events: {
                    submit: (e: SubmitEvent) => {
                        e.preventDefault();
                        if (this.validate(['password', 'repeat_password'], 'Пароли не совпадают')) {
                            const formElement = e.target as HTMLFormElement;
                            const request = new ProfileRequest()
                                .setFirstName(formElement?.first_name.value)
                                .setSecondName(formElement?.second_name.value)
                                .setLogin(formElement?.login.value)
                                .setEmail(formElement?.email.value)
                                .setPassword(formElement?.password.value)
                                .setPhone(formElement?.phone.value);
                            this.logger.log('Регистрация', request);
                            profileController.create(request);
                        }
                    },
                },
            }),
            template,
        });
        this.email = email;
        this.login = login;
        this.firstName = firstName;
        this.secondName = secondName;
        this.phone = phone;
        // this.password = password;
        // this.repeatPassword = repeatPassword;
    }

    componentDidUpdate(_oldProps: PropsRecord, _newProps: PropsRecord): boolean {
        return Block.updateChildProps(_oldProps, _newProps, this.email, 'value', 'email')
            || Block.updateChildProps(_oldProps, _newProps, this.login, 'value', 'login')
            || Block.updateChildProps(_oldProps, _newProps, this.firstName, 'value', 'first_name')
            || Block.updateChildProps(_oldProps, _newProps, this.secondName, 'value', 'second_name')
            || Block.updateChildProps(_oldProps, _newProps, this.phone, 'value', 'phone');
    }

    // The following is replaced with implementation from InputBoxValidationMixin
    validate(matchingFields: string[] = [], mismatchMessage: string = ''): boolean {
        this.logger.log(matchingFields, mismatchMessage);
        return true;
    }
}

// map Store props to form props
function mapStateToProps(state: Indexed) {
    const userSection: Indexed | undefined = state.user as Indexed | undefined;
    return userSection
        ? {
            email: userSection.email,
            login: userSection.login,
            first_name: userSection.first_name,
            second_name: userSection.second_name,
            phone: userSection.phone,
        }
        : {};
}

// add validation
Object.assign(SignupBox.prototype, InputBoxValidationMixin);

// add store update subscription
export default connect(SignupBox, mapStateToProps);
