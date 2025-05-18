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
import sessionController from '../../../controllers/sessionController';
import { SessionRequest } from '../../../api/sessionApi';

class LoginBox extends Block {
    private login;

    // private password;

    constructor(props: PropsRecord = {}) {
        const login = new LoginSignupInputBlock({
            id: 'login',
            type: 'text',
            value: props.login,
            caption: '* Логин',
            placeholder: 'Логин',
        });
        const password = new LoginSignupInputBlock({
            id: 'password',
            type: 'password',
            caption: '* Пароль',
            placeholder: 'Пароль',
        });
        super({
            ...props,
            form: new Form({
                id: 'login-form',
                content: [
                    login,
                    password,
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
                                datapage: '/sign-up',
                                text: 'Нет аккаунта?',
                            }),
                        ],
                    }),
                ],
                events: {
                    submit: (e: SubmitEvent) => {
                        e.preventDefault();
                        if (this.validate()) {
                            const formElement = e.target as HTMLFormElement;
                            const request = new SessionRequest()
                                .setLogin(formElement?.login.value)
                                .setPassword(formElement?.password.value);
                            this.logger.log('Вход', request);
                            sessionController.login(request);
                        }
                    },
                },
            }),
            template,
        });
        this.login = login;
        // this.password = password;
    }

    componentDidUpdate(_oldProps: PropsRecord, _newProps: PropsRecord): boolean {
        return Block.updateChildProps(_oldProps, _newProps, this.login, 'value', 'login');
    }

    // The following is replaced with implementation from InputBoxValidationMixin
    validate(matchingFields: string[] = [], mismatchMessage: string = ''): boolean {
        this.logger.log(matchingFields, mismatchMessage);
        return true;
    }
}

// map Store props to form props
function mapStateToProps(state: Indexed) {
    return {
        login: (state.user as Indexed)?.login,
    };
}

// add validation
Object.assign(LoginBox.prototype, InputBoxValidationMixin);

// add store update subscription
export default connect(LoginBox, mapStateToProps);
