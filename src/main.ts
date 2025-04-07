/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import './styles/main.pcss';
import App from './NewApp';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.render();
});
