import Handlebars from 'handlebars';
import * as Pages from './pages';
import { mockQuestions, mockAnswers } from './mockData.js';
import './helpers/handlebarsHelpers.js';

// Import and register partials in Handlebars
import Button from './components/Button';
import Text from './components/Text.js';
import Footer from './components/Footer';
import Input from './components/Input';
import Link from './components/Link';
import LoginSignupInputBlock from './components/LoginSignupInputBlock';
import Select from './components/Select';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Footer', Footer);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('LoginSignupInputBlock', LoginSignupInputBlock);
Handlebars.registerPartial('Select', Select);
Handlebars.registerPartial('Text', Text);

export default class App {
    constructor() {
        this.state = {
            currentPage: 'login',
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
                    questions: mockQuestions,
                    answers: mockAnswers,
                    answerOptions: ['Yes', 'No', 'Maybe'],
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
        const login = event.target.login.value;
        const password = event.target.password.value;
        alert('Логин: ' + (login ? login : "<не задан>") + " , пароль: " + (password ? password : "<не задан>"));
    }
}
