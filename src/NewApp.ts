import Button from './components/button/Button';
import { render } from './utils/renderDom';

class App {
    private button;

    constructor() {
        this.button = new Button({
            className: 'regular-button',
            child: 'click me!',
            settings: {
                withInternalID: true
            }
        });
    }

    render() {
        render("#app", this.button);

        setTimeout(() => {
            this.button.setProps({
                className: 'navigation-button',
                child: 'click me, please!!!',
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