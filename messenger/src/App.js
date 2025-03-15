import Handlebars from 'handlebars';
import * as Pages from './pages';
import './helpers/handlebarsHelpers.js';

// Import and register partials in Handlebars
import Button from './components/Button';
import Link from './components/Link';
import Select from './components/Select';

Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('Select', Select);

export default class App {
    constructor() {
        this.state = {
            currentPage: 'testPage',
            questions: [],
            answers: [],
        };
        this.appElement = document.getElementById('app');
    }

    render() {
        let template;
        if (this.state.currentPage === 'testPage') {
            template = Handlebars.compile(Pages.TestPage);
            this.appElement.innerHTML = template({
                questions: this.state.questions,
                answers: this.state.answers,
                answerOptions: ['Yes', 'No', 'Maybe'],
            });
        }
        this.attachEventListeners();
    }

    attachEventListeners() {
        if (this.state.currentPage === 'testPage') {
            const submitButton = document.getElementById('submit-answers');
            submitButton.addEventListener('click', () => this.submitAnswers())
        }        

        const footerLinks = document.querySelectorAll('.footerLink');
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
}