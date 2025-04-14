/* eslint max-len: [1, 200] */

// NEW IMPORTS
import logger from './utils/logger';
import LoginPage from './components/pages/loginPage';
import SignupPage from './components/pages/signupPage';
import render from './utils/renderDOM';

import Handlebars from 'handlebars';
import * as Pages from './pages';
import './helpers/handlebarsHelpers.ts';

// Import and register partials in Handlebars
import Button from './components/Button';
import Image from './components/Image';
import Input from './components/Input';
import Link from './components/Link';
import Menu from './components/Menu';
import Select from './components/Select';
import Text from './components/Text';
import ChatContentBlock from './components/molecules/ChatContentBlock';
import ChatListItemBlock from './components/molecules/ChatListItemBlock';
import LoginSignupInputBlock from './components/molecules/LoginSignupInputBlock';
import ProfileInputBlock from './components/molecules/ProfileInputBlock';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Image', Image);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Menu', Menu);
Handlebars.registerPartial('Select', Select);
Handlebars.registerPartial('Text', Text);
Handlebars.registerPartial('ChatContentBlock', ChatContentBlock);
Handlebars.registerPartial('ChatListItemBlock', ChatListItemBlock);
Handlebars.registerPartial('LoginSignupInputBlock', LoginSignupInputBlock);
Handlebars.registerPartial('ProfileInputBlock', ProfileInputBlock);

const PARTY_ME = 'me';

type Nullable<T> = T | null;

type Chat = {
    party: string;
    chatId: string;
    content: {
        party: string;
        message: string;
    }[];
    newMessages: number;
    preview: string;
    date: string;
};

export default class App {
    state: {
        currentPage: string | undefined;
        login: string;
        password: string;
        first_name: string;
        second_name: string;
        email: string;
        phone: string;
        display_name: string;
        avatar: string;
        chats: Chat[];
        chat_search_value: string;
        chat_selection: Chat[];
        active_chat: Chat | undefined;
    };

    appElement: HTMLElement | null;

    constructor() {
        this.state = {
            currentPage: 'signup',

            login: '',
            password: '',
            first_name: '',
            second_name: '',
            email: '',
            phone: '',
            display_name: '',
            avatar: '',

            chats: [
                { party: 'Chat 1', chatId: 'chat1', content: [{ party: 'other', message: 'content of chat 1' }], newMessages: 0, preview: 'Это превью содержимого чата номер 1', date: 'Пн' },
                { party: 'Chat 2', chatId: 'chat2', content: [{ party: 'other', message: 'content of chat 2' }], newMessages: 0, preview: 'Это превью содержимого чата номер 2', date: '28 Фев 2025' },
                { party: 'Chat 3', chatId: 'chat3', content: [{ party: 'other', message: 'content of chat 3' }], newMessages: 256, preview: 'Это превью содержимого чата номер 3', date: 'Ср' },
                { party: 'Chat 4', chatId: 'chat4', content: [{ party: 'other', message: 'content of chat 4' }], newMessages: 0, preview: 'Это превью содержимого чата номер 4', date: '11 Мар 2024' },
                { party: 'Chat 5', chatId: 'chat5', content: [{ party: 'other', message: 'content of chat 5' }], newMessages: 5, preview: 'Это превью содержимого чата номер 5', date: 'Сб' },
                { party: 'Chat 6', chatId: 'chat6', content: [{ party: 'other', message: 'content of chat 6' }], newMessages: 0, preview: 'Это превью содержимого чата номер 6', date: 'Вчера' },
                { party: 'Chat 7', chatId: 'chat7', content: [{ party: 'other', message: 'content of chat 7' }], newMessages: 15, preview: 'Это превью содержимого чата номер 7', date: '10:15' },
                { party: 'Chat 8', chatId: 'chat8', content: [{ party: 'other', message: 'content of chat 8' }], newMessages: 0, preview: 'Это превью содержимого чата номер 8', date: 'Позавчера' },
                { party: 'Chat 9', chatId: 'chat9', content: [{ party: 'other', message: 'content of chat 9' }], newMessages: 0, preview: 'Это превью содержимого чата номер 9', date: 'Пн' },
                { party: 'Chat 10', chatId: 'chat10', content: [{ party: 'other', message: 'content of chat 10' }], newMessages: 0, preview: '', date: '' },
                { party: 'Chat 11', chatId: 'chat11', content: [{ party: 'other', message: 'content of chat 11' }], newMessages: 0, preview: '', date: '' },
                { party: 'Chat 12', chatId: 'chat12', content: [{ party: 'other', message: 'content of chat 12' }], newMessages: 0, preview: '', date: '' },
                { party: 'Chat 13', chatId: 'chat13', content: [{ party: 'other', message: 'content of chat 13' }], newMessages: 0, preview: '', date: '' },
                { party: 'Chat 14', chatId: 'chat14', content: [{ party: 'other', message: 'content of chat 14' }], newMessages: 0, preview: '', date: '' },
                { party: 'Chat 15', chatId: 'chat15', content: [{ party: 'other', message: 'content of chat 15' }], newMessages: 0, preview: '', date: '' },
            ],
            chat_search_value: '',
            chat_selection: [],
            active_chat: undefined,

        };
        this.state.chat_selection = [...this.state.chats];
        this.appElement = document.getElementById('app');
    }

    render() {
        let template;
        if (!this.appElement) {
            alert('Не найден тэг приложения - обратитесь к разработчику!');
            return;
        }
        logger.log(this.state.currentPage, this);
        switch (this.state.currentPage) {
            case 'login':
                const loginPage = new LoginPage({
                    login: this.state.login,
                    onSubmit: ((e: SubmitEvent) => this.login(e)).bind(this),
                });
                render('#app', loginPage);

                // template = Handlebars.compile(Pages.LoginPage);
                // this.appElement.innerHTML = template({
                //     login: this.state.login,
                // });
                break;
            case 'signup':
                const signupPage = new SignupPage({
                    login: this.state.login,
                    first_name: this.state.first_name,
                    second_name: this.state.second_name,
                    email: this.state.email,
                    phone: this.state.phone,
                    onSubmit: ((e: SubmitEvent) => this.signup(e)).bind(this),
                });
                render('#app', signupPage);

                // template = Handlebars.compile(Pages.SignupPage);
                // this.appElement.innerHTML = template({
                //     login: this.state.login,
                //     first_name: this.state.first_name,
                //     second_name: this.state.second_name,
                //     email: this.state.email,
                //     phone: this.state.phone,
                // });
                break;
            case 'profile':
                template = Handlebars.compile(Pages.ProfilePage);
                this.appElement.innerHTML = template({
                    login: this.state.login,
                    first_name: this.state.first_name,
                    second_name: this.state.second_name,
                    email: this.state.email,
                    phone: this.state.phone,
                    display_name: this.state.display_name,
                    avatar: this.state.avatar,
                });
                break;
            case 'chats':
                logger.log('Rendering chats');
                template = Handlebars.compile(Pages.ChatsPage);
                this.appElement.innerHTML = template({
                    chats: this.state.chat_selection,
                    chat_search_value: this.state.chat_search_value,
                    active_chat: this.state.active_chat,
                });
                break;
            case 'page404':
                template = Handlebars.compile(Pages.Code404Page);
                this.appElement.innerHTML = template({});
                break;
            case 'page5xx':
                template = Handlebars.compile(Pages.Code5xxPage);
                this.appElement.innerHTML = template({});
                break;
            default:
                alert(`Несуществующая страница: ${this.state.currentPage} !!!`);
                break;
        }
        this.attachPageEventListeners();
        this.attachMenuEventListeners();
    }

    attachPageEventListeners() {
        switch (this.state.currentPage) {
            case 'login':
                // {
                //     const loginForm = document.getElementById('login-form');
                //     loginForm?.addEventListener('submit', (e) => this.login(e));
                // }
                break;
            case 'signup':
                // {
                //     const signupForm = document.getElementById('signup-form');
                //     signupForm?.addEventListener('submit', (e) => this.signup(e));
                // }
                break;
            case 'profile':
                {
                    const profileForm = document.getElementById('profile-form');
                    profileForm?.addEventListener('submit', (e) => this.saveProfile(e));
                }
                break;
            case 'chats':
                {
                    // chat links
                    const chatLinks = document.querySelectorAll('.chat-list-item');
                    chatLinks.forEach((link) => {
                        // find chat content
                        const chatId = link.id;
                        const thisChat = this.state.chats.find((chat) => chat.chatId === chatId);
                        // const chatContent = this.state.chats.find(chat => chat.chatId === chatId)?.content;
                        // if (!chatContent) {
                        if (!thisChat) {
                            alert(`Chat ${chatId} not found!`);
                        } else {
                            link.addEventListener('click', () => this.activateChat(thisChat));
                            // Оставил данный код для будущей оптимизации - отображение без перерисовки всей страницы

                            // link.addEventListener('click', function () {
                            //     // highlight chat in list
                            //     chatLinks.forEach(chatLink => chatLink.classList.remove('chat-list-item-active'));
                            //     this.classList.add('chat-list-item-active');
                            //     // display chat content
                            //     const chatContentsElement = document.getElementById('chat-content');
                            //     chatContentsElement.innerHTML = chatContent;
                            // });
                        }
                    });

                    // buttons and fields
                    const editProfile = document.getElementById('edit-profile');
                    editProfile?.addEventListener('click', () => this.changePage('profile'));
                    const chatSearch = document.getElementById('chat-search');
                    chatSearch?.addEventListener('keyup', (e) => this.chatSearch(e));
                    if (this.state.active_chat) {
                        const chatAction = document.getElementById('chat-action');
                        chatAction?.addEventListener('click', () => this.chatAction());
                        const chatAttach = document.getElementById('chat-attach');
                        chatAttach?.addEventListener('click', () => this.chatAttach());
                        const messageForm = document.getElementById('chat-message-form');
                        messageForm?.addEventListener('submit', (e) => this.chatSend(e));
                    }
                }
                break;
            case 'page404':
                break;
            case 'page5xx':
                break;
            default:
                alert(`Не реализовано добавление лиснеров для страницы: ${this.state.currentPage} !!!`);
                break;
        }
    }

    attachMenuEventListeners() {
        const menuItems = document.querySelectorAll('.menu-page-menu-item');
        menuItems.forEach((link) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const linkElement = e.target as HTMLLinkElement;
                this.changePage(linkElement?.dataset.page);
            });
        });
    }

    changePage(page: string | undefined) {
        this.state.currentPage = page;
        this.render();
    }

    login(event: SubmitEvent) {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        this.state.login = formElement?.login.value;
        this.state.password = formElement?.password.value;
        alert('Вход'
            + `\nлогин: ${this.state.login ? this.state.login : '<не задан>'}`
            + `\nпароль: ${this.state.password ? this.state.password : '<не задан>'}`);
        this.changePage('chats');
    }

    signup(event: SubmitEvent) {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        this.state.login = formElement?.login.value;
        this.state.password = formElement?.password.value;
        this.state.first_name = formElement?.first_name.value;
        this.state.second_name = formElement?.second_name.value;
        this.state.email = formElement?.email.value;
        this.state.phone = formElement?.phone.value;
        this.state.display_name = formElement?.first_name.value;
        alert('Регистрация'
            + `\nлогин: ${this.state.login ? this.state.login : '<не задан>'}`
            + `\nпароль: ${this.state.password ? this.state.password : '<не задан>'}`
            + `\nимя: ${this.state.first_name ? this.state.first_name : '<не задано>'}`
            + `\nфамилия: ${this.state.second_name ? this.state.second_name : '<не задана>'}`
            + `\nпочта: ${this.state.email ? this.state.email : '<не задана>'}`
            + `\nтелефон: ${this.state.phone ? this.state.phone : '<не задан>'}`);
        this.changePage('login');
    }

    saveProfile(event: SubmitEvent) {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        this.state.login = formElement?.login.value;
        this.state.password = formElement?.newPassword.value;
        this.state.first_name = formElement?.first_name.value;
        this.state.second_name = formElement?.second_name.value;
        this.state.email = formElement?.email.value;
        this.state.phone = formElement?.phone.value;
        this.state.display_name = formElement?.display_name.value;
        this.state.avatar = formElement?.avatar.value;
        alert('Регистрация'
            + `\nлогин: ${this.state.login ? this.state.login : '<не задан>'}`
            + `\nновый пароль: ${this.state.password ? this.state.password : '<не задан>'}`
            + `\nимя: ${this.state.first_name ? this.state.first_name : '<не задано>'}`
            + `\nфамилия: ${this.state.second_name ? this.state.second_name : '<не задана>'}`
            + `\nпочта: ${this.state.email ? this.state.email : '<не задана>'}`
            + `\nтелефон: ${this.state.phone ? this.state.phone : '<не задан>'}`
            + `\nимя в чате: ${this.state.display_name ? this.state.display_name : '<не задано>'}`
            + `\nаватар: ${this.state.avatar ? this.state.avatar : '<не задан>'}`);
        this.changePage('chats');
    }

    chatSearch(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            const chatSearchField :Nullable<HTMLInputElement> = document.getElementById('chat-search') as HTMLInputElement;
            const searchValue = chatSearchField?.value;
            if (searchValue !== this.state.chat_search_value) {
                this.state.chat_search_value = searchValue;
                if (searchValue) {
                    this.state.chat_selection = this.state.chats.filter((chat) => chat.party.includes(searchValue));
                } else {
                    this.state.chat_selection = [...this.state.chats];
                }
                this.state.active_chat = undefined;
                this.render();
            }
        }
    }

    activateChat(chat: Chat) {
        this.state.active_chat = chat;
        this.render();
    }

    // eslint-disable-next-line class-methods-use-this
    chatAction() {
        alert('Здесь будут реализованы действия с чатом (если потребуется)');
    }

    // eslint-disable-next-line class-methods-use-this
    chatAttach() {
        alert('Здесь может быть даже можно будет что-нибудь прикрепить к чату');
    }

    chatSend(event: SubmitEvent) {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        const message = formElement?.message.value?.trim();
        // const message = document.getElementById('message')?.value;
        if (!message) {
            alert('Введите сообщение в поле "Сообщение"');
        } else if (!this.state.active_chat) {
            alert('Чат не выбран - обратитесь к разработчику!');
        } else {
            this.state.active_chat.content.push({ party: PARTY_ME, message });
            this.render();
        }
    }
}
