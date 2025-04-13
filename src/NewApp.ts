import TestBlock from './components/organisms/testBlock';
import LoginPage from './components/pages/loginPage';
import render from './utils/renderDOM';
// import logger from './utils/logger';

export default class App {
    // private button;
    private testBlock;
    private loginPage;

    constructor() {
        this.testBlock = new TestBlock({
            userName: 'John Doe',
            buttonText: 'click me!',
        });
        this.loginPage = new LoginPage({
            login: 'Nikita',
        });
    }

    render() {
        render('#app', this.loginPage);
        // render('#app', this.testBlock);

        // setTimeout(() => {
        //     this.testBlock.setProps({
        //         buttonText: 'click me, please!!!',
        //         events: {
        //             click: (event: Event) => {
        //                 logger.log(event);
        //             }
        //         }
        //     });
        // }, 1000);
    }
}
