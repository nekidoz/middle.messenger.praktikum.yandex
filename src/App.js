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
Handlebars.registerPartial('ChatListItemBlock', ChatListItemBlock);
Handlebars.registerPartial('LoginSignupInputBlock', LoginSignupInputBlock);
Handlebars.registerPartial('ProfileInputBlock', ProfileInputBlock);

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
                {party: 'Chat 1', id: 'chat1', content: 'content of chat 1', newMessages: 0, preview: 'Это превью содержимого чата номер 1', date: 'Пн'},
                {party: 'Chat 2', id: 'chat2', content: 'content of chat 2', newMessages: 0, preview: 'Это превью содержимого чата номер 2', date: '28 Фев 2025'},
                {party: 'Chat 3', id: 'chat3', content: 'content of chat 3', newMessages: 5, preview: 'Это превью содержимого чата номер 3', date: 'Ср'},
                {party: 'Chat 4', id: 'chat4', content: 'content of chat 4', newMessages: 0, preview: 'Это превью содержимого чата номер 4', date: 'Сб'},
                {party: 'Chat 5', id: 'chat5', content: 'content of chat 5', newMessages: 150, preview: 'Это превью содержимого чата номер 5', date: '11 Мар 2024'},
                {party: 'Chat 6', id: 'chat6', content: 'content of chat 6', newMessages: 0, preview: 'Это превью содержимого чата номер 6', date: 'Вчера'},
                {party: 'Chat 7', id: 'chat7', content: 'content of chat 7', newMessages: 15, preview: 'Это превью содержимого чата номер 7', date: '10:15'},
                {party: 'Chat 8', id: 'chat8', content: 'content of chat 8', newMessages: 0, preview: 'Это превью содержимого чата номер 8', date: 'Позавчера'},
                {party: 'Chat 9', id: 'chat9', content: 'content of chat 9', newMessages: 0, preview: 'Это превью содержимого чата номер 9', date: 'Пн'},
                {party: 'Chat 10', id: 'chat10', content: 'content of chat 10', newMessages: 0, preview: '', date: ''},
                {party: 'Chat 11', id: 'chat11', content: 'content of chat 11', newMessages: 0, preview: '', date: ''},
                {party: 'Chat 12', id: 'chat12', content: 'content of chat 12', newMessages: 0, preview: '', date: ''},
                {party: 'Chat 13', id: 'chat13', content: 'content of chat 13', newMessages: 0, preview: '', date: ''},
                {party: 'Chat 14', id: 'chat14', content: 'content of chat 14', newMessages: 0, preview: '', date: ''},
                {party: 'Chat 15', id: 'chat15', content: 'content of chat 15', newMessages: 0, preview: '', date: ''},
            ],

            questions: [],
            answers: [],
        };
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
                    chats: this.state.chats,
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
                const chatLinks = document.querySelectorAll('.chat-list-item');
                chatLinks.forEach(link => {
                    // find chat content
                    const chatId = link.id;
                    const chatContent = this.state.chats.find(chat => chat.id === chatId)?.content;
                    if (!chatContent) {
                        alert('Chat ' + chatId + ' not found!');
                    }
                    link.addEventListener('click', function () {
                        chatLinks.forEach(chatLink => chatLink.classList.remove('chat-list-item-active'));
                        this.classList.add('chat-list-item-active');

                        // display chat content
                        const chatContentsElement = document.getElementById('chat-content');
                        chatContentsElement.innerHTML = chatContent;
                    });
                })
                // profileForm.addEventListener('submit', (e) => this.saveProfile(e));
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
    }
}
