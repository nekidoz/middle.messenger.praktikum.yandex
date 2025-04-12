/* 
    <main class="login-signup-box">
        <h2>Вход</h2>
        <form id="login-form">
            {{> LoginSignupInputBlock id="login" type="text" value=login caption="Логин" placeholder="Логин" error="Здесь могла бы быть ужасная ошибка" }}
            {{> LoginSignupInputBlock id="password" type="password" caption="Пароль" placeholder="Пароль" }}
            <div class="button-stack">
                {{> Input id="btn-login" class="regular-button" type="submit" value="Войти" }}
                {{> Link href="#" class="menu-page-menu-item" data-page="signup" text="Нет аккаунта?" }}
            </div>
        </form>
    </main>
 */

import Block, { PropsRecord } from '../../../framework/block';
import Input from '../../atoms/input';
import Link from '../../atoms/link';
import LoginSignupInputBlock from '../../blocks/loginSignupInputBlock';
import template from './template';

export default class LoginBox extends Block {
    constructor(props: PropsRecord = {}) {
        const propsAndChildren = { ...props };
        propsAndChildren.loginComponent = new LoginSignupInputBlock({
            id: 'login',
            type: 'text',
            value: propsAndChildren.login,
            caption: 'Логин',
            placeholder: 'Логин',
            error: 'Здесь могла бы быть ужасная ошибка',
        });
        propsAndChildren.passwordComponent = new LoginSignupInputBlock({
            id: 'password',
            type: 'password',
            caption: 'Пароль',
            placeholder: 'Пароль',
        });
        propsAndChildren.submitButton = new Input({
            id: 'btn-login',
            class: 'regular-button',
            type: 'submit',
            value: 'Войти',
        });
        propsAndChildren.signupLink = new Link({
            href: '#',
            class: 'menu-page-menu-item',
            datapage: 'signup',
            text: 'Нет аккаунта?',
        });

        super({
            ...propsAndChildren,
            template,
        });
    }
}