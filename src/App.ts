import Logger, { Level } from './utils/logger';
import Chat from './types/Chat';
import LoginPage from './components/pages/loginPage';
import SignupPage from './components/pages/signupPage';
import ProfilePage from './components/pages/profilePage';
import ChatsPage from './components/pages/chatsPage';
import Code404Page from './components/pages/code404Page';
import Code5xxPage from './components/pages/code5xxPage';
import { PARTY_ME } from './types/ChatMessage';
import Router from './framework/router/router';
// import HTTPTransport, { queryStringify } from './framework/httpTransport';
import LoginApi, { LoginRequest } from './api/loginApi';
import SignupApi, { SignupRequest } from './api/signupApi';

type FieldList = Record<string, string>;

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

    logger: Logger;

    router: Router;

    constructor() {
        this.logger = new Logger(Level.debug);
        this.state = {
            currentPage: 'login',

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
        // The following two are equal
        // this.appElement = document.querySelector('#app');
        this.appElement = document.getElementById('app');

        // console.log(queryStringify({a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}));
        // console.log(new HTTPTransport()
        // .get('https://dzen.ru')
        // .then((data: any) => console.log('Response:', data))
        // .catch((reason: any) => console.log('Reject:', reason)));

        this.router = new Router();
    }

    render() {
        if (!this.appElement) {
            alert('Не найден тэг приложения - обратитесь к разработчику!');
            return;
        }
        let block;
        // for menu and other links
        const commonProps = {
            // change_page: ((e: Event) => this.changePageByLink(e)),
        };
        this.logger.log(this.state.currentPage, this);
        switch (this.state.currentPage) {
            case 'login':
                block = new LoginPage({
                    login: this.state.login,
                    onSubmit: ((e: SubmitEvent) => this.login(e)),
                    ...commonProps,
                });
                break;
            case 'signup':
                block = new SignupPage({
                    login: this.state.login,
                    first_name: this.state.first_name,
                    second_name: this.state.second_name,
                    email: this.state.email,
                    phone: this.state.phone,
                    onSubmit: ((e: SubmitEvent) => this.signup(e)),
                    ...commonProps,
                });
                break;
            case 'profile':
                block = new ProfilePage({
                    profile_avatar: '/avatar.png',
                    login: this.state.login,
                    first_name: this.state.first_name,
                    second_name: this.state.second_name,
                    email: this.state.email,
                    phone: this.state.phone,
                    display_name: this.state.display_name,
                    avatar: this.state.avatar,
                    onSubmit: ((e: SubmitEvent) => this.saveProfile(e)),
                    ...commonProps,
                });
                break;
            case 'chats':
                block = new ChatsPage({
                    chats: this.state.chat_selection,
                    chat_search_value: this.state.chat_search_value,
                    active_chat: this.state.active_chat,
                    // chat list header listeners
                    activate_chat: ((chat: Chat) => this.activateChat(chat)),
                    edit_profile: (() => this.changePage('/settings')),
                    search_chats: ((value: string) => this.chatSearch(value)),
                    // chat body listeners
                    do_chat_action: (() => this.chatAction()),
                    attach_to_chat: (() => this.chatAttach()),
                    send_message: ((e: SubmitEvent) => this.chatSend(e)),
                    ...commonProps,
                });
                break;
            case 'page404':
                block = new Code404Page({
                    ...commonProps,
                });
                break;
            case 'page5xx':
                block = new Code5xxPage({
                    ...commonProps,
                });
                break;
            default:
                alert(`Несуществующая страница: ${this.state.currentPage} !!!`);
                block = new Code404Page({
                    ...commonProps,
                });
                break;
        }
        // render in DOM
        this.appElement.replaceWith(block.getContent() as Node);
        // save in appElement
        this.appElement = block.getContent();
        // emit CDM
        block.dispatchComponentDidMount();
    }

    initRouter() {
        // for menu and other links
        const commonProps = {
            // change_page: ((e: Event) => this.changePageByLink(e)),
        };
        this.logger.log('Initialize Router');
        this.router
            .use('/', LoginPage, {
                login: this.state.login,
                onSubmit: ((e: SubmitEvent) => this.login(e)),
                ...commonProps,
            })
            .use('/sign-up', SignupPage, {
                login: this.state.login,
                first_name: this.state.first_name,
                second_name: this.state.second_name,
                email: this.state.email,
                phone: this.state.phone,
                onSubmit: ((e: SubmitEvent) => this.signup(e)),
                ...commonProps,
            })
            .use('/settings', ProfilePage, {
                profile_avatar: '/avatar.png',
                login: this.state.login,
                first_name: this.state.first_name,
                second_name: this.state.second_name,
                email: this.state.email,
                phone: this.state.phone,
                display_name: this.state.display_name,
                avatar: this.state.avatar,
                onSubmit: ((e: SubmitEvent) => this.saveProfile(e)),
                ...commonProps,
            })
            .use('/messenger', ChatsPage, {
                chats: this.state.chat_selection,
                chat_search_value: this.state.chat_search_value,
                active_chat: this.state.active_chat,
                // chat list header listeners
                activate_chat: ((chat: Chat) => this.activateChat(chat)),
                edit_profile: (() => this.changePage('/settings')),
                search_chats: ((value: string) => this.chatSearch(value)),
                // chat body listeners
                do_chat_action: (() => this.chatAction()),
                attach_to_chat: (() => this.chatAttach()),
                send_message: ((e: SubmitEvent) => this.chatSend(e)),
                ...commonProps,
            })
            .use('/error', Code5xxPage, {
                ...commonProps,
            })
            .useAs404(Code404Page, {
                ...commonProps,
            })
            .start();
    }

    changePage(page: string) {
        this.state.currentPage = page;
        this.router.go(page);
        // this.render();
    }

    // changePageByLink(e: Event) {
    //     e.preventDefault();
    //     const linkElement = e.target as HTMLLinkElement;
    //     this.changePage(linkElement?.dataset.page);
    // }

    createFieldObjectFromFormSubmit(formElement: HTMLFormElement, fieldList: string[]): FieldList {
        const fieldObject: FieldList = {};
        fieldList.forEach((fieldName) => {
            if (formElement[fieldName].value) {
                fieldObject[fieldName] = formElement[fieldName].value;
            }
        });
        this.logger.log('Object:', fieldObject);
        return fieldObject;
    }

    login(event: SubmitEvent) {
        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        this.state.login = formElement?.login.value;
        this.state.password = formElement?.password.value;
        this.logger.log('Вход'
            + `\nлогин: ${this.state.login ? this.state.login : '<не задан>'}`
            + `\nпароль: ${this.state.password ? this.state.password : '<не задан>'}`);
        this.createFieldObjectFromFormSubmit(formElement, ['login', 'password']);

        // API
        new LoginApi().request(new LoginRequest()
            .setLogin(this.state.login)
            .setPassword(this.state.password))
            .then((response: XMLHttpRequest) => {
                this.logger.log('Login promise resolved');
                let responseStr: string;
                switch (response.status) {
                    case 200:
                        responseStr = 'Logged in OK';
                        break;
                    case 400:
                        responseStr = 'Bad request';
                        break;
                    case 401:
                        responseStr = 'Unauthorized';
                        break;
                    case 500:
                        responseStr = 'Unexpected error';
                        break;
                    default:
                        responseStr = 'Undefined response code';
                        break;
                }
                this.logger.log(`${responseStr} (${response.status}): ${response.response}.`, response);
                // return result;
                if (response.status === 200) {
                    this.changePage('/messenger');
                } else {
                    const { reason } = JSON.parse(response.response);
                    alert(reason);
                }
            })
            .catch((reply: XMLHttpRequest) => {
                this.logger.log(`Error logging in (${reply.status}): ${reply.response}.`, reply);
                // return result.setReason('Exception logging in');
            });
        // ).then(((response: LoginResponse) => {
        //     if (response.success)  {
        //         this.changePage('/messenger');
        //     } else {
        //         alert(response.reason);
        //     }
        // }).bind(this));
        // API END
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
        this.logger.log('Регистрация'
            + `\nлогин: ${this.state.login ? this.state.login : '<не задан>'}`
            + `\nпароль: ${this.state.password ? this.state.password : '<не задан>'}`
            + `\nимя: ${this.state.first_name ? this.state.first_name : '<не задано>'}`
            + `\nфамилия: ${this.state.second_name ? this.state.second_name : '<не задана>'}`
            + `\nпочта: ${this.state.email ? this.state.email : '<не задана>'}`
            + `\nтелефон: ${this.state.phone ? this.state.phone : '<не задан>'}`);
        this.createFieldObjectFromFormSubmit(formElement, ['login', 'password', 'first_name', 'second_name', 'email', 'phone']);

        // API
        const request = new SignupRequest()
            .setFirstName(this.state.first_name)
            .setLogin(this.state.login)
            .setEmail(this.state.email)
            .setPassword(this.state.password);
        if (this.state.phone) {
            this.logger.log('Phone defined');
            request.setPhone(this.state.phone);
        }
        if (this.state.second_name) {
            this.logger.log('Second name defined');
            request.setSecondName(this.state.second_name);
        }
        new SignupApi().request(new SignupRequest()
            .setFirstName(this.state.first_name)
            .setSecondName(this.state.second_name)
            .setLogin(this.state.login)
            .setEmail(this.state.email)
            .setPassword(this.state.password)
            .setPhone(this.state.phone))
            .then((response: XMLHttpRequest) => {
                this.logger.log('Signup promise resolved');
                let responseStr: string;
                switch (response.status) {
                    case 200:
                        // eslint-disable-next-line no-case-declarations
                        const { id } = JSON.parse(response.response);
                        responseStr = `Signed up OK (id ${id})`;
                        break;
                    case 400:
                        responseStr = 'Bad request';
                        break;
                    case 401:
                        responseStr = 'Unauthorized';
                        break;
                    case 500:
                        responseStr = 'Unexpected error';
                        break;
                    default:
                        responseStr = 'Undefined response code';
                        break;
                }
                this.logger.log(`${responseStr} (${response.status}): ${response.response}.`, response);
                // return result;
                if (response.status === 200) {
                    this.changePage('/');
                } else {
                    const { reason } = JSON.parse(response.response);
                    alert(reason);
                }
            })
            .catch((reply: XMLHttpRequest) => {
                this.logger.log(`Error logging in (${reply.status}): ${reply.response}.`, reply);
                // return result.setReason('Exception logging in');
            });
        // ).then(((response: LoginResponse) => {
        //     if (response.success)  {
        //         this.changePage('/messenger');
        //     } else {
        //         alert(response.reason);
        //     }
        // }).bind(this));
        // API END
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
        this.logger.log('Редактирование профиля'
            + `\nлогин: ${this.state.login ? this.state.login : '<не задан>'}`
            + `\nновый пароль: ${this.state.password ? this.state.password : '<не задан>'}`
            + `\nимя: ${this.state.first_name ? this.state.first_name : '<не задано>'}`
            + `\nфамилия: ${this.state.second_name ? this.state.second_name : '<не задана>'}`
            + `\nпочта: ${this.state.email ? this.state.email : '<не задана>'}`
            + `\nтелефон: ${this.state.phone ? this.state.phone : '<не задан>'}`
            + `\nимя в чате: ${this.state.display_name ? this.state.display_name : '<не задано>'}`
            + `\nаватар: ${this.state.avatar ? this.state.avatar : '<не задан>'}`);
        this.createFieldObjectFromFormSubmit(formElement, ['login', 'oldPassword', 'newPassword', 'first_name', 'second_name', 'email', 'phone', 'display_name', 'avatar']);
        this.changePage('/messenger');
    }

    chatSearch(searchValue: string) {
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
            this.logger.log(`Сообщение\nтекст: ${message}`);
            this.state.active_chat.content.push({ party: PARTY_ME, message });
            this.createFieldObjectFromFormSubmit(formElement, ['message']);
            this.render();
        }
    }
}
