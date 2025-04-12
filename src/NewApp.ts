import TestBlock from './components/blocks/testBlock';
import render from './utils/renderDOM';

export default class App {
    // private button;
    private testBlock;

    constructor() {
        this.testBlock = new TestBlock({
            userName: 'John Doe',
            buttonText: 'click me!',
        });
    }

    render() {
        render('#app', this.testBlock);

        // setTimeout(() => {
        //     this.testBlock.setProps({
        //         buttonText: 'click me, please!!!',
        //         events: {
        //             click: (event: Event) => {
        //                 console.log(event);
        //             }
        //         }
        //     });
        // }, 1000);
    }
}
