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
import LoginSignupInputBlock from './components/molecules/LoginSignupInputBlock.js';
import ProfileInputBlock from './components/molecules/ProfileInputBlock.js';
import Select from './components/Select';
import Text from './components/Text.js';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Footer', Footer);
Handlebars.registerPartial('Image', Image);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('LoginSignupInputBlock', LoginSignupInputBlock);
Handlebars.registerPartial('ProfileInputBlock', ProfileInputBlock);
Handlebars.registerPartial('Select', Select);
Handlebars.registerPartial('Text', Text);

export default class App {
    constructor() {
        this.state = {
            currentPage: 'profile',

            login: '',
            password: '',
            first_name: '',
            second_name: '',
            email: '', 
            phone: '',
            display_name: '',
            avatar: '',

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
        this.attachEventListeners();
    }

    attachEventListeners() {
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

        const footerLinks = document.querySelectorAll('.footer-link');
        footerLinks.forEach(link => {
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
