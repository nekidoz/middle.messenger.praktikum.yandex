import LoginSignupInputBlock from './components/blocks/loginSignupInputBlock';
import render from './utils/renderDOM';

class App {
    // private button;
    private loginSignupInputBlock;

    constructor() {
        this.loginSignupInputBlock = new LoginSignupInputBlock({
            userName: 'John Doe',
            buttonText: 'click me!',
        });
    }

    render() {
        render('#app', this.loginSignupInputBlock);

        setTimeout(() => {
            this.loginSignupInputBlock.setProps({
                buttonText: 'click me, please!!!',
                events: {
                    click: (event: Event) => {
                        console.log(event);
                    }
                }
            });
        }, 1000);
    }
}

export default App;
