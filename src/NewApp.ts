import Button from './components/button/Button';
import { render } from './utils/renderDom';

class App {
    private button;

    constructor() {
        this.button = new Button({
            className: 'regular-button',
            child: 'click me!'
        });
    }

    render() {
        console.log('App render');
        console.log(this.button);
        render("#app", this.button);
    }
}

export default App;