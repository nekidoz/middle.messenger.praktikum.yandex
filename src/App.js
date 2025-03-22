import Handlebars from 'handlebars';
import * as Pages from './pages';
import { mockQuestions, mockAnswers } from './mockData.js';
import './helpers/handlebarsHelpers.js';

// Import and register partials in Handlebars
import Button from './components/Button';
import Footer from './components/Footer';
import Image from './components/Image';
import Input from './components/Input';
import Link from './components/Link';
import Menu from './components/Menu';
import Select from './components/Select';
import Text from './components/Text.js';
import ChatContentBlock from './components/molecules/ChatContentBlock.js';
import ChatListItemBlock from './components/molecules/ChatListItemBlock.js';
import LoginSignupInputBlock from './components/molecules/LoginSignupInputBlock.js';
import ProfileInputBlock from './components/molecules/ProfileInputBlock.js';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Footer', Footer);
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

export default class App {
    constructor() {
        this.state = {
            currentPage: 'chats',

            login: '',
            password: '',
            first_name: '',
            second_name: '',
            email: '', 
            phone: '',
            display_name: '',
            avatar: '',

            chats: [
                {party: 'Chat 1', chatId: 'chat1', content: [{party: 'other', message: 'content of chat 1'}], newMessages: 0, preview: 'Это превью содержимого чата номер 1', date: 'Пн'},
                {party: 'Chat 2', chatId: 'chat2', content: [{party: 'other', message: 'content of chat 2'}], newMessages: 0, preview: 'Это превью содержимого чата номер 2', date: '28 Фев 2025'},
                {party: 'Chat 3', chatId: 'chat3', content: [{party: 'other', message: 'content of chat 3'}], newMessages: 5, preview: 'Это превью содержимого чата номер 3', date: 'Ср'},
                {party: 'Chat 4', chatId: 'chat4', content: [{party: 'other', message: 'content of chat 4'}], newMessages: 0, preview: 'Это превью содержимого чата номер 4', date: 'Сб'},
                {party: 'Chat 5', chatId: 'chat5', content: [{party: 'other', message: 'content of chat 5'}], newMessages: 150, preview: 'Это превью содержимого чата номер 5', date: '11 Мар 2024'},
                {party: 'Chat 6', chatId: 'chat6', content: [{party: 'other', message: 'content of chat 6'}], newMessages: 0, preview: 'Это превью содержимого чата номер 6', date: 'Вчера'},
                {party: 'Chat 7', chatId: 'chat7', content: [{party: 'other', message: 'content of chat 7'}], newMessages: 15, preview: 'Это превью содержимого чата номер 7', date: '10:15'},
                {party: 'Chat 8', chatId: 'chat8', content: [{party: 'other', message: 'content of chat 8'}], newMessages: 0, preview: 'Это превью содержимого чата номер 8', date: 'Позавчера'},
                {party: 'Chat 9', chatId: 'chat9', content: [{party: 'other', message: 'content of chat 9'}], newMessages: 0, preview: 'Это превью содержимого чата номер 9', date: 'Пн'},
                {party: 'Chat 10', chatId: 'chat10', content: [{party: 'other', message: 'content of chat 10'}], newMessages: 0, preview: '', date: ''},
                {party: 'Chat 11', chatId: 'chat11', content: [{party: 'other', message: 'content of chat 11'}], newMessages: 0, preview: '', date: ''},
                {party: 'Chat 12', chatId: 'chat12', content: [{party: 'other', message: 'content of chat 12'}], newMessages: 0, preview: '', date: ''},
                {party: 'Chat 13', chatId: 'chat13', content: [{party: 'other', message: 'content of chat 13'}], newMessages: 0, preview: '', date: ''},
                {party: 'Chat 14', chatId: 'chat14', content: [{party: 'other', message: 'content of chat 14'}], newMessages: 0, preview: '', date: ''},
                {party: 'Chat 15', chatId: 'chat15', content: [{party: 'other', message: 'content of chat 15'}], newMessages: 0, preview: '', date: ''},
            ],
            chat_search_value: '',
            chat_selection: [],
            active_chat: undefined,

            questions: [],
            answers: [],
        };
        this.state.chat_selection = [...this.state.chats];
        this.appElement = document.getElementById('app');
    }

    render() {
        let template;
        switch (this.state.currentPage) {
            case 'login':
                template = Handlebars.compile(Pages.LoginPage);
                this.appElement.innerHTML = template({
                    login: this.state.login,
                });
                break;
            case 'signup':
                template = Handlebars.compile(Pages.SignupPage);
                this.appElement.innerHTML = template({
                    login: this.state.login,
                    first_name: this.state.first_name,
                    second_name: this.state.second_name,
                    email: this.state.email,
                    phone: this.state.phone,
                });
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
                template = Handlebars.compile(Pages.ChatsPage);
                this.appElement.innerHTML = template({
                    chats: this.state.chat_selection,
                    chat_search_value: this.state.chat_search_value,
                    active_chat: this.state.active_chat,
                });
                break;
            case 'createQuestionnaire': 
                template = Handlebars.compile(Pages.CreatePage);
                this.appElement.innerHTML = template({
                    questions: this.state.questions,
                    createButtonEnabled: this.state.questions.length === 0,
                });
                break;
            default:
                template = Handlebars.compile(Pages.AnswersPage);
                this.appElement.innerHTML = template({
                    questions: mockQuestions,
                    answers: mockAnswers,
                    answerOptions: ['Yes', 'No', 'Maybe'],
                });
                break;
        }
        this.attachPageEventListeners();
        this.attachFooterEventListeners();
        this.attachMenuEventListeners();
    }

    attachPageEventListeners() {
        switch (this.state.currentPage) {
            case 'login':
                const loginForm = document.getElementById('login-form');
                loginForm.addEventListener('submit', (e) => this.login(e));
                break;
            case 'signup':
                const signupForm = document.getElementById('signup-form');
                signupForm.addEventListener('submit', (e) => this.signup(e));
                break;
            case 'profile':
                const profileForm = document.getElementById('profile-form');
                profileForm.addEventListener('submit', (e) => this.saveProfile(e));
                break;
            case 'chats':
                // chat links
                const chatLinks = document.querySelectorAll('.chat-list-item');
                chatLinks.forEach(link => {
                    // find chat content
                    const chatId = link.id;
                    const thisChat = this.state.chats.find(chat => chat.chatId === chatId);
                    // const chatContent = this.state.chats.find(chat => chat.chatId === chatId)?.content;
                    // if (!chatContent) {
                    if (!thisChat) {
                        alert('Chat ' + chatId + ' not found!');
                    } else {
                        link.addEventListener('click', () => this.activateChat(thisChat));
                        // link.addEventListener('click', function () {
                        //     // highlight chat in list
                        //     chatLinks.forEach(chatLink => chatLink.classList.remove('chat-list-item-active'));
                        //     this.classList.add('chat-list-item-active');
                        //     // display chat content
                        //     const chatContentsElement = document.getElementById('chat-content');
                        //     chatContentsElement.innerHTML = chatContent;
                        // });    
                    }
                })

                // buttons and fields
                const editProfile = document.getElementById('edit-profile');
                editProfile.addEventListener('click', () => this.changePage('profile'))
                const chatSearch = document.getElementById('chat-search');
                chatSearch.addEventListener('keyup', (e) => this.chatSearch(e));
                if (this.state.active_chat) {
                    const chatAction = document.getElementById('chat-action');
                    chatAction.addEventListener('click', () => this.chatAction());
                    const chatAttach = document.getElementById('chat-attach');
                    chatAttach.addEventListener('click', () => this.chatAttach());
                    const chatSend = document.getElementById('chat-send');
                    chatSend.addEventListener('click', () => this.chatSend());
                    const messageInput = document.getElementById('message');
                    messageInput.addEventListener('keyup', (e) => this.chatSendByEnter(e));
                }
                break;
            case 'createQuestionnaire':
                const addButton = document.getElementById('add-question');
                const createButton = document.getElementById('create-questionnaire');

                addButton.addEventListener('click', () => this.addQuestion())
                createButton.addEventListener('click', () => this.createQuestionnaire())
                break;
            default: 
                const submitButton = document.getElementById('submit-answers');
                submitButton.addEventListener('click', () => this.submitAnswers())
                break;
        }        

    }

    attachFooterEventListeners() {
        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.changePage(e.target.dataset.page);
            })
        })
    }

    attachMenuEventListeners() {
        const menuItems = document.querySelectorAll('.menu-page-menu-item');
        menuItems.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.changePage(e.target.dataset.page);
            })
        })
    }

    changePage(page) {
        this.state.currentPage = page;
        this.render();
    }

    addQuestion() {
        const questionInput = document.getElementById('question-input');
        if (questionInput.value.trim()) {
            this.state.questions.push(questionInput.value);
            questionInput.value = "";
            this.render();
        }
    }

    createQuestionnaire() {
        if (this.state.questions.length > 0) {
            this.state.currentPage = 'answerQuestionnaire';
            this.render();
        }
    }

    submitAnswers() {
        alert('Answers submitted!');
    }

    login(event) {
        event.preventDefault();
        this.state.login = event.target.login.value;
        this.state.password = event.target.password.value;
        alert('Вход' + 
            '\nлогин: ' + (this.state.login ? this.state.login : '<не задан>') + 
            '\nпароль: ' + (this.state.password ? this.state.password : '<не задан>'));
        this.changePage('chats');
    }

    signup(event) {
        event.preventDefault();
        this.state.login = event.target.login.value;
        this.state.password = event.target.password.value;
        this.state.first_name = event.target.first_name.value;
        this.state.second_name = event.target.second_name.value;
        this.state.email = event.target.email.value;
        this.state.phone = event.target.phone.value;
        this.state.display_name = event.target.first_name.value;
        alert('Регистрация'+ 
            '\nлогин: ' + (this.state.login ? this.state.login : '<не задан>') + 
            '\nпароль: ' + (this.state.password ? this.state.password : '<не задан>') + 
            '\nимя: ' + (this.state.first_name ? this.state.first_name : '<не задано>') + 
            '\nфамилия: ' + (this.state.second_name ? this.state.second_name : '<не задана>') + 
            '\nпочта: ' + (this.state.email ? this.state.email : '<не задана>') + 
            '\nтелефон: ' + (this.state.phone ? this.state.phone : '<не задан>')
        );
        this.changePage('login');
    }

    saveProfile(event) {
        event.preventDefault();
        this.state.login = event.target.login.value;
        this.state.password = event.target.newPassword.value;
        this.state.first_name = event.target.first_name.value;
        this.state.second_name = event.target.second_name.value;
        this.state.email = event.target.email.value;
        this.state.phone = event.target.phone.value;
        this.state.display_name = event.target.display_name.value;
        this.state.avatar = event.target.avatar.value;
        alert('Регистрация'+ 
            '\nлогин: ' + (this.state.login ? this.state.login : '<не задан>') + 
            '\nновый пароль: ' + (this.state.password ? this.state.password : '<не задан>') + 
            '\nимя: ' + (this.state.first_name ? this.state.first_name : '<не задано>') + 
            '\nфамилия: ' + (this.state.second_name ? this.state.second_name : '<не задана>') + 
            '\nпочта: ' + (this.state.email ? this.state.email : '<не задана>') + 
            '\nтелефон: ' + (this.state.phone ? this.state.phone : '<не задан>') +
            '\nимя в чате: ' + (this.state.display_name ? this.state.display_name : '<не задано>') +
            '\nаватар: ' + (this.state.avatar ? this.state.avatar : '<не задан>')
        );
        this.changePage('chats');
    }

    chatSearch(e, chatSearch) {
        if (e.keyCode === 13) {
            const searchValue = document.getElementById('chat-search')?.value;
            if (searchValue !== this.state.chat_search_value) {
                this.state.chat_search_value = searchValue;
                if (searchValue) {
                    this.state.chat_selection = this.state.chats.filter(chat => chat.party.includes(searchValue));
                } else {
                    this.state.chat_selection = [...this.state.chats];
                }
                this.state.active_chat = undefined;
                this.render();
            }
        }
    }

    activateChat(chat) {
        this.state.active_chat = chat;
        this.render();
    }

    chatAction() {
        alert('Здесь будут реализованы действия с чатом (если потребуется)');
    }

    chatAttach() {
        alert('Здесь может быть даже можно будет что-нибудь прикрепить к чату');
    }

    chatSend() {
        const message = document.getElementById('message')?.value;
        if (!message) {
            alert('Введите сообщение в поле "Сообщение"');
        } else {
            this.state.active_chat.content.push({party: PARTY_ME, message: message});
            this.render();
        }
    }

    chatSendByEnter(e) {
        if (e.keyCode === 13) {
            this.chatSend();
        }
    }
}
